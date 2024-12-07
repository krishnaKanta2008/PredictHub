interface StockData {
  name: string;
  symbol: string;
  stock_exchange: {
    acronym: string;
    country: string;
  };
}

const topstocksdata: StockData[] = [
  {
    name: "Microsoft Corporation",
    symbol: "MSFT",
    stock_exchange: { acronym: "NASDAQ", country: "USA" },
  },
  {
    name: "Apple Inc",
    symbol: "AAPL",
    stock_exchange: { acronym: "NASDAQ", country: "USA" },
  },
  {
    name: "Amazon.com Inc",
    symbol: "AMZN",
    stock_exchange: { acronym: "NASDAQ", country: "USA" },
  },
  {
    name: "Alphabet Inc - Class C",
    symbol: "GOOG",
    stock_exchange: { acronym: "NASDAQ", country: "USA" },
  },
  {
    name: "Alphabet Inc - Class A",
    symbol: "GOOGL",
    stock_exchange: { acronym: "NASDAQ", country: "USA" },
  },
  {
    name: "Alibaba Group Holding Ltd",
    symbol: "BABA",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Meta Platforms Inc - Class A",
    symbol: "FB",
    stock_exchange: { acronym: "NASDAQ", country: "USA" },
  },
  {
    name: "BERKSHIRE HATHAWAY INC",
    symbol: "BRK.B",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "BERKSHIRE HATHAWAY INC",
    symbol: "BRK.A",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Vodafone Group plc",
    symbol: "VOD",
    stock_exchange: { acronym: "NASDAQ", country: "USA" },
  },
  {
    name: "Visa Inc - Class A",
    symbol: "V",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "JPMorgan Chase & Company",
    symbol: "JPM",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Johnson & Johnson",
    symbol: "JNJ",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Walmart Inc",
    symbol: "WMT",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Mastercard Incorporated - Class A",
    symbol: "MA",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Procter & Gamble Company",
    symbol: "PG",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Taiwan Semiconductor Manufacturing",
    symbol: "TSM",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Chunghwa Telecom",
    symbol: "CHT",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Roche Holding AG",
    symbol: "RHHBF",
    stock_exchange: { acronym: "", country: "USA" },
  },
  {
    name: "Roche Holding AG",
    symbol: "RHHVF",
    stock_exchange: { acronym: "", country: "USA" },
  },
  {
    name: "AT&T Inc",
    symbol: "T",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Unitedhealth Group Inc",
    symbol: "UNH",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Bank Of America Corp",
    symbol: "BAC",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Home Depot Inc",
    symbol: "HD",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Intel Corp",
    symbol: "INTC",
    stock_exchange: { acronym: "NASDAQ", country: "USA" },
  },
  {
    name: "Coca-Cola Company",
    symbol: "KO",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Verizon Communications Inc",
    symbol: "VZ",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Roche Holding AG",
    symbol: "RHHBY",
    stock_exchange: { acronym: "", country: "USA" },
  },
  {
    name: "Exxon Mobil Corp",
    symbol: "XOM",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Walt Disney Co (The)",
    symbol: "DIS",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Merck & Co Inc",
    symbol: "MRK",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Novartis AG",
    symbol: "NVS",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Comcast Corp - Class A",
    symbol: "CMCSA",
    stock_exchange: { acronym: "NASDAQ", country: "USA" },
  },
  {
    name: "Pfizer Inc",
    symbol: "PFE",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "PepsiCo Inc",
    symbol: "PEP",
    stock_exchange: { acronym: "NASDAQ", country: "USA" },
  },
  {
    name: "Toyota Motor Corporation",
    symbol: "TM",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Chevron Corp",
    symbol: "CVX",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
  {
    name: "Adobe Inc",
    symbol: "ADBE",
    stock_exchange: { acronym: "NASDAQ", country: "USA" },
  },
  {
    name: "Cisco Systems Inc",
    symbol: "CSCO",
    stock_exchange: { acronym: "NASDAQ", country: "USA" },
  },
  {
    name: "Wells Fargo & Company",
    symbol: "WFC",
    stock_exchange: { acronym: "NYSE", country: "USA" },
  },
];

export default topstocksdata;
