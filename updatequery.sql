USE [FruitsRetailer]
GO
/****** Object:  StoredProcedure [dbo].[UpdateBalanceAndQuantity]    Script Date: 2/11/2016 8:15:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[UpdateBalanceAndQuantity]
@CustomerId int,
@Quantity int,
@ProductCode nvarchar(500),
@TransactionId int,
@Mode int =0   -- 1 = Add, 2 = edit, 3=delete
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	--BEGIN TRY
	--	BEGIN TRANSACTION
			declare @Balance decimal(18, 4)
			declare @CustomerType int
   
			set @Balance = (select sum(r.Quantity*r.Rate - (r.AmountReceived + r.OthersCost)) from CustomerTransaction r 
			where r.CustomerId = @CustomerId)

			set @Balance = ISNULL(@Balance, 0)

			update Customer
			set Balance = @Balance
			where Id = @CustomerId	

			set @CustomerType = (Select CustomerType from Customer where Id= @CustomerId)

			--- @CustomerType = 1 Is retailer, @CustomerType = 2 is wholesaler
			if @CustomerType = 1
			begin
				update Stock
				set Quantity= case when (Quantity-@Quantity < 0) then 0 end
				where Code = @ProductCode
			end
			else
			begin
				update Stock
				set Quantity= case when (Quantity+@Quantity < 0 )then 0 end
				where Code = @ProductCode
			end

			if @Mode = 1
			begin
				declare @tran table(AccountNumber int, CustomerId int, AmmountReceive decimal(18, 4), IsPayment bit, TransactionId int, Discount decimal(18,4) )

				insert into @tran( AccountNumber, CustomerId, AmmountReceive, IsPayment, TransactionId, Discount)
				select top 1 c.AccountNumber, t.CustomerId, t.AmountReceived,
				CASE WHEN c.CustomerType= 2 THEN 1 ELSE 0 END 
				,t.Id 
				,t.OthersCost
				from CustomerTransaction t
				inner join Customer c on c.Id = t.CustomerId
				where CustomerId = @CustomerId
				order by t.Id desc

				insert into CashBook(AccountNumber, IsPayment, TransactionType, TransactionDate, Debit, Credit, Comment, TransactionId)
				select t.AccountNumber, t.IsPayment, 5, Getdate()
				,case when t.IsPayment = 1 then 0 else t.AmmountReceive - t.Discount end   
				,case when t.IsPayment = 1 then t.AmmountReceive - t.Discount else 0 end
				,'Transaction during purchase'   
				,t.TransactionId
				from @tran t 
				where t.AmmountReceive > 0

				update CustomerTransaction
				set CashBookId = SCOPE_IDENTITY()
				where Id= (select TransactionId from @tran)
			end

			if @Mode = 3
			begin
				delete from CashBook where TransactionId = @TransactionId
			end
			if @Mode = 2
			begin
				UPDATE R 
				SET R.Debit = case when R.IsPayment = 0 then P.AmountReceived - P.OthersCost else 0 end
				,R.Credit = case when R.IsPayment = 1 then P.AmountReceived - P.OthersCost else 0 end
				FROM dbo.CashBook AS R
				INNER JOIN dbo.CustomerTransaction AS P ON R.TransactionId = P.Id 
				WHERE P.Id = @TransactionId 
			end
	--	COMMIT TRANSACTION
	--END TRY
	--BEGIN CATCH
	--	ROLLBACK
	--END CATCH

END
