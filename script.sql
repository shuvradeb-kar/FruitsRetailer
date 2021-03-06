USE [FruitsRetailer]
GO
/****** Object:  Table [dbo].[CashBook]    Script Date: 2/7/2016 7:09:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CashBook](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AccountNumber] [int] NOT NULL CONSTRAINT [DF_CashBook_AccountNumber]  DEFAULT ((0)),
	[IsPayment] [bit] NOT NULL,
	[TransactionType] [int] NOT NULL,
	[TransactionDate] [date] NOT NULL,
	[Debit] [decimal](18, 4) NOT NULL CONSTRAINT [DF_CashBook_Debit]  DEFAULT ((0)),
	[Credit] [decimal](18, 4) NOT NULL CONSTRAINT [DF_CashBook_Credit]  DEFAULT ((0)),
	[Comment] [nvarchar](max) NULL,
	[TransactionId] [int] NULL,
 CONSTRAINT [PK_CashBook] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Customer]    Script Date: 2/7/2016 7:09:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[AccountNumber] [int] NOT NULL,
	[Address] [nvarchar](max) NULL,
	[CustomerType] [int] NOT NULL,
	[Balance] [decimal](18, 4) NOT NULL CONSTRAINT [DF_Customer_Balance]  DEFAULT ((0)),
	[IsActive] [bit] NOT NULL CONSTRAINT [DF_Customer_IsActive]  DEFAULT ((1)),
	[MobileNumber] [nvarchar](100) NULL CONSTRAINT [DF_Customer_MobileNumber]  DEFAULT ((0)),
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CustomerTransaction]    Script Date: 2/7/2016 7:09:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomerTransaction](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProductDescription] [nvarchar](max) NULL,
	[TransactionDate] [date] NOT NULL,
	[Quantity] [int] NOT NULL CONSTRAINT [DF_CustomerTransaction_Quantity]  DEFAULT ((0)),
	[Rate] [decimal](18, 4) NOT NULL CONSTRAINT [DF_CustomerTransaction_Rate]  DEFAULT ((0)),
	[AmountReceived] [decimal](18, 4) NOT NULL CONSTRAINT [DF_CustomerTransaction_AmountReceived]  DEFAULT ((0)),
	[OthersCost] [decimal](18, 4) NOT NULL CONSTRAINT [DF_CustomerTransaction_Discount]  DEFAULT ((0)),
	[ProductCode] [nvarchar](500) NULL,
	[CustomerId] [int] NOT NULL,
	[CashBookId] [int] NULL,
 CONSTRAINT [PK_CustomerTransaction] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Stock]    Script Date: 2/7/2016 7:09:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Stock](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Code] [nvarchar](500) NOT NULL,
	[Quantity] [int] NOT NULL CONSTRAINT [DF_Stock_Quantity]  DEFAULT ((0)),
	[IsActive] [bit] NOT NULL CONSTRAINT [DF_Stock_IsActive]  DEFAULT ((1)),
 CONSTRAINT [PK_Stock] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  StoredProcedure [dbo].[GetCashBookDetail]    Script Date: 2/7/2016 7:09:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetCashBookDetail]
	@pageNo int,
	@pageSize int,
	@Count int OUTPUT,
	@PreviousBalance decimal OUTPUT
AS
BEGIN

	declare @result table(RowId int Identity, Id int, AccountNumber int, AccountHolderName nvarchar(max),AccountHolderAddress nvarchar(max), IsPayment bit, TransactionType int, TransactionDate datetime, Debit float,Credit float, Comment nvarchar(max))
	declare @returnedresult table(RowId int Identity, ProwId int, Id int, AccountNumber int, AccountHolderName nvarchar(max),AccountHolderAddress nvarchar(max), IsPayment bit, TransactionType int, TransactionDate datetime, Debit float,Credit float, Comment nvarchar(max))
	

	insert into @result(Id, AccountNumber, AccountHolderName, AccountHolderAddress, IsPayment, TransactionType, TransactionDate, Debit, Credit, Comment)
	select c.Id, c.AccountNumber, m.Name,m.Address, c.IsPayment, c.TransactionType, c.TransactionDate, c.Debit, c.Credit, c.Comment 
	from CashBook c
	left join Customer m on c.AccountNumber = m.AccountNumber
	order by c.Id asc
	
	set @Count = (Select count(*) from @result )

	insert into @returnedresult(Id, ProwId, AccountNumber, AccountHolderName, AccountHolderAddress, IsPayment, TransactionType, TransactionDate, Debit, Credit, Comment)
	select p.Id, p.RowId, p.AccountNumber, p.AccountHolderName, p.AccountHolderAddress, p.IsPayment, p.TransactionType, p.TransactionDate, p.Debit, p.Credit, p.Comment  from @result p
	where 
	(
		@pageNo = 0 
		OR 
		(
			p.RowId BETWEEN (@pageNo - 1) * @PageSize + 1 AND @pageNo * @PageSize
		)
	)
	order by p.Id

	declare @RowId int
	set @RowId = (select min(PRowId) from @ReturnedResult)

	set @PreviousBalance = (select sum(r.Debit - r.Credit) from @Result r 
	where (r.RowId < @RowId))

	select p.Id, p.RowId, p.AccountNumber, p.AccountHolderName, p.AccountHolderAddress, p.IsPayment, p.TransactionType, p.TransactionDate, p.Debit, p.Credit, p.Comment  from @ReturnedResult p

END

GO
/****** Object:  StoredProcedure [dbo].[GetCustomerByType]    Script Date: 2/7/2016 7:09:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetCustomerByType] 
	@customerType int,
	@pageNo int,
	@pageSize int,
	@accountNumber nvarchar(200),
	@Count int OUTPUT
AS
BEGIN

	declare @result table(RowId int Identity, Id int, Name nvarchar(max), AccountNumber int, Address nvarchar(max), CustomerType int, Balance decimal(18,4), IsActive bit, MobileNumber nvarchar(100))
	

	insert into @result(Id, Name, AccountNumber, Address, CustomerType, Balance, IsActive, MobileNumber)
	select c.Id, c.Name, c.AccountNumber, c.Address, c.CustomerType, c.Balance, c.IsActive, c.MobileNumber from Customer c
	where c.IsActive = 1 and c.CustomerType = @customerType and (@accountNumber = 0 or c.AccountNumber like '%' + @accountNumber + '%')
	order by c.AccountNumber desc
	set @Count = (Select count(*) from @result )

	select * from @result p
	where 
	(
		@pageNo = 0 
		OR 
		(
			p.RowId BETWEEN (@pageNo - 1) * @PageSize + 1 AND @pageNo * @PageSize
		)
	)
	order by p.AccountNumber desc

END



GO
/****** Object:  StoredProcedure [dbo].[GetCustomerTransactionDetail]    Script Date: 2/7/2016 7:09:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetCustomerTransactionDetail]
	@pageNo int,
	@pageSize int,
	@customerId int,
	@Count int OUTPUT,
	@PreviousBalance decimal OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	declare @Result table (RowId int Identity, Id int, TransactionDate date, ProductDescription nvarchar(max), ProductName nvarchar(500), ProductCode nvarchar(500), AmountReceived decimal(18, 4), OthersCost decimal(18, 4), Quantity int, Rate decimal(18, 4), CustomerId int)
	declare @ReturnedResult table (RowId int Identity, PRowId int, Id int, TransactionDate date, ProductDescription nvarchar(max),  ProductName nvarchar(500), ProductCode nvarchar(500), AmountReceived decimal(18, 4), OthersCost decimal(18, 4), Quantity int, Rate decimal(18, 4), CustomerId int)

	insert into @Result(Id, TransactionDate, ProductDescription, ProductName, ProductCode, AmountReceived, OthersCost, Quantity, Rate, CustomerId)
	select c.Id, c.TransactionDate, c.ProductDescription, s.Name, c.ProductCode, c.AmountReceived, c.OthersCost, c.Quantity, c.Rate, c.CustomerId
	 from CustomerTransaction c 
	 left join Stock s on s.Code = c.ProductCode
	 
	 where c.CustomerId = @customerId
	 order by TransactionDate asc

	 set @Count = (Select count(*) from @result )



	insert into @ReturnedResult(Id, PRowId, TransactionDate, ProductDescription, ProductName, ProductCode, AmountReceived, OthersCost, Quantity, Rate, CustomerId)
	select c.Id, c.RowId, c.TransactionDate, c.ProductDescription, c.ProductName, c.ProductCode, c.AmountReceived, c.OthersCost, c.Quantity, c.Rate, c.CustomerId
	from @result c
	where 
	(
		@pageNo = 0 
		OR 
		(
			c.RowId BETWEEN (@pageNo - 1) * @PageSize + 1 AND @pageNo * @PageSize
		)
	)
	order by c.TransactionDate asc

	declare @RowId int
	set @RowId = (select min(PRowId) from @ReturnedResult)

	set @PreviousBalance = (select sum(r.Quantity*r.Rate - (r.AmountReceived + r.OthersCost)) from @Result r 
	where (RowId < @RowId))

	
	select r.Id, r.AmountReceived, r.CustomerId, r.OthersCost, r.ProductName, r.ProductCode, r.ProductDescription, r.Quantity, r.Rate, r.TransactionDate from @ReturnedResult r

	--delete from @Result

	--delete from @ReturnedResult

END

GO
/****** Object:  StoredProcedure [dbo].[GetProductList]    Script Date: 2/7/2016 7:09:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetProductList]
	@pageNo int,
	@pageSize int,
	@Count int OUTPUT
AS
BEGIN

	declare @result table(RowId int Identity, Id int, Name nvarchar(max), Code nvarchar(500), Quantity int, IsActive bit)
	

	insert into @result(Id, Name, Code, Quantity, IsActive)
	select c.Id, c.Name, c.Code, c.Quantity, c.IsActive from Stock c
	where c.IsActive = 1
	order by c.Name asc
	
	set @Count = (Select count(*) from @result )

	select * from @result p
	where 
	(
		@pageNo = 0 
		OR 
		(
			p.RowId BETWEEN (@pageNo - 1) * @PageSize + 1 AND @pageNo * @PageSize
		)
	)
	order by p.Name
END

GO
/****** Object:  StoredProcedure [dbo].[UpdateBalanceAndQuantity]    Script Date: 2/7/2016 7:09:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[UpdateBalanceAndQuantity]
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
				set Quantity= Quantity-@Quantity
				where Code = @ProductCode
			end
			else
			begin
				update Stock
				set Quantity= Quantity+@Quantity
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

GO
/****** Object:  StoredProcedure [dbo].[UpdateCashBoookBalance]    Script Date: 2/7/2016 7:09:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[UpdateCashBoookBalance]	
	@Mode int, 
	@CashBookId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	declare @tran table(CashBookId int, AmountReceive decimal(18,4), CustomerId int, AccountNumber int )	
	declare @transactionId int
	declare @Balance decimal(18, 4)
	declare @CustomerId int

    -- Insert statements for procedure here
	if @Mode = 1
	begin
		insert into @tran(CashBookId, AmountReceive, CustomerId, AccountNumber)
		select top 1 c.Id
		,case when c.Debit >0 then c.Debit else c.Credit end 
		,cu.Id
		,c.AccountNumber
		from CashBook c
		inner join Customer cu on cu.AccountNumber = c.AccountNumber
		order by c.Id desc

		insert into CustomerTransaction(TransactionDate, Quantity, Rate, AmountReceived, OthersCost, CustomerId, CashBookId)
		select GETDATE(), 0, 0, AmountReceive, 0, CustomerId, CashBookId from @tran
		set @transactionId = SCOPE_IDENTITY()

		update CashBook
		set TransactionId = @transactionId
		where Id = (Select CashBookId from @tran)

		set @CustomerId = (Select CustomerId from CustomerTransaction where Id = @transactionId)
	end

	if @Mode = 2
	begin
		set @CustomerId = (Select CustomerId from CustomerTransaction where CashBookId = @CashBookId)

		update T
		set T.AmountReceived = case when B.Debit > 0 then B.Debit else B.Credit end
		from  CustomerTransaction T
		inner join CashBook B on B.Id = T.CashBookId
		where T.CashBookId = @CashBookId
	end

	if @Mode = 3
	begin
		set @CustomerId = (Select CustomerId from CustomerTransaction where CashBookId = @CashBookId)
		delete from CustomerTransaction where CashBookId = @CashBookId
	end

	
	-- Update Customer Balance ------
	
	set @Balance = (select sum(r.Quantity*r.Rate - (r.AmountReceived + r.OthersCost)) from CustomerTransaction r 
	where r.CustomerId = @CustomerId)

	set @Balance = ISNULL(@Balance, 0)

	update Customer
	set Balance = @Balance
	where Id = @CustomerId	

END

GO
