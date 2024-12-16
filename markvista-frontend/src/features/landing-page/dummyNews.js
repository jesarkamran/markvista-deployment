export default function getNews() {
  // return [
  //   {
  //     news_url:
  //       "https://cryptopotato.com/crypto-market-cap-slumped-by-300-billion-amid-btc-altcoin-massacre-market-watch/",
  //     image_url:
  //       "https://crypto.snapi.dev/images/v1/c/a/r/btc11-571794-608765.jpg",
  //     title:
  //       "Crypto Market Cap Slumped by $300 Billion Amid BTC, Altcoin Massacre: Market Watch",
  //     text: "The metric had peaked at $3.9 trillion before it dumped to under $3.6.",
  //     source_name: "CryptoPotato",
  //     date: "Tue, 10 Dec 2024 04:48:50 -0500",
  //     topics: ["pricemovement"],
  //     sentiment: "Negative",
  //     type: "Article",
  //     tickers: ["BTC"],
  //   },
  //   {
  //     news_url:
  //       "https://zycrypto.com/el-salvador-plans-to-weaken-bitcoin-policy-to-unlock-1-3-billion-loan-from-imf/",
  //     image_url:
  //       "https://crypto.snapi.dev/images/v1/7/z/z/btc28-571715-608761.jpg",
  //     title:
  //       "El Salvador Plans To Weaken Bitcoin Policy To Unlock $1.3 Billion Loan From IMF",
  //     text: "A new report suggests that El Salvador is coming closer to striking an agreement with the International Monetary Fund (IMF) on multi-billion dollar funding — but it has to tweak some aspects of its contentious Bitcoin law in return.",
  //     source_name: "Zycrypto",
  //     date: "Tue, 10 Dec 2024 04:44:37 -0500",
  //     topics: ["pricemovement"],
  //     sentiment: "Negative",
  //     type: "Article",
  //     tickers: ["BTC"],
  //   },
  //   {
  //     news_url:
  //       "https://cryptoslate.com/bitcoin-shows-strength-for-further-upside-as-it-consolidates-on-100k-bitfinex/",
  //     image_url:
  //       "https://crypto.snapi.dev/images/v1/n/d/a/bitcoin-reserve-608759.jpg",
  //     title:
  //       "Bitcoin shows strength for further upside as it consolidates on $100k — Bitfinex",
  //     text: "Bitcoin's (BTC) 14% weekly correction after surpassing the $100,000 threshold does not invalidate its potential for further upside as key price metrics cooled down, according to the latest edition of the “Bitfinex Alpha” report. The correction wiped out over $1.",
  //     source_name: "CryptoSlate",
  //     date: "Tue, 10 Dec 2024 04:43:19 -0500",
  //     topics: ["pricemovement"],
  //     sentiment: "Positive",
  //     type: "Article",
  //     tickers: ["BTC"],
  //   },
  //   {
  //     news_url:
  //       "https://news.bitcoin.com/trump-effect-bitcoin-etfs-attract-10-billion-inflows-since-election-day/",
  //     image_url:
  //       "https://crypto.snapi.dev/images/v1/2/b/l/btc71-571655-608751.jpg",
  //     title:
  //       "Trump Effect: Bitcoin ETFs Attract $10 Billion Inflows Since Election Day",
  //     text: "Since Election Day, bitcoin exchange-traded funds (ETFs) have garnered the attention of Wall Street investors who seem convinced that President-elect Donald Trump will be able to bring regulatory clarity to push the bitcoin industry to new heights.",
  //     source_name: "Bitcoin",
  //     date: "Tue, 10 Dec 2024 04:30:49 -0500",
  //     topics: ["pricemovement"],
  //     sentiment: "Positive",
  //     type: "Article",
  //     tickers: ["BTC"],
  //   },
  //   {
  //     news_url:
  //       "https://www.benzinga.com/markets/cryptocurrency/24/12/42407035/block-ceo-jack-dorsey-sports-cryptic-satoshi-t-shirt-at-africa-bitcoin-conference?utm_source=snapi",
  //     image_url:
  //       "https://crypto.snapi.dev/images/v1/b/g/q/btc64-571668-608752.jpg",
  //     title:
  //       "Block CEO Jack Dorsey Sports Cryptic 'Satoshi' T-Shirt At Africa Bitcoin Conference",
  //     text: "CEO and co-founder of Block Inc. Jack Dorsey made an appearance in Kenya for the Africa Bitcoin Conference, which will take place in Nairobi from Dec. 9 to 11. What Happened: Dorsey, who had previously endorsed the conference in April at a Bitcoin (CRYPTO: BTC) event in Madeira, Portugal, is fulfilling his promise to attend its third edition.",
  //     source_name: "Benzinga",
  //     date: "Tue, 10 Dec 2024 04:30:32 -0500",
  //     topics: [],
  //     sentiment: "Positive",
  //     type: "Article",
  //     tickers: ["BTC"],
  //   },
  //   {
  //     news_url:
  //       "https://cointelegraph.com/news/quantum-computing-satoshi-bitcoin-vulnerability?utm_source=rss_feed&utm_medium=rss&utm_campaign=rss_partner_inbound",
  //     image_url:
  //       "https://crypto.snapi.dev/images/v1/y/z/i/btc65-571660-608747.jpg",
  //     title:
  //       "Could quantum computing threaten Satoshi Nakamoto's 1 million Bitcoin?",
  //     text: "Quantum computing raises concerns over the security of Satoshi Nakamoto's 1 million Bitcoin, sparking debates on freezing vulnerable holdings to safeguard the network's future.",
  //     source_name: "Cointelegraph",
  //     date: "Tue, 10 Dec 2024 04:28:47 -0500",
  //     topics: [],
  //     sentiment: "Negative",
  //     type: "Article",
  //     tickers: ["BTC"],
  //   },
  //   {
  //     news_url:
  //       "https://www.investingcube.com/cryptocurrency/bitcoin-price-signals-weakness-near-97k-heres-why/",
  //     image_url:
  //       "https://crypto.snapi.dev/images/v1/3/b/x/btc21-571782-608746.jpg",
  //     title: "Bitcoin Price Signals Weakness Near $97K. Here's Why",
  //     text: "Bitcoin price momentum has waned in recent days and multiple metrics signal consolidation. How low can it go?",
  //     source_name: "InvestingCube",
  //     date: "Tue, 10 Dec 2024 04:27:59 -0500",
  //     topics: ["pricemovement"],
  //     sentiment: "Negative",
  //     type: "Article",
  //     tickers: ["BTC"],
  //   },
  //   {
  //     news_url:
  //       "https://u.today/rich-dad-poor-dad-author-biggest-crash-in-history-coming-buy-bitcoin-now?utm_source=snapi",
  //     image_url: "https://crypto.snapi.dev/images/v1/c/z/9/54543-608743.jpg",
  //     title:
  //       "'Rich Dad Poor Dad' Author: 'Biggest Crash in History Coming. Buy Bitcoin Now'",
  //     text: "Robert Kiyosaki, a Bitcoin investor, entrepreneur, and the author of the best-selling book on increasing personal wealth “Rich Dad Poor Dad”, has again predicted a big crash to come in the near future, urging his followers to buy Bitcoin before it happens.",
  //     source_name: "UToday",
  //     date: "Tue, 10 Dec 2024 04:23:00 -0500",
  //     topics: [],
  //     sentiment: "Positive",
  //     type: "Article",
  //     tickers: ["BTC"],
  //   },
  //   {
  //     news_url:
  //       "https://coinmarketcap.com/alexandria/article/what-happened-in-crypto-today-what-really-happened-when-bitcoin-peaked",
  //     image_url:
  //       "https://crypto.snapi.dev/images/v1/l/w/6/jy54rf-571182-608737.jpg",
  //     title:
  //       "What Happened in Crypto Today: What Really Happened When Bitcoin Peaked?",
  //     text: "Here is a 2-minute breakdown of everything important that happened in crypto today.",
  //     source_name: "CoinMarketCap",
  //     date: "Tue, 10 Dec 2024 04:20:27 -0500",
  //     topics: [],
  //     sentiment: "Neutral",
  //     type: "Article",
  //     tickers: ["BTC"],
  //   },
  //   {
  //     news_url:
  //       "https://www.cryptopolitan.com/russia-proposal-national-bitcoin-reserve/",
  //     image_url:
  //       "https://crypto.snapi.dev/images/v1/5/r/v/r323er-582253-608735.jpg",
  //     title: "Russia considers proposal for a national Bitcoin reserve",
  //     text: "Russia's State Duma deputy Anton Tkachev has officially proposed the idea of creating a national Bitcoin reserve. His appeal to Finance Minister Anton Siluanov outlines a vision of something that could safeguard the country's financial stability against sanctions, inflation, and the unpredictability of traditional currency reserves.",
  //     source_name: "Cryptopolitan",
  //     date: "Tue, 10 Dec 2024 04:16:19 -0500",
  //     topics: [],
  //     sentiment: "Positive",
  //     type: "Article",
  //     tickers: ["BTC"],
  //   },
  //   {
  //     news_url:
  //       "https://thecurrencyanalytics.com/bitcoin/robert-kiyosakis-100k-bitcoin-prediction-strategies-insights-and-economic-warnings-150879",
  //     image_url:
  //       "https://crypto.snapi.dev/images/v1/m/b/j/btc64-571668-608750.jpg",
  //     title:
  //       "Robert Kiyosaki's $100K Bitcoin Prediction: Strategies, Insights, and Economic Warnings",
  //     text: "Renowned financial educator and Rich Dad Poor Dad author Robert Kiyosaki has drawn attention to Bitcoin's climb to $100,000, viewing it as a critical turning point in the cryptocurrency's journey. His insights, strategies, and bold predictions offer a window into how he navigates the volatile world of Bitcoin investment.",
  //     source_name: "The Currency Analytics",
  //     date: "Tue, 10 Dec 2024 04:16:02 -0500",
  //     topics: ["priceforecast", "pricemovement"],
  //     sentiment: "Positive",
  //     type: "Article",
  //     tickers: ["BTC"],
  //   },
  //   {
  //     news_url:
  //       "https://cointelegraph.com/news/bitcoin-most-liquidations-since-2021-crazy-reset-wipes-1-6-b?utm_source=rss_feed&utm_medium=rss&utm_campaign=rss_partner_inbound",
  //     image_url:
  //       "https://crypto.snapi.dev/images/v1/f/j/b/btc66-571659-608736.jpg",
  //     title:
  //       "Bitcoin sees most liquidations since 2021 as 'crazy' reset wipes $1.6B",
  //     text: 'Bitcoin and crypto liquidations pile up amid "unusual" conditions which began with Coinbase traders offloading BTC.',
  //     source_name: "Cointelegraph",
  //     date: "Tue, 10 Dec 2024 04:15:31 -0500",
  //     topics: ["pricemovement"],
  //     sentiment: "Negative",
  //     type: "Article",
  //     tickers: ["BTC"],
  //   },
  //   {
  //     news_url:
  //       "https://cointelegraph.com/news/vancouver-bitcoin-friendly-city-financial-strategies?utm_source=rss_feed&utm_medium=rss&utm_campaign=rss_partner_inbound",
  //     image_url:
  //       "https://crypto.snapi.dev/images/v1/c/d/a/btc76-509996-608733.jpg",
  //     title: "Vancouver mayor proposes Bitcoin adoption to fight inflation",
  //     text: "Mayor Ken Sim urges Vancouver to explore Bitcoin adoption, highlighting its potential to safeguard financial stability amid fiat inflation.",
  //     source_name: "Cointelegraph",
  //     date: "Tue, 10 Dec 2024 04:11:53 -0500",
  //     topics: [],
  //     sentiment: "Positive",
  //     type: "Article",
  //     tickers: ["BTC"],
  //   },
  //   {
  //     news_url:
  //       "https://coinpedia.org/news/crypto-market-correction-sparks-1-76-billion-in-liquidations-bitcoin-and-ethereum-hit-hard/",
  //     image_url:
  //       "https://crypto.snapi.dev/images/v1/o/s/g/is-the-next-crypto-market-cras-608723.webp",
  //     title:
  //       "Crypto Market Correction Sparks $1.76 Billion in Liquidations, Bitcoin and Ethereum Hit Hard",
  //     text: "The cryptocurrency market faced a sharp sell-off over the past 24 hours, triggering liquidations worth $1.76 billion across 583,810 traders. This marks one of the largest liquidation events since 2021, driven by sudden price drops in Bitcoin and altcoins.",
  //     source_name: "CoinPedia",
  //     date: "Tue, 10 Dec 2024 03:58:53 -0500",
  //     topics: ["pricemovement"],
  //     sentiment: "Negative",
  //     type: "Article",
  //     tickers: ["BTC", "ETH"],
  //   },
  //   {
  //     news_url:
  //       "https://www.coinspeaker.com/former-binance-ceo-projects-china-bitcoin-reserve-move-following-us-plans/",
  //     image_url:
  //       "https://crypto.snapi.dev/images/v1/y/n/h/btc66-571659-608722.jpg",
  //     title:
  //       "Former Binance CEO Projects China Bitcoin Reserve Move Following US Plans",
  //     text: "CZ believes China's establishment of a strategic Bitcoin reserve is “inevitable,” despite the nation's unpredictable approach to cryptocurrencies.",
  //     source_name: "Coinspeaker",
  //     date: "Tue, 10 Dec 2024 03:56:57 -0500",
  //     topics: [],
  //     sentiment: "Neutral",
  //     type: "Article",
  //     tickers: ["BTC"],
  //   },
  //   {
  //     news_url:
  //       "https://crypto.news/tokyo-listed-remixpoint-boosts-bitcoin-reserves-with-1-4m-purchase/",
  //     image_url:
  //       "https://crypto.snapi.dev/images/v1/l/9/k/btc29-571719-608720.jpg",
  //     title:
  //       "Tokyo-listed Remixpoint boosts Bitcoin reserves with $1.4m purchase",
  //     text: "Remixpoint's latest Bitcoin purchase of $1.38 million boosts its total crypto holdings to a market value of $34.3 million, reflecting a profit of nearly $6.72 million.",
  //     source_name: "Crypto news",
  //     date: "Tue, 10 Dec 2024 03:56:53 -0500",
  //     topics: ["pricemovement"],
  //     sentiment: "Positive",
  //     type: "Article",
  //     tickers: ["BTC"],
  //   },
  //   {
  //     news_url:
  //       "https://www.coinspeaker.com/fomo-alert-santiment-expects-retail-buying-surge-bitcoin-94-3k/",
  //     image_url:
  //       "https://crypto.snapi.dev/images/v1/k/6/x/btc77-571617-608721.jpg",
  //     title:
  //       "FOMO Alert: Santiment Expects Retail Buying to Surge as Bitcoin $94.3K",
  //     text: "Bitcoin's recent dip triggers widespread liquidations and market corrections. But growing interest in the crowd to buy discounted coins suggests potential recovery.",
  //     source_name: "Coinspeaker",
  //     date: "Tue, 10 Dec 2024 03:56:00 -0500",
  //     topics: ["pricemovement"],
  //     sentiment: "Positive",
  //     type: "Article",
  //     tickers: ["BTC"],
  //   },
  //   {
  //     news_url:
  //       "https://www.altcoinbuzz.io/cryptocurrency-news/indian-firm-jetking-makes-bitcoin-its-treasury-asset/",
  //     image_url:
  //       "https://crypto.snapi.dev/images/v1/u/4/a/btc12-571797-608727.jpg",
  //     title: "Indian Firm Jetking Makes Bitcoin Its Treasury Asset",
  //     text: "The Indian business focuses on IT training. It has become the first public company in India to adopt a Bitcoin Treasury Strategy.",
  //     source_name: "Altcoin Buzz",
  //     date: "Tue, 10 Dec 2024 03:46:00 -0500",
  //     topics: ["regulations"],
  //     sentiment: "Positive",
  //     type: "Article",
  //     tickers: ["BTC"],
  //   },
  //   {
  //     news_url:
  //       "https://ambcrypto.com/why-is-bitcoin-down-profit-taking-quantum-fears-drag-btc/",
  //     image_url:
  //       "https://crypto.snapi.dev/images/v1/g/c/v/whyisbitcoindown-608716.jpg",
  //     title: "Why is Bitcoin down? Profit-taking, quantum fears drag BTC",
  //     text: "Here's how sell-off by large players and Google's quantum update dented market sentiment.",
  //     source_name: "AMBCrypto",
  //     date: "Tue, 10 Dec 2024 03:45:58 -0500",
  //     topics: [],
  //     sentiment: "Negative",
  //     type: "Article",
  //     tickers: ["BTC"],
  //   },
  //   {
  //     news_url:
  //       "https://coinpedia.org/news/russia-proposes-bitcoin-reserve-strategy-amid-global-shift-toward-digital-currency-reserves/",
  //     image_url:
  //       "https://crypto.snapi.dev/images/v1/n/d/h/crypto-mining-company-newrays--608715.webp",
  //     title:
  //       "Russia Proposes Bitcoin Reserve Strategy Amid Global Shift Toward Digital Currency Reserves",
  //     text: "Since the US political scenario shifted in the favour of cryptocurrencies on November 5, when pro-crypto candidate Donald Trump won the presidential election against Kamala Harris, who represented a crypto-skeptic regime, global economic powers have been slowly changing their attitude towards the crypto sector, particularly in support of the futuristic idea of establishing a Bitcoin",
  //     source_name: "CoinPedia",
  //     date: "Tue, 10 Dec 2024 03:45:07 -0500",
  //     topics: [],
  //     sentiment: "Positive",
  //     type: "Article",
  //     tickers: ["BTC"],
  //   },
  // ];
  return [
    {
      news_url:
        "https://coincu.com/296593-bitcoin-spot-etf-inflows-reach-223m-over-10d/?utm_source=snapi",
      image_url:
        "https://crypto.snapi.dev/images/v1/o/p/d/image-163-6-610155.jpg",
      title: "Bitcoin Spot ETF Inflows Reach $223M Over 10-Day Streak",
      text: "Key Points:",
      source_name: "Coincu",
      date: "Thu, 12 Dec 2024 01:09:10 -0500",
      topics: ["pricemovement"],
      sentiment: "Positive",
      type: "Article",
      tickers: ["BTC"],
    },
    {
      news_url:
        "https://www.newsbtc.com/bitcoin-news/bitcoin-on-track-for-275000-analyst-cites-cup-and-handle-formation/",
      image_url:
        "https://crypto.snapi.dev/images/v1/m/y/d/jy54rf-571182-610149.jpg",
      title:
        "Bitcoin On Track For $275,000? Analyst Cites Cup And Handle Formation",
      text: "Bitcoin (BTC) fell to $94,500 yesterday after Microsoft shareholders decisively rejected a Bitcoin treasury proposal to allocate 1% of the company's total assets to buy BTC as an inflation hedge. However, analysts are still confident of further appreciation of the BTC price.",
      source_name: "NewsBTC",
      date: "Thu, 12 Dec 2024 01:00:19 -0500",
      topics: ["priceforecast", "pricemovement"],
      sentiment: "Positive",
      type: "Article",
      tickers: ["BTC"],
    },
    {
      news_url:
        "https://decrypt.co/296165/australian-regulator-likens-bitcoin-to-prison-currency-amid-controversial-consultation-paper",
      image_url:
        "https://crypto.snapi.dev/images/v1/c/d/p/2edfdew2-571655-610148.jpg",
      title:
        "Australian Regulator Likens Bitcoin to Prison Currency Amid Controversial Consultation Paper",
      text: "ASIC's digital asset lead compared Bitcoin to cigarettes while responding to questions on proposed Australian crypto regulation.",
      source_name: "Decrypt",
      date: "Thu, 12 Dec 2024 00:55:10 -0500",
      topics: ["regulations"],
      sentiment: "Negative",
      type: "Article",
      tickers: ["BTC"],
    },
    {
      news_url:
        "https://www.cryptopolitan.com/thomas-peterffy-of-interactive-brokers/",
      image_url:
        "https://crypto.snapi.dev/images/v1/z/p/5/thomas-petterffy-bitcoin-20241-610143.webp",
      title:
        "Thomas Peterffy, founder of Interactive Brokers, recommends an allocation of 2% to 3% of net assets to Bitcoin",
      text: "Thomas Peterffy, the billionaire founder of Interactive Brokers Group, recommended that investors have 2-3% of the net assets in Bitcoin. He said his firm only allowed its clientele to put up to 10% of their total assets into crypto.",
      source_name: "Cryptopolitan",
      date: "Thu, 12 Dec 2024 00:30:28 -0500",
      topics: [],
      sentiment: "Positive",
      type: "Article",
      tickers: ["BTC"],
    },
    {
      news_url:
        "https://www.coindesk.com/markets/2024/12/12/less-than-1-of-microsoft-shareholders-voted-for-btc-proposal",
      image_url:
        "https://crypto.snapi.dev/images/v1/d/v/u/btc36-571682-610137.jpg",
      title: "Less than 1% of Microsoft Shareholders Voted for BTC Proposal",
      text: "Prediction markets were skeptical that such a motion would pass.",
      source_name: "Coindesk",
      date: "Thu, 12 Dec 2024 00:08:18 -0500",
      topics: [],
      sentiment: "Negative",
      type: "Article",
      tickers: ["BTC"],
    },
    {
      news_url:
        "https://coinpedia.org/news/elon-musks-net-worth-crosses-400-billion-bitcoin-tesla-and-spacex-holding-surge/",
      image_url:
        "https://crypto.snapi.dev/images/v1/g/r/w/elon-musk-net-worth-soars-to-3-610134.webp",
      title:
        "Elon Musk's Net Worth Crosses $400 Billion: Bitcoin, Tesla, and SpaceX Holding Surge",
      text: "Elon Musk has once again shattered records, becoming the first person ever to reach a net worth exceeding $400 billion. This achievement marks a historic milestone, driven by surging valuations of his companies, particularly Tesla and SpaceX, along with the remarkable performance of his crypto investments as the Bitcoin price surged past the $100k milestone.",
      source_name: "CoinPedia",
      date: "Thu, 12 Dec 2024 00:01:21 -0500",
      topics: ["pricemovement"],
      sentiment: "Positive",
      type: "Article",
      tickers: ["BTC"],
    },
    {
      news_url:
        "https://www.theblock.co/post/330485/vancouvers-city-council-greenlights-exploring-bitcoin-in-municipal-finance",
      image_url:
        "https://crypto.snapi.dev/images/v1/f/o/5/btc30-571712-610132.jpg",
      title:
        "Vancouver's city council greenlights exploring Bitcoin in municipal finance",
      text: "The approved motion proposed that the city turn a portion of its financial reserves into bitcoin and accept taxes in bitcoin.",
      source_name: "The Block",
      date: "Wed, 11 Dec 2024 23:52:18 -0500",
      topics: [],
      sentiment: "Positive",
      type: "Article",
      tickers: ["BTC"],
    },
    {
      news_url: "https://blockchain.news/news/bitcoin-historic-100k-milestone",
      image_url:
        "https://crypto.snapi.dev/images/v1/3/m/b/btcv27hgfr-594563-610146.jpg",
      title:
        "Bitcoin's Historic $100k Milestone Marks New Era in Crypto Adoption",
      text: "Bitcoin's price surpasses $100,000, marking a significant milestone in its evolution, driven by robust network growth, institutional adoption, and increased market capitalization.",
      source_name: "Blockchain News",
      date: "Wed, 11 Dec 2024 23:47:00 -0500",
      topics: ["pricemovement"],
      sentiment: "Positive",
      type: "Article",
      tickers: ["BTC"],
    },
    {
      news_url:
        "https://ambcrypto.com/bitcoin-this-group-starts-selling-btc-troubling-times-ahead/",
      image_url:
        "https://crypto.snapi.dev/images/v1/6/b/w/canva-btc-2-1024x585-610116.png",
      title: "Bitcoin: THIS group starts selling BTC – Troubling times ahead?",
      text: "Bitcoin is currently trading in a mid-range, with long-term holders continuing to take profits.",
      source_name: "AMBCrypto",
      date: "Wed, 11 Dec 2024 23:00:06 -0500",
      topics: [],
      sentiment: "Negative",
      type: "Article",
      tickers: ["BTC"],
    },
    {
      news_url:
        "https://coingape.com/crypto-prices-today-december-12-btc-at-101k-sui-soars-30-ena-climbs-23/",
      image_url:
        "https://crypto.snapi.dev/images/v1/c/f/e/crypto-prices-today24-610115.jpg",
      title:
        "Crypto Prices Today December 12: BTC at $101K, SUI Soars 30%, ENA Climbs 23%",
      text: "The crypto prices today showed bullish momentum, with Bitcoin trading above $100K. Major altcoins like Ethereum rose by 6%, while XRP and Solana gained 5% to 6%.",
      source_name: "Coingape",
      date: "Wed, 11 Dec 2024 22:52:18 -0500",
      topics: ["pricemovement"],
      sentiment: "Positive",
      type: "Article",
      tickers: ["BTC", "ENA", "SUI"],
    },
    {
      news_url:
        "https://decrypt.co/296151/vancouver-votes-to-study-bitcoin-strategy-despite-provincial-pushback",
      image_url:
        "https://crypto.snapi.dev/images/v1/e/s/0/btc29-571719-610109.jpg",
      title:
        "Vancouver Votes to Study Bitcoin Strategy Despite Provincial Pushback",
      text: "The Vancouver City Council has greenlit a study to integrate Bitcoin despite regulatory constraints and environmental concerns.",
      source_name: "Decrypt",
      date: "Wed, 11 Dec 2024 22:30:43 -0500",
      topics: [],
      sentiment: "Positive",
      type: "Article",
      tickers: ["BTC"],
    },
    {
      news_url:
        "https://cointelegraph.com/news/icomtech-operators-ordered-pay-millions-fines-restitution-cftc?utm_source=rss_feed&utm_medium=rss&utm_campaign=rss_partner_inbound",
      image_url:
        "https://crypto.snapi.dev/images/v1/d/z/4/btcv26bgfr-594578-610104.jpg",
      title:
        "IcomTech execs set to pay over $5M for fake Bitcoin trading scheme",
      text: "At least four of IcomTech's operators are now behind bars after receiving prison sentences of up to 10 years this year.",
      source_name: "Cointelegraph",
      date: "Wed, 11 Dec 2024 22:21:46 -0500",
      topics: ["pricemovement"],
      sentiment: "Negative",
      type: "Article",
      tickers: ["BTC"],
    },
    {
      news_url:
        "https://www.newsbtc.com/bitcoin-news/hidden-driver-of-bitcoin-rally-coinbase-dominance-fades-binance-takes-the-lead/",
      image_url:
        "https://crypto.snapi.dev/images/v1/7/x/p/22ffde-571660-610100.jpg",
      title:
        "Hidden Driver Of Bitcoin's Rally: Coinbase Dominance Fades, Binance Takes The Lead",
      text: "While Bitcoin (BTC) has previously shown significant momentum in this market cycle, recent insights suggest that liquidity sources beyond Coinbase may be driving the trend. A CryptoQuant analyst, Mignolet, specifically provided a detailed analysis of Bitcoin's market, shedding light on the role of major exchanges like Coinbase and Binance in the ongoing bull cycle.",
      source_name: "NewsBTC",
      date: "Wed, 11 Dec 2024 22:00:56 -0500",
      topics: ["pricemovement"],
      sentiment: "Positive",
      type: "Article",
      tickers: ["BTC"],
    },
    {
      news_url: "https://bitcoinist.com/most-important-bitcoin-news-tomorrow/",
      image_url:
        "https://crypto.snapi.dev/images/v1/z/4/v/nhgt43er-571177-610102.jpg",
      title:
        "“Most Important” Bitcoin News Coming Tomorrow, Claims Satoshi Act Fund CEO",
      text: "In a series of public statements, Dennis Porter, CEO and founder of the non-profit advocacy organization Satoshi Act Fund, has raised expectations for what he describes as a landmark announcement related to Bitcoin.",
      source_name: "Bitcoinist",
      date: "Wed, 11 Dec 2024 22:00:35 -0500",
      topics: [],
      sentiment: "Neutral",
      type: "Article",
      tickers: ["BTC"],
    },
    {
      news_url:
        "https://cryptonews.com/news/russian-scientists-say-theyve-developed-a-solution-to-fight-btc-eth-powered-crime/",
      image_url:
        "https://crypto.snapi.dev/images/v1/g/e/q/1733935234-image-1733934250817-610130.jpg",
      title:
        "Russian Scientists Say They've Developed a Solution to ‘Fight BTC, ETH-powered Crime'",
      text: "Russian scientists say they have made another breakthrough in the fight against Bitcoin (BTC) and Ethereum (ETH)-powered crime. The post Russian Scientists Say They've Developed a Solution to ‘Fight BTC, ETH-powered Crime' appeared first on Cryptonews.",
      source_name: "Cryptonews",
      date: "Wed, 11 Dec 2024 22:00:00 -0500",
      topics: [],
      sentiment: "Negative",
      type: "Article",
      tickers: ["BTC"],
    },
    {
      news_url:
        "https://coincu.com/296558-vancouver-bitcoin-proposal-has-now-been-approved/?utm_source=snapi",
      image_url:
        "https://crypto.snapi.dev/images/v1/y/i/r/on-white-9-optimized-2000-1024-610099.jpg",
      title: "Vancouver Bitcoin Proposal Has Now Been Approved by City Council",
      text: "Vancouver Bitcoin proposal has now been approved to explore the potential benefits of incorporating Bitcoin into the city's financial operations.",
      source_name: "Coincu",
      date: "Wed, 11 Dec 2024 21:52:57 -0500",
      topics: [],
      sentiment: "Positive",
      type: "Article",
      tickers: ["BTC"],
    },
    {
      news_url:
        "https://cryptobriefing.com/vancouver-approves-motion-bitcoin-reserve-asset/",
      image_url:
        "https://crypto.snapi.dev/images/v1/n/5/m/d3852f5f-55e0-4fc9-8064-30831e-610122.jpg",
      title: "Vancouver approves motion to explore Bitcoin as a reserve asset",
      text: "Vancouver's exploration of Bitcoin as a reserve asset could influence global municipal financial strategies and crypto adoption debates. The post Vancouver approves motion to explore Bitcoin as a reserve asset appeared first on Crypto Briefing.",
      source_name: "Crypto Briefing",
      date: "Wed, 11 Dec 2024 21:47:51 -0500",
      topics: [],
      sentiment: "Positive",
      type: "Article",
      tickers: ["BTC"],
    },
    {
      news_url:
        "https://www.newsbtc.com/analysis/btc/bitcoin-price-reclaims-100k/",
      image_url:
        "https://crypto.snapi.dev/images/v1/t/v/f/btc33-571694-610097.jpg",
      title: "Bitcoin Price Reclaims $100K: Is the Bull Run Back On?",
      text: "Bitcoin price remained supported above the $95,500 zone. BTC is up over 5% and is now trading above the $100,00 resistance zone.",
      source_name: "NewsBTC",
      date: "Wed, 11 Dec 2024 21:41:24 -0500",
      topics: ["tanalysis", "pricemovement"],
      sentiment: "Positive",
      type: "Article",
      tickers: ["BTC"],
    },
    {
      news_url:
        "https://news.bitcoin.com/crypto-myth-debunked-theres-no-evidence-china-owns-194000-bitcoin/",
      image_url:
        "https://crypto.snapi.dev/images/v1/placeholders/crypto/crypto33.jpg",
      title:
        "Crypto Myth Debunked? There's No Evidence China Owns 194,000 Bitcoin",
      text: "Last week, Bitcoin.com News dropped an editorial that spilled the beans on all the governments clutching bitcoin, whether they snagged it through criminal busts or by mining or buying it.",
      source_name: "Bitcoin",
      date: "Wed, 11 Dec 2024 21:30:32 -0500",
      topics: [],
      sentiment: "Neutral",
      type: "Article",
      tickers: ["BTC"],
    },
    {
      news_url:
        "https://www.fxempire.com/forecasts/article/xrp-news-today-market-focuses-on-sec-commissioner-vote-btc-retakes-100k-1482744",
      image_url:
        "https://crypto.snapi.dev/images/v1/placeholders/crypto/crypto32.jpg",
      title:
        "XRP News Today: Market Focuses on SEC Commissioner Vote; BTC Retakes $100k",
      text: "Bitcoin Hits $100k as SEC Drama Unfolds: ETF Inflows and Regulatory Tensions Set Stage for Crypto Market Volatility.",
      source_name: "FXEmpire",
      date: "Wed, 11 Dec 2024 21:15:21 -0500",
      topics: ["tanalysis", "regulations", "pricemovement"],
      sentiment: "Positive",
      type: "Article",
      tickers: ["BTC", "XRP"],
    },
  ];
}
