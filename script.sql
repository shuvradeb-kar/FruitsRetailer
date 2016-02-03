USE [master]
GO
/****** Object:  Database [FruitsRetailer]    Script Date: 2/3/2016 9:00:42 AM ******/
CREATE DATABASE [FruitsRetailer]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FruitsRetailer', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\FruitsRetailer.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'FruitsRetailer_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\FruitsRetailer_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [FruitsRetailer] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FruitsRetailer].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [FruitsRetailer] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [FruitsRetailer] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [FruitsRetailer] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [FruitsRetailer] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [FruitsRetailer] SET ARITHABORT OFF 
GO
ALTER DATABASE [FruitsRetailer] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [FruitsRetailer] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [FruitsRetailer] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [FruitsRetailer] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [FruitsRetailer] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [FruitsRetailer] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [FruitsRetailer] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [FruitsRetailer] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [FruitsRetailer] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [FruitsRetailer] SET  DISABLE_BROKER 
GO
ALTER DATABASE [FruitsRetailer] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [FruitsRetailer] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [FruitsRetailer] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [FruitsRetailer] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [FruitsRetailer] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [FruitsRetailer] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [FruitsRetailer] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [FruitsRetailer] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [FruitsRetailer] SET  MULTI_USER 
GO
ALTER DATABASE [FruitsRetailer] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [FruitsRetailer] SET DB_CHAINING OFF 
GO
ALTER DATABASE [FruitsRetailer] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [FruitsRetailer] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [FruitsRetailer] SET DELAYED_DURABILITY = DISABLED 
GO
USE [FruitsRetailer]
GO
/****** Object:  User [fruitsretailer]    Script Date: 2/3/2016 9:00:43 AM ******/
CREATE USER [fruitsretailer] FOR LOGIN [fruitsretailer] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [fruitsretailer]
GO
ALTER ROLE [db_datareader] ADD MEMBER [fruitsretailer]
GO
/****** Object:  Table [dbo].[CashBook]    Script Date: 2/3/2016 9:00:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CashBook](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AccountNumber] [int] NOT NULL,
	[IsPayment] [bit] NOT NULL,
	[TransactionType] [int] NOT NULL,
	[TransactionDate] [date] NOT NULL,
	[Debit] [float] NOT NULL,
	[Credit] [float] NOT NULL,
	[Comment] [nvarchar](max) NULL,
 CONSTRAINT [PK_CashBook] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Customer]    Script Date: 2/3/2016 9:00:46 AM ******/
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
/****** Object:  Table [dbo].[CustomerTransaction]    Script Date: 2/3/2016 9:00:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomerTransaction](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProductDescription] [nvarchar](max) NULL,
	[TransactionDate] [date] NOT NULL,
	[Quantity] [int] NOT NULL CONSTRAINT [DF_CustomerTransaction_Quantity]  DEFAULT ((0)),
	[Rate] [float] NOT NULL CONSTRAINT [DF_CustomerTransaction_Rate]  DEFAULT ((0)),
	[AmountReceived] [float] NOT NULL CONSTRAINT [DF_CustomerTransaction_AmountReceived]  DEFAULT ((0)),
	[OthersCost] [float] NOT NULL CONSTRAINT [DF_CustomerTransaction_Discount]  DEFAULT ((0)),
	[ProductCode] [nvarchar](500) NOT NULL,
	[CustomerId] [int] NOT NULL,
 CONSTRAINT [PK_CustomerTransaction] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Stock]    Script Date: 2/3/2016 9:00:46 AM ******/
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
ALTER TABLE [dbo].[CashBook] ADD  CONSTRAINT [DF_CashBook_AccountNumber]  DEFAULT ((0)) FOR [AccountNumber]
GO
ALTER TABLE [dbo].[CashBook] ADD  CONSTRAINT [DF_CashBook_Debit]  DEFAULT ((0)) FOR [Debit]
GO
ALTER TABLE [dbo].[CashBook] ADD  CONSTRAINT [DF_CashBook_Credit]  DEFAULT ((0)) FOR [Credit]
GO
/****** Object:  StoredProcedure [dbo].[GetCashBookDetail]    Script Date: 2/3/2016 9:00:46 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetCustomerByType]    Script Date: 2/3/2016 9:00:46 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetCustomerTransactionDetail]    Script Date: 2/3/2016 9:00:46 AM ******/
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
	declare @Result table (RowId int Identity, Id int, TransactionDate date, ProductDescription nvarchar(max), ProductName nvarchar(500), ProductCode nvarchar(500), AmountReceived float, OthersCost float, Quantity int, Rate float, CustomerId int)
	declare @ReturnedResult table (RowId int Identity, PRowId int, Id int, TransactionDate date, ProductDescription nvarchar(max),  ProductName nvarchar(500), ProductCode nvarchar(500), AmountReceived float, OthersCost float, Quantity int, Rate float, CustomerId int)

	insert into @Result(Id, TransactionDate, ProductDescription, ProductName, ProductCode, AmountReceived, OthersCost, Quantity, Rate, CustomerId)
	select c.Id, c.TransactionDate, c.ProductDescription, s.Name, c.ProductCode, c.AmountReceived, c.OthersCost, c.Quantity, c.Rate, c.CustomerId
	 from CustomerTransaction c 
	 inner join Stock s on s.Code = c.ProductCode
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
/****** Object:  StoredProcedure [dbo].[GetProductList]    Script Date: 2/3/2016 9:00:46 AM ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateBalanceAndQuantity]    Script Date: 2/3/2016 9:00:46 AM ******/
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
@ProductCode nvarchar(500)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   declare @Balance int
   
   set @Balance = (select sum(r.Quantity*r.Rate - (r.AmountReceived + r.OthersCost)) from CustomerTransaction r 
	where r.CustomerId = @CustomerId)

	update Customer
	set Balance = @Balance
	where Id = @CustomerId	

	update Stock
	set Quantity= Quantity+@Quantity
	where Code = @ProductCode

END

GO
USE [master]
GO
ALTER DATABASE [FruitsRetailer] SET  READ_WRITE 
GO
