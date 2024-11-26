import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const stockMarketData = [
  {
    title: "Stock Market Basics",
    content: [
      {
        subtitle: "What is the Stock Market?",
        details: [
          "A marketplace where shares of public companies are traded.",
          "Major exchanges: NYSE, NASDAQ, LSE, BSE, NSE, etc."
        ]
      },
      {
        subtitle: "Key Terms",
        details: [
          "Stocks: Ownership in a company.",
          "Indices: Group of stocks representing a market segment (e.g., S&P 500, Dow Jones).",
          "Bull Market: Market rising in value.",
          "Bear Market: Market declining in value."
        ]
      },
      {
        subtitle: "Types of Stocks",
        details: [
          "Common Stock: Voting rights + dividends.",
          "Preferred Stock: Fixed dividends, no voting rights.",
          "Growth Stocks: High potential growth, less focus on dividends.",
          "Dividend Stocks: Steady payouts to investors."
        ]
      }
    ]
  },
  {
    title: "Trading & Investing Basics",
    content: [
      {
        subtitle: "Trading Types",
        details: [
          "Intraday Trading: Buy/sell within the same day.",
          "Swing Trading: Hold for days/weeks to capture trends.",
          "Position Trading: Long-term holding for significant trends."
        ]
      },
      {
        subtitle: "Order Types",
        details: [
          "Market Order: Buy/sell at the current price.",
          "Limit Order: Buy/sell at a specific price or better.",
          "Stop-Loss Order: Automatically sell if the price falls below a set value."
        ]
      },
      {
        subtitle: "Investment Strategies",
        details: [
          "Value Investing: Buy undervalued stocks (e.g., using PE ratio).",
          "Growth Investing: Focus on high-growth potential stocks.",
          "Index Investing: Invest in funds tracking indices like S&P 500."
        ]
      }
    ]
  },
  {
    title: "Fundamental Analysis",
    content: [
      {
        subtitle: "Key Metrics",
        details: [
          "Earnings Per Share (EPS): Net income ÷ outstanding shares.",
          "Price-to-Earnings (P/E) Ratio: Stock price ÷ EPS.",
          "Dividend Yield: Annual dividends ÷ stock price.",
          "Debt-to-Equity Ratio: Total liabilities ÷ shareholder equity."
        ]
      },
      {
        subtitle: "Analyzing Financial Statements",
        details: [
          "Income Statement: Revenue, expenses, and profit.",
          "Balance Sheet: Assets, liabilities, and equity.",
          "Cash Flow Statement: Inflows/outflows of cash."
        ]
      }
    ]
  },
  {
    title: "Technical Analysis",
    content: [
      {
        subtitle: "Chart Types",
        details: [
          "Line Chart, Bar Chart, Candlestick Chart."
        ]
      },
      {
        subtitle: "Indicators",
        details: [
          "Moving Averages (MA): Trends over time.",
          "Relative Strength Index (RSI): Overbought/oversold conditions.",
          "MACD (Moving Average Convergence Divergence): Trend direction and strength.",
          "Volume: Confirms trend strength."
        ]
      },
      {
        subtitle: "Chart Patterns",
        details: [
          "Bullish: Head and Shoulders, Cup and Handle.",
          "Bearish: Double Top, Rising Wedge."
        ]
      }
    ]
  },
  {
    title: "Risk Management",
    content: [
      {
        subtitle: "Strategies",
        details: [
          "Diversification: Spread investments across sectors.",
          "Position Sizing: Limit exposure to any one trade.",
          "Stop-Loss Strategy: Minimize potential losses.",
          "Risk/Reward Ratio: Assess risk compared to potential profit."
        ]
      }
    ]
  },
  {
    title: "Market Sentiments",
    content: [
      {
        subtitle: "Factors",
        details: [
          "News Impact: Company earnings, geopolitical events, etc.",
          "Economic Indicators: GDP, unemployment rate, inflation.",
          "Market Trends: Seasonal trends, investor confidence."
        ]
      }
    ]
  },
  {
    title: "Tools and Platforms",
    content: [
      {
        subtitle: "Resources",
        details: [
          "Charting Tools: TradingView, MetaTrader, Thinkorswim.",
          "Screeners: Finviz, Yahoo Finance, MarketWatch.",
          "News Platforms: Bloomberg, Reuters, CNBC."
        ]
      }
    ]
  }
]

const StockMarketLearning: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  return (
    <Card className="w-full border-none">
      <CardHeader>
        <CardTitle>Stock Market Learning Resource</CardTitle>
        <CardDescription>Explore key concepts of the stock market</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion
          type="multiple"
          value={expandedSections}
          onValueChange={setExpandedSections}
          className="w-full"
        >
          {stockMarketData.map((section, index) => (
            <AccordionItem
              value={section.title}
              key={`section-${index}`}
            >
              <AccordionTrigger onClick={() => toggleSection(section.title)}>
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                {section.content.map((item, subIndex) => (
                  <div key={subIndex} className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">{item.subtitle}</h3>
                    <ul className="list-disc pl-5">
                      {item.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="mb-1">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default StockMarketLearning;