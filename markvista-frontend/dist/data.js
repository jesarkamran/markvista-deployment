export default function services() {
  return [
    {
      icon: "portfolioIcon",
      name: "Portfolio Management",
      service:
        "Provides a centralized view of your investments, allowing you to view asset details, analyze portfolio performance, and set financial goals with tracking capabilities.",
    },
    {
      icon: "riskManagementIcon",
      name: "Risk Management",
      service:
        "Offers tools to manage investment risks through user-defined risk profiles, visualizations of risk exposure, and the ability to set maximum portfolio risk levels.",
    },
    {
      icon: "communityIcon",
      name: "Community",
      service:
        "Facilitates user interaction through query posting, answering, editing, and deleting interactions, as well as liking or disliking content to foster engagement.",
    },
    {
      icon: "marketPredictionsIcon",
      name: "Market Predictions",
      service:
        "Delivers AI-driven cryptocurrency market predictions, historical analysis for informed decisions, and sentiment polls for gauging bullish or bearish market trends.",
    },
    {
      icon: "adminDashboardIcon",
      name: "Admin Dashboard",
      service:
        "Empowers administrators to manage the platform with features like updating privacy policies, managing user profiles, deleting interactions, and suspending users to ensure platform compliance and integrity.",
    },
    {
      icon: "tradingPanelIcon",
      name: "Trading Panel",
      service:
        "Provides a seamless trading experience with real-time order updates, support for stop-loss and take-profit settings, detailed order history, and personalized alerts for an efficient and informed trading process.",
    },
  ];
}

export const learnings = () => {
  return {
    basics: [
      {
        title: "What is Cryptocurrency?",
        content:
          "Cryptocurrency is a digital or virtual currency that uses cryptography for security. It operates independently of a central authority or government, making it immune to manipulation or control. The most famous cryptocurrency is Bitcoin, but many others like Ethereum and Ripple also exist. Cryptocurrencies offer decentralized peer-to-peer transactions, and most operate on blockchain technology, which ensures transparency, security, and immutability of records.",
      },
      {
        title: "How does Blockchain work?",
        content:
          "Blockchain is a decentralized, distributed ledger technology that records all transactions across a network of computers in a secure and transparent manner. Each transaction is stored in a 'block,' which is linked to the previous block, forming a 'chain.' This structure makes it extremely difficult to alter any part of the blockchain without changing all subsequent blocks, ensuring data integrity. Blockchain technology is the backbone of most cryptocurrencies, but it has potential uses beyond finance, including supply chain management and healthcare.",
      },
      {
        title: "Types of Cryptocurrencies",
        content:
          "There are thousands of cryptocurrencies, with Bitcoin, Ethereum, and Litecoin being some of the most well-known. Bitcoin is the first cryptocurrency, often referred to as 'digital gold' due to its store-of-value qualities. Ethereum, on the other hand, enables smart contracts and decentralized applications (dApps), providing more functionality than Bitcoin. Other notable cryptocurrencies include Ripple (XRP), Cardano (ADA), and Polkadot (DOT), each serving different use cases, such as faster transactions, scalability, or improved privacy features.",
      },
    ],
    markets: [
      {
        title: "Market Capitalization",
        content:
          "Market capitalization (market cap) is calculated by multiplying the total number of coins in circulation by the current market price of a cryptocurrency. It is an important metric for evaluating the size and popularity of a cryptocurrency. A higher market cap often indicates a more established and stable cryptocurrency, while smaller market caps can indicate newer or more volatile coins. Market cap is categorized into three main groups: large-cap, mid-cap, and small-cap, based on their market value.",
      },
      {
        title: "Trading Volume",
        content:
          "Trading volume represents the total amount of coins traded in a given period, typically measured in 24-hour intervals. It provides insights into the level of activity and liquidity in the market for a specific cryptocurrency. High trading volume often suggests that a cryptocurrency is actively being bought and sold, which can indicate growing interest or volatility. Conversely, low volume can suggest that the cryptocurrency is less popular or experiencing a period of stagnation.",
      },
      {
        title: "Liquidity",
        content:
          "Liquidity refers to how easily a cryptocurrency can be bought or sold without causing a significant price movement. A highly liquid market means that there are enough buyers and sellers, allowing for quick and efficient transactions. Liquidity is an important factor for traders, as it helps to reduce slippage and ensures that they can execute trades at desired prices. Cryptocurrencies with higher liquidity, like Bitcoin and Ethereum, tend to be less volatile compared to smaller, less liquid altcoins.",
      },
    ],
    influences: [
      {
        title: "Regulatory News",
        content:
          "Government regulations and policies can significantly impact cryptocurrency prices and adoption. Regulations vary by country and can range from welcoming to restrictive, affecting the legal status of cryptocurrencies, their taxation, and the requirements for exchanges and businesses operating within the space. Positive regulatory news, such as official recognition or adoption by major financial institutions, can drive up prices. Conversely, negative news, such as government crackdowns or bans, can lead to price drops and market uncertainty.",
      },
      {
        title: "Technological Advancements",
        content:
          "Improvements in blockchain technology or new features can influence a cryptocurrency's value. Innovations such as scalability solutions (e.g., Ethereum's transition to proof-of-stake), new consensus algorithms, or enhanced privacy features can make a cryptocurrency more appealing to users and investors. Technological upgrades or breakthroughs that improve network efficiency, reduce transaction costs, or offer greater security can create positive sentiment around a cryptocurrency, leading to increased adoption and price appreciation.",
      },
      {
        title: "Market Sentiment",
        content:
          "Social media trends, news coverage, and overall public perception can sway crypto prices significantly. Market sentiment is often influenced by public figures, influencers, or major financial institutions entering or exiting the market. Positive sentiment, such as endorsements from celebrities or institutional investments, can drive prices up, while negative sentiment, such as widespread fear, uncertainty, or doubt (FUD), can lead to price declines. Traders often rely on sentiment analysis tools to gauge market mood and make informed decisions.",
      },
    ],
  };
};

export const portfolioData = () => {
  return [
    {
      symbol: "BTCUSDT",
      orderType: "Market",
      leverage: "8",
      updatedTime: "1733845180543",
      side: "Sell",
      orderId: "7cba0a42-2a3c-44b2-9ed0-193ef82b7b02",
      closedPnl: "-405.3123",
      avgEntryPrice: "97000",
      qty: "0.708",
      cumEntryValue: "68676",
      createdTime: "1733834661503",
      orderPrice: "95577.2",
      closedSize: "0.708",
      avgExitPrice: "96500",
      execType: "Trade",
      fillCount: "1",
      cumExitValue: "68322",
    },
    {
      symbol: "BTCUSDT",
      orderType: "Market",
      leverage: "8",
      updatedTime: "1733729770513",
      side: "Buy",
      orderId: "6c5b654a-7168-4421-83c1-371119210b47",
      closedPnl: "-209.53892478",
      avgEntryPrice: "98540",
      qty: "0.389",
      cumEntryValue: "38332.06",
      createdTime: "1733728698873",
      orderPrice: "99982.4",
      closedSize: "0.389",
      avgExitPrice: "99004.5",
      execType: "Trade",
      fillCount: "1",
      cumExitValue: "38512.7505",
    },
    {
      symbol: "BTCUSDT",
      orderType: "Market",
      leverage: "23.5",
      updatedTime: "1733437615078",
      side: "Sell",
      orderId: "860ae522-5483-47d5-a686-34de2b7c928f",
      closedPnl: "-310.49950386",
      avgEntryPrice: "97000",
      qty: "0.364",
      cumEntryValue: "35308",
      createdTime: "1733437609535",
      orderPrice: "95486.4",
      closedSize: "0.364",
      avgExitPrice: "96219.3",
      execType: "Trade",
      fillCount: "1",
      cumExitValue: "35023.8252",
    },
    {
      symbol: "BTCUSDT",
      orderType: "Market",
      leverage: "23.5",
      updatedTime: "1733428592713",
      side: "Sell",
      orderId: "7e0efd1b-6f1b-4ee9-8804-6d19507b94a2",
      closedPnl: "-197.6988",
      avgEntryPrice: "100000",
      qty: "0.184",
      cumEntryValue: "18400",
      createdTime: "1733427858093",
      orderPrice: "98012.7",
      closedSize: "0.184",
      avgExitPrice: "99000",
      execType: "Trade",
      fillCount: "1",
      cumExitValue: "18216",
    },
    {
      symbol: "LISTAUSDT",
      orderType: "Market",
      leverage: "10",
      updatedTime: "1733392229619",
      side: "Sell",
      orderId: "948f4e2c-3646-4118-a83f-3b094dbd807c",
      closedPnl: "-3.84054527",
      avgEntryPrice: "0.6",
      qty: "1841",
      cumEntryValue: "1104.6",
      createdTime: "1733392229619",
      orderPrice: "0.5694",
      closedSize: "1841",
      avgExitPrice: "0.5993",
      execType: "Trade",
      fillCount: "1",
      cumExitValue: "1103.3113",
    },
    {
      "Trade Metrics": {
        totalTrades: 5,
        avgTradeOutput: -225.37801478199998,
        avgWinningTrade: 0,
        avgLosingTrade: -225.37801478199998,
        winRate: 0,
      },
      "Best Trade": {
        symbol: "LISTAUSDT",
        orderType: "Market",
        leverage: "10",
        updatedTime: "1733392229619",
        side: "Sell",
        orderId: "948f4e2c-3646-4118-a83f-3b094dbd807c",
        closedPnl: -3.84054527,
        avgEntryPrice: "0.6",
        qty: "1841",
        cumEntryValue: "1104.6",
        createdTime: "1733392229619",
        orderPrice: "0.5694",
        closedSize: "1841",
        avgExitPrice: "0.5993",
        execType: "Trade",
        fillCount: "1",
        cumExitValue: "1103.3113",
      },
      "Worst Trade": {
        symbol: "BTCUSDT",
        orderType: "Market",
        leverage: "8",
        updatedTime: "1733845180543",
        side: "Sell",
        orderId: "7cba0a42-2a3c-44b2-9ed0-193ef82b7b02",
        closedPnl: -405.3123,
        avgEntryPrice: "97000",
        qty: "0.708",
        cumEntryValue: "68676",
        createdTime: "1733834661503",
        orderPrice: "95577.2",
        closedSize: "0.708",
        avgExitPrice: "96500",
        execType: "Trade",
        fillCount: "1",
        cumExitValue: "68322",
      },
      "Top 5 Best Coins": [
        {
          symbol: "LISTAUSDT",
          totalPnL: -3.84054527,
          totalLoss: -3.84054527,
        },
        {
          symbol: "BTCUSDT",
          totalPnL: -1123.04952864,
          totalLoss: -1123.04952864,
        },
      ],
      "Top 5 Worst Coins": [
        {
          symbol: "BTCUSDT",
          totalPnL: -1123.04952864,
          totalLoss: -1123.04952864,
        },
        {
          symbol: "LISTAUSDT",
          totalPnL: -3.84054527,
          totalLoss: -3.84054527,
        },
      ],
    },
  ];
};
