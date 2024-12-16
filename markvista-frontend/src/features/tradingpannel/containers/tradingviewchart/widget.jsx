//     import React, { useEffect, useRef, useState, memo } from 'react';

// const TradingViewWidget = ({ symbol, setSymbol }) => {
//   const containerRef = useRef(null);
//   const [search, setSearch] = useState('');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [filteredSymbols, setFilteredSymbols] = useState([]);

//   // Filtered symbols: Only those ending with "USDT"
//   const symbols =  [
//     "10000000AIDOGEUSDT",
//     "1000000BABYDOGEUSDT",
//     "1000000CHEEMSUSDT",
//     "1000000MOGUSDT",
//     "1000000PEIPEIUSDT",
//     "10000COQUSDT",
//     "10000LADYSUSDT",
//     "10000SATSUSDT",
//     "10000WENUSDT",
//     "10000WHYUSDT",
//     "1000APUUSDT",
//     "1000BONKPERP",
//     "1000BONKUSDT",
//     "1000BTTUSDT",
//     "1000CATSUSDT",
//     "1000CATUSDT",
//     "1000FLOKIUSDT",
//     "1000LUNCUSDT",
//     "1000MUMUUSDT",
//     "1000NEIROCTOUSDT",
//     "1000PEPEPERP",
//     "1000PEPEUSDT",
//     "1000RATSUSDT",
//     "1000TURBOUSDT",
//     "1000XECUSDT",
//     "1000XUSDT",
//     "1CATUSDT",
//     "1INCHUSDT",
//     "A8USDT",
//     "AAVEUSDT",
//     "ACEUSDT",
//     "ACHUSDT",
//     "ACTUSDT",
//     "ADAUSDT",
//     "AERGOUSDT",
//     "AEROUSDT",
//     "AEVOPERP",
//     "AEVOUSDT",
//     "AGIUSDT",
//     "AGLDUSDT",
//     "AIOZUSDT",
//     "AIUSDT",
//     "AKROUSDT",
//     "AKTUSDT",
//     "ALEOUSDT",
//     "ALGOUSDT",
//     "ALICEUSDT",
//     "ALPACAUSDT",
//     "ALPHAUSDT",
//     "ALTUSDT",
//     "AMBUSDT",
//     "ANKRUSDT",
//     "APEUSDT",
//     "API3USDT",
//     "APTUSDT",
//     "ARBPERP",
//     "ARBUSDT",
//     "ARKMUSDT",
//     "ARKUSDT",
//     "ARPAUSDT",
//     "ARUSDT",
//     "ASTRUSDT",
//     "ATAUSDT",
//     "ATHUSDT",
//     "ATOMUSDT",
//     "AUCTIONUSDT",
//     "AUDIOUSDT",
//     "AVAILUSDT",
//     "AVAXUSDT",
//     "AXLUSDT",
//     "AXSUSDT",
//     "BADGERUSDT",
//     "BAKEUSDT",
//     "BALUSDT",
//     "BANANAUSDT",
//     "BANDUSDT",
//     "BANUSDT",
//     "BATUSDT",
//     "BBUSDT",
//     "BCHUSDT",
//     "BEAMUSDT",
//     "BELUSDT",
//     "BENDOGUSDT",
//     "BICOUSDT",
//     "BIGTIMEUSDT",
//     "BILLYUSDT",
//     "BLASTUSDT",
//     "BLURUSDT",
//     "BLZUSDT",
//     "BNBPERP",
//     "BNBUSDT",
//     "BNTUSDT",
//     "BNXUSDT",
//     "BOBAUSDT",
//     "BOMEUSDT",
//     "BONDUSDT",
//     "BRETTUSDT",
//     "BSVUSDT",
//     "BSWUSDT",
//     "BTC-06DEC24",
//     "BTC-13DEC24",
//     "BTC-20DEC24",
//     "BTC-26SEP25",
//     "BTC-27DEC24",
//     "BTC-27JUN25",
//     "BTC-28MAR25",
//     "BTC-31JAN25",
//     "BTCPERP",
//     "BTCUSDT",
//     "C98USDT",
//     "CAKEUSDT",
//     "CARVUSDT",
//     "CATIUSDT",
//     "CELOUSDT",
//     "CELRUSDT",
//     "CETUSUSDT",
//     "CFXUSDT",
//     "CHESSUSDT",
//     "CHILLGUYUSDT",
//     "CHRUSDT",
//     "CHZUSDT",
//     "CKBUSDT",
//     "CLOUDUSDT",
//     "COMBOUSDT",
//     "COMPUSDT",
//     "COOKUSDT",
//     "COREUSDT",
//     "COSUSDT",
//     "COTIUSDT",
//     "COWUSDT",
//     "CROUSDT",
//     "CRVUSDT",
//     "CTCUSDT",
//     "CTKUSDT",
//     "CTSIUSDT",
//     "CVCUSDT",
//     "CVXUSDT",
//     "CYBERUSDT",
//     "DARUSDT",
//     "DASHUSDT",
//     "DATAUSDT",
//     "DBRUSDT",
//     "DEEPUSDT",
//     "DEGENUSDT",
//     "DENTUSDT",
//     "DEXEUSDT",
//     "DGBUSDT",
//     "DODOUSDT",
//     "DOGEPERP",
//     "DOGEUSDT",
//     "DOGSUSDT",
//     "DOGUSDT",
//     "DOP1USDT",
//     "DOTPERP",
//     "DOTUSDT",
//     "DRIFTUSDT",
//     "DUSKUSDT",
//     "DYDXUSDT",
//     "DYMUSDT",
//     "EDUUSDT",
//     "EGLDUSDT",
//     "EIGENUSDT",
//     "ENAPERP",
//     "ENAUSDT",
//     "ENJUSDT",
//     "ENSUSDT",
//     "EOSUSDT",
//     "ETCPERP",
//     "ETCUSDT",
//     "ETH-06DEC24",
//     "ETH-13DEC24",
//     "ETH-20DEC24",
//     "ETH-26SEP25",
//     "ETH-27DEC24",
//     "ETH-27JUN25",
//     "ETH-28MAR25",
//     "ETH-31JAN25",
//     "ETHBTCUSDT",
//     "ETHFIPERP",
//     "ETHFIUSDT",
//     "ETHPERP",
//     "ETHUSDT",
//     "ETHWUSDT",
//     "FBUSDT",
//     "FDUSDUSDT",
//     "FIDAUSDT",
//     "FILUSDT",
//     "FIOUSDT",
//     "FIREUSDT",
//     "FLMUSDT",
//     "FLOWUSDT",
//     "FLRUSDT",
//     "FLUXUSDT",
//     "FORTHUSDT",
//     "FOXYUSDT",
//     "FTMUSDT",
//     "FTNUSDT",
//     "FWOGUSDT",
//     "FXSUSDT",
//     "GALAUSDT",
//     "GASUSDT",
//     "GLMRUSDT",
//     "GLMUSDT",
//     "GMEUSDT",
//     "GMTUSDT",
//     "GMXUSDT",
//     "GNOUSDT",
//     "GOATUSDT",
//     "GODSUSDT",
//     "GOMININGUSDT",
//     "GRASSUSDT",
//     "GRTUSDT",
//     "GTCUSDT",
//     "GUSDT",
//     "HBARUSDT",
//     "HFTUSDT",
//     "HIFIUSDT",
//     "HIGHUSDT",
//     "HIPPOUSDT",
//     "HMSTRUSDT",
//     "HNTUSDT",
//     "HOOKUSDT",
//     "HOTUSDT",
//     "HPOS10IUSDT",
//     "HYPEUSDT",
//     "ICPUSDT",
//     "ICXUSDT",
//     "IDEXUSDT",
//     "IDUSDT",
//     "ILVUSDT",
//     "IMXUSDT",
//     "INJUSDT",
//     "IOSTUSDT",
//     "IOTAUSDT",
//     "IOTXUSDT",
//     "IOUSDT",
//     "JASMYUSDT",
//     "JOEUSDT",
//     "JSTUSDT",
//     "JTOUSDT",
//     "JUPUSDT",
//     "KAIAUSDT",
//     "KASUSDT",
//     "KAVAUSDT",
//     "KDAUSDT",
//     "KEYUSDT",
//     "KMNOUSDT",
//     "KNCUSDT",
//     "KSMUSDT",
//     "L3USDT",
//     "LAIUSDT",
//     "LDOUSDT",
//     "LEVERUSDT",
//     "LINAUSDT",
//     "LINKPERP",
//     "LINKUSDT",
//     "LISTAUSDT",
//     "LITUSDT",
//     "LOOKSUSDT",
//     "LPTUSDT",
//     "LQTYUSDT",
//     "LRCUSDT",
//     "LSKUSDT",
//     "LTCUSDT",
//     "LTOUSDT",
//     "LUCEUSDT",
//     "LUMIAUSDT",
//     "LUNA2USDT",
//     "MAGICUSDT",
//     "MAJORUSDT",
//     "MANAUSDT",
//     "MANEKIUSDT",
//     "MANTAUSDT",
//     "MASAUSDT",
//     "MASKUSDT",
//     "MAVIAUSDT",
//     "MAVUSDT",
//     "MAXUSDT",
//     "MBLUSDT",
//     "MBOXUSDT",
//     "MDTUSDT",
//     "MEMEFIUSDT",
//     "MEMEUSDT",
//     "MERLUSDT",
//     "METISUSDT",
//     "MEUSDT",
//     "MEWUSDT",
//     "MINAUSDT",
//     "MKRUSDT",
//     "MNTPERP",
//     "MNTUSDT",
//     "MOBILEUSDT",
//     "MOCAUSDT",
//     "MONUSDT",
//     "MOODENGUSDT",
//     "MORPHOUSDT",
//     "MOTHERUSDT",
//     "MOVRUSDT",
//     "MTLUSDT",
//     "MVLUSDT",
//     "MYRIAUSDT",
//     "MYROUSDT",
//     "NEARUSDT",
//     "NEIROETHUSDT",
//     "NEOUSDT",
//     "NFPUSDT",
//     "NKNUSDT",
//     "NMRUSDT",
//     "NOTPERP",
//     "NOTUSDT",
//     "NTRNUSDT",
//     "NULSUSDT",
//     "NYANUSDT",
//     "OGNUSDT",
//     "OGUSDT",
//     "OLUSDT",
//     "OMGUSDT",
//     "OMNIUSDT",
//     "OMUSDT",
//     "ONDOPERP",
//     "ONDOUSDT",
//     "ONEUSDT",
//     "ONGUSDT",
//     "ONTUSDT",
//     "OPPERP",
//     "OPUSDT",
//     "ORBSUSDT",
//     "ORCAUSDT",
//     "ORDERUSDT",
//     "ORDIPERP",
//     "ORDIUSDT",
//     "OSMOUSDT",
//     "OXTUSDT",
//     "PAXGUSDT",
//     "PEAQUSDT",
//     "PENDLEUSDT",
//     "PENGUSDT",
//     "PEOPLEUSDT",
//     "PERPUSDT",
//     "PHAUSDT",
//     "PHBUSDT",
//     "PIRATEUSDT",
//     "PIXELUSDT",
//     "PNUTUSDT",
//     "POLPERP",
//     "POLUSDT",
//     "POLYXUSDT",
//     "PONKEUSDT",
//     "POPCATPERP",
//     "POPCATUSDT",
//     "PORTALUSDT",
//     "POWRUSDT",
//     "PRCLUSDT",
//     "PRIMEUSDT",
//     "PROMUSDT",
//     "PROSUSDT",
//     "PUFFERUSDT",
//     "PYRUSDT",
//     "PYTHUSDT",
//     "QIUSDT",
//     "QNTUSDT",
//     "QTUMUSDT",
//     "QUICKUSDT",
//     "RADUSDT",
//     "RAREUSDT",
//     "RAYDIUMUSDT",
//     "RDNTUSDT",
//     "REEFUSDT",
//     "RENDERUSDT",
//     "RENUSDT",
//     "REQUSDT",
//     "REZUSDT",
//     "RIFSOLUSDT",
//     "RIFUSDT",
//     "RLCUSDT",
//     "RONUSDT",
//     "ROSEUSDT",
//     "RPLUSDT",
//     "RSRUSDT",
//     "RSS3USDT",
//     "RUNEUSDT",
//     "RVNUSDT",
//     "SAFEUSDT",
//     "SAGAUSDT",
//     "SANDUSDT",
//     "SCAUSDT",
//     "SCRTUSDT",
//     "SCRUSDT",
//     "SCUSDT",
//     "SDUSDT",
//     "SEIUSDT",
//     "SFPUSDT",
//     "SHIB1000PERP",
//     "SHIB1000USDT",
//     "SILLYUSDT",
//     "SKLUSDT",
//     "SLERFUSDT",
//     "SLFUSDT",
//     "SLPUSDT",
//     "SNTUSDT",
//     "SNXUSDT",
//     "SOL-06DEC24",
//     "SOL-13DEC24",
//     "SOL-20DEC24",
//     "SOL-27DEC24",
//     "SOLPERP",
//     "SOLUSDT",
//     "SPECUSDT",
//     "SPELLUSDT",
//     "SPXUSDT",
//     "SSVUSDT",
//     "STEEMUSDT",
//     "STGUSDT",
//     "STMXUSDT",
//     "STORJUSDT",
//     "STPTUSDT",
//     "STRKPERP",
//     "STRKUSDT",
//     "STXUSDT",
//     "SUIPERP",
//     "SUIUSDT",
//     "SUNDOGUSDT",
//     "SUNUSDT",
//     "SUPERUSDT",
//     "SUSHIUSDT",
//     "SWEATUSDT",
//     "SWELLUSDT",
//     "SXPUSDT",
//     "SYNUSDT",
//     "SYSUSDT",
//     "TAIKOUSDT",
//     "TAIUSDT",
//     "TAOUSDT",
//     "THETAUSDT",
//     "THEUSDT",
//     "TIAPERP",
//     "TIAUSDT",
//     "TLMUSDT",
//     "TNSRUSDT",
//     "TOKENUSDT",
//     "TONPERP",
//     "TONUSDT",
//     "TRBUSDT",
//     "TROYUSDT",
//     "TRUUSDT",
//     "TRXUSDT",
//     "TUSDT",
//     "TWTUSDT",
//     "UMAUSDT",
//     "UNIUSDT",
//     "USDCUSDT",
//     "USDEUSDT",
//     "USTCUSDT",
//     "USUALUSDT",
//     "UXLINKUSDT",
//     "VANRYUSDT",
//     "VELOUSDT",
//     "VETUSDT",
//     "VIDTUSDT",
//     "VIRTUALUSDT",
//     "VOXELUSDT",
//     "VRAUSDT",
//     "VTHOUSDT",
//     "WAVESUSDT",
//     "WAXPUSDT",
//     "WIFPERP",
//     "WIFUSDT",
//     "WLDPERP",
//     "WLDUSDT",
//     "WOOUSDT",
//     "WUSDT",
//     "XAIUSDT",
//     "XCHUSDT",
//     "XCNUSDT",
//     "XEMUSDT",
//     "XLMPERP",
//     "XLMUSDT",
//     "XMRUSDT",
//     "XNOUSDT",
//     "XRDUSDT",
//     "XRPPERP",
//     "XRPUSDT",
//     "XTZUSDT",
//     "XVGUSDT",
//     "XVSUSDT",
//     "YFIUSDT",
//     "YGGUSDT",
//     "ZBCNUSDT",
//     "ZECUSDT",
//     "ZENUSDT",
//     "ZETAUSDT",
//     "ZEUSUSDT",
//     "ZILUSDT",
//     "ZKJUSDT",
//     "ZKUSDT",
//     "ZRCUSDT",
//     "ZROUSDT",
//     "ZRXUSDT"
//   ].filter(
//     (sym) => sym.endsWith("USDT")

// );

//   useEffect(() => {
//     setFilteredSymbols(symbols); // Initialize with all symbols
//   }, [symbols]);

//   useEffect(() => {
//     const filtered = symbols.filter((symbol) =>
//         symbol.toUpperCase().includes(search.toUpperCase()) && symbol.endsWith('USDT')
//       );

//     // Filter symbols dynamically based on search input
//     const results = filtered
//     setFilteredSymbols(results);
//   }, [search]);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://s3.tradingview.com/tv.js';
//     script.async = true;
//     script.onload = () => {
//       if (window.TradingView) {
//         loadChart(symbol);
//       } else {
//         console.error("TradingView library not available.");
//       }
//     };
//     script.onerror = (error) => {
//       console.error("Error loading TradingView script", error);
//     };
//     document.head.appendChild(script);

//     return () => {
//       document.head.removeChild(script);
//     };
//   }, [symbol]);

//   const loadChart = (symbol) => {
//     if (containerRef.current && window.TradingView) {
//       new window.TradingView.widget({
//         autosize: true,
//         symbol: `BYBIT:${symbol}.P`,
//         interval: '5',
//         timezone: 'Asia/Karachi',
//         style: '1',
//         theme: 'dark',
//         locale: 'en',
//         withdateranges: true,
//         hide_side_toolbar: false,
//         allow_symbol_change: false, // Prevents user from searching/changing the symbol
//         details: true,
//         calendar: false,
//         toolbar_bg: '#ffffff',
//         container_id: containerRef.current.id,
//         support_host: "https://www.tradingview.com",
//       });
//     } else {
//       console.error('TradingView container or window is not available.');
//     }
//   };

//   const handleSymbolSelect = (sym) => {
//     setSymbol(sym);
//     setSearch(sym);
//     setIsDropdownOpen(false);
//   };

//   const handleSymbolChange = (event) => {
//     setSymbol(event.target.value);
//   };

//   return (
//     <div>
//       <div
//         style={{
//           position: 'relative',
//           marginBottom: '10px',
//           width: '100%',
//         }}
//       >
//         <input
//           type="text"
//           placeholder="Search or select symbol..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             handleSymbolChange(e);
//           }}
//           onFocus={() => setIsDropdownOpen(true)}
//           onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // Delayed to allow click
//           style={{
//             padding: '8px',
//             width: '100%',
//             border: '1px solid #ccc',
//             borderRadius: '4px',
//             fontFamily: 'var(--basic-font-family)', // Corrected to camelCase
//             color: 'var(--color-background)',
//           }}
//         />
//         {isDropdownOpen && filteredSymbols.length > 0 && (
//           <ul
//             style={{
//               position: 'absolute',
//               zIndex: 10,
//               listStyle: 'none',
//               margin: 0,
//               padding: '10px',
//               background: '#fff',
//               border: '1px solid #ccc',
//               borderRadius: '4px',
//               maxHeight: '200px',
//               overflowY: 'auto',
//               width: '100%',
//               fontFamily: 'var(--basic-font-family)', // Corrected to camelCase
//               color: 'var(--color-background)', // This was already correct
//             }}
//           >
//             {filteredSymbols.map((sym) => (
//               <li
//                 key={sym}
//                 onMouseDown={() => handleSymbolSelect(sym)}
//                 style={{
//                   padding: '5px',
//                   cursor: 'pointer',
//                 }}
//               >
//                 {sym}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <div
//         className="tradingview-widget-container"
//         id="tvchart"
//         ref={containerRef}
//         style={{ height: '86vh', width: '100%' }}
//       ></div>
//     </div>
//   );
// };

// export default memo(TradingViewWidget);
import { useState, useEffect, useRef } from "react";

const symbols = [
  "10000000AIDOGEUSDT",
  "1000000BABYDOGEUSDT",
  "1000000CHEEMSUSDT",
  "1000000MOGUSDT",
  "1000000PEIPEIUSDT",
  "10000COQUSDT",
  "10000LADYSUSDT",
  "10000SATSUSDT",
  "10000WENUSDT",
  "10000WHYUSDT",
  "1000APUUSDT",
  "1000BONKPERP",
  "1000BONKUSDT",
  "1000BTTUSDT",
  "1000CATSUSDT",
  "1000CATUSDT",
  "1000FLOKIUSDT",
  "1000LUNCUSDT",
  "1000MUMUUSDT",
  "1000NEIROCTOUSDT",
  "1000PEPEPERP",
  "1000PEPEUSDT",
  "1000RATSUSDT",
  "1000TURBOUSDT",
  "1000XECUSDT",
  "1000XUSDT",
  "1CATUSDT",
  "1INCHUSDT",
  "A8USDT",
  "AAVEUSDT",
  "ACEUSDT",
  "ACHUSDT",
  "ACTUSDT",
  "ADAUSDT",
  "AERGOUSDT",
  "AEROUSDT",
  "AEVOPERP",
  "AEVOUSDT",
  "AGIUSDT",
  "AGLDUSDT",
  "AIOZUSDT",
  "AIUSDT",
  "AKROUSDT",
  "AKTUSDT",
  "ALEOUSDT",
  "ALGOUSDT",
  "ALICEUSDT",
  "ALPACAUSDT",
  "ALPHAUSDT",
  "ALTUSDT",
  "AMBUSDT",
  "ANKRUSDT",
  "APEUSDT",
  "API3USDT",
  "APTUSDT",
  "ARBPERP",
  "ARBUSDT",
  "ARKMUSDT",
  "ARKUSDT",
  "ARPAUSDT",
  "ARUSDT",
  "ASTRUSDT",
  "ATAUSDT",
  "ATHUSDT",
  "ATOMUSDT",
  "AUCTIONUSDT",
  "AUDIOUSDT",
  "AVAILUSDT",
  "AVAXUSDT",
  "AXLUSDT",
  "AXSUSDT",
  "BADGERUSDT",
  "BAKEUSDT",
  "BALUSDT",
  "BANANAUSDT",
  "BANDUSDT",
  "BANUSDT",
  "BATUSDT",
  "BBUSDT",
  "BCHUSDT",
  "BEAMUSDT",
  "BELUSDT",
  "BENDOGUSDT",
  "BICOUSDT",
  "BIGTIMEUSDT",
  "BILLYUSDT",
  "BLASTUSDT",
  "BLURUSDT",
  "BLZUSDT",
  "BNBPERP",
  "BNBUSDT",
  "BNTUSDT",
  "BNXUSDT",
  "BOBAUSDT",
  "BOMEUSDT",
  "BONDUSDT",
  "BRETTUSDT",
  "BSVUSDT",
  "BSWUSDT",
  "BTC-06DEC24",
  "BTC-13DEC24",
  "BTC-20DEC24",
  "BTC-26SEP25",
  "BTC-27DEC24",
  "BTC-27JUN25",
  "BTC-28MAR25",
  "BTC-31JAN25",
  "BTCPERP",
  "BTCUSDT",
  "C98USDT",
  "CAKEUSDT",
  "CARVUSDT",
  "CATIUSDT",
  "CELOUSDT",
  "CELRUSDT",
  "CETUSUSDT",
  "CFXUSDT",
  "CHESSUSDT",
  "CHILLGUYUSDT",
  "CHRUSDT",
  "CHZUSDT",
  "CKBUSDT",
  "CLOUDUSDT",
  "COMBOUSDT",
  "COMPUSDT",
  "COOKUSDT",
  "COREUSDT",
  "COSUSDT",
  "COTIUSDT",
  "COWUSDT",
  "CROUSDT",
  "CRVUSDT",
  "CTCUSDT",
  "CTKUSDT",
  "CTSIUSDT",
  "CVCUSDT",
  "CVXUSDT",
  "CYBERUSDT",
  "DARUSDT",
  "DASHUSDT",
  "DATAUSDT",
  "DBRUSDT",
  "DEEPUSDT",
  "DEGENUSDT",
  "DENTUSDT",
  "DEXEUSDT",
  "DGBUSDT",
  "DODOUSDT",
  "DOGEPERP",
  "DOGEUSDT",
  "DOGSUSDT",
  "DOGUSDT",
  "DOP1USDT",
  "DOTPERP",
  "DOTUSDT",
  "DRIFTUSDT",
  "DUSKUSDT",
  "DYDXUSDT",
  "DYMUSDT",
  "EDUUSDT",
  "EGLDUSDT",
  "EIGENUSDT",
  "ENAPERP",
  "ENAUSDT",
  "ENJUSDT",
  "ENSUSDT",
  "EOSUSDT",
  "ETCPERP",
  "ETCUSDT",
  "ETH-06DEC24",
  "ETH-13DEC24",
  "ETH-20DEC24",
  "ETH-26SEP25",
  "ETH-27DEC24",
  "ETH-27JUN25",
  "ETH-28MAR25",
  "ETH-31JAN25",
  "ETHBTCUSDT",
  "ETHFIPERP",
  "ETHFIUSDT",
  "ETHPERP",
  "ETHUSDT",
  "ETHWUSDT",
  "FBUSDT",
  "FDUSDUSDT",
  "FIDAUSDT",
  "FILUSDT",
  "FIOUSDT",
  "FIREUSDT",
  "FLMUSDT",
  "FLOWUSDT",
  "FLRUSDT",
  "FLUXUSDT",
  "FORTHUSDT",
  "FOXYUSDT",
  "FTMUSDT",
  "FTNUSDT",
  "FWOGUSDT",
  "FXSUSDT",
  "GALAUSDT",
  "GASUSDT",
  "GLMRUSDT",
  "GLMUSDT",
  "GMEUSDT",
  "GMTUSDT",
  "GMXUSDT",
  "GNOUSDT",
  "GOATUSDT",
  "GODSUSDT",
  "GOMININGUSDT",
  "GRASSUSDT",
  "GRTUSDT",
  "GTCUSDT",
  "GUSDT",
  "HBARUSDT",
  "HFTUSDT",
  "HIFIUSDT",
  "HIGHUSDT",
  "HIPPOUSDT",
  "HMSTRUSDT",
  "HNTUSDT",
  "HOOKUSDT",
  "HOTUSDT",
  "HPOS10IUSDT",
  "HYPEUSDT",
  "ICPUSDT",
  "ICXUSDT",
  "IDEXUSDT",
  "IDUSDT",
  "ILVUSDT",
  "IMXUSDT",
  "INJUSDT",
  "IOSTUSDT",
  "IOTAUSDT",
  "IOTXUSDT",
  "IOUSDT",
  "JASMYUSDT",
  "JOEUSDT",
  "JSTUSDT",
  "JTOUSDT",
  "JUPUSDT",
  "KAIAUSDT",
  "KASUSDT",
  "KAVAUSDT",
  "KDAUSDT",
  "KEYUSDT",
  "KMNOUSDT",
  "KNCUSDT",
  "KSMUSDT",
  "L3USDT",
  "LAIUSDT",
  "LDOUSDT",
  "LEVERUSDT",
  "LINAUSDT",
  "LINKPERP",
  "LINKUSDT",
  "LISTAUSDT",
  "LITUSDT",
  "LOOKSUSDT",
  "LPTUSDT",
  "LQTYUSDT",
  "LRCUSDT",
  "LSKUSDT",
  "LTCUSDT",
  "LTOUSDT",
  "LUCEUSDT",
  "LUMIAUSDT",
  "LUNA2USDT",
  "MAGICUSDT",
  "MAJORUSDT",
  "MANAUSDT",
  "MANEKIUSDT",
  "MANTAUSDT",
  "MASAUSDT",
  "MASKUSDT",
  "MAVIAUSDT",
  "MAVUSDT",
  "MAXUSDT",
  "MBLUSDT",
  "MBOXUSDT",
  "MDTUSDT",
  "MEMEFIUSDT",
  "MEMEUSDT",
  "MERLUSDT",
  "METISUSDT",
  "MEUSDT",
  "MEWUSDT",
  "MINAUSDT",
  "MKRUSDT",
  "MNTPERP",
  "MNTUSDT",
  "MOBILEUSDT",
  "MOCAUSDT",
  "MONUSDT",
  "MOODENGUSDT",
  "MORPHOUSDT",
  "MOTHERUSDT",
  "MOVRUSDT",
  "MTLUSDT",
  "MVLUSDT",
  "MYRIAUSDT",
  "MYROUSDT",
  "NEARUSDT",
  "NEIROETHUSDT",
  "NEOUSDT",
  "NFPUSDT",
  "NKNUSDT",
  "NMRUSDT",
  "NOTPERP",
  "NOTUSDT",
  "NTRNUSDT",
  "NULSUSDT",
  "NYANUSDT",
  "OGNUSDT",
  "OGUSDT",
  "OLUSDT",
  "OMGUSDT",
  "OMNIUSDT",
  "OMUSDT",
  "ONDOPERP",
  "ONDOUSDT",
  "ONEUSDT",
  "ONGUSDT",
  "ONTUSDT",
  "OPPERP",
  "OPUSDT",
  "ORBSUSDT",
  "ORCAUSDT",
  "ORDERUSDT",
  "ORDIPERP",
  "ORDIUSDT",
  "OSMOUSDT",
  "OXTUSDT",
  "PAXGUSDT",
  "PEAQUSDT",
  "PENDLEUSDT",
  "PENGUSDT",
  "PEOPLEUSDT",
  "PERPUSDT",
  "PHAUSDT",
  "PHBUSDT",
  "PIRATEUSDT",
  "PIXELUSDT",
  "PNUTUSDT",
  "POLPERP",
  "POLUSDT",
  "POLYXUSDT",
  "PONKEUSDT",
  "POPCATPERP",
  "POPCATUSDT",
  "PORTALUSDT",
  "POWRUSDT",
  "PRCLUSDT",
  "PRIMEUSDT",
  "PROMUSDT",
  "PROSUSDT",
  "PUFFERUSDT",
  "PYRUSDT",
  "PYTHUSDT",
  "QIUSDT",
  "QNTUSDT",
  "QTUMUSDT",
  "QUICKUSDT",
  "RADUSDT",
  "RAREUSDT",
  "RAYDIUMUSDT",
  "RDNTUSDT",
  "REEFUSDT",
  "RENDERUSDT",
  "RENUSDT",
  "REQUSDT",
  "REZUSDT",
  "RIFSOLUSDT",
  "RIFUSDT",
  "RLCUSDT",
  "RONUSDT",
  "ROSEUSDT",
  "RPLUSDT",
  "RSRUSDT",
  "RSS3USDT",
  "RUNEUSDT",
  "RVNUSDT",
  "SAFEUSDT",
  "SAGAUSDT",
  "SANDUSDT",
  "SCAUSDT",
  "SCRTUSDT",
  "SCRUSDT",
  "SCUSDT",
  "SDUSDT",
  "SEIUSDT",
  "SFPUSDT",
  "SHIB1000PERP",
  "SHIB1000USDT",
  "SILLYUSDT",
  "SKLUSDT",
  "SLERFUSDT",
  "SLFUSDT",
  "SLPUSDT",
  "SNTUSDT",
  "SNXUSDT",
  "SOL-06DEC24",
  "SOL-13DEC24",
  "SOL-20DEC24",
  "SOL-27DEC24",
  "SOLPERP",
  "SOLUSDT",
  "SPECUSDT",
  "SPELLUSDT",
  "SPXUSDT",
  "SSVUSDT",
  "STEEMUSDT",
  "STGUSDT",
  "STMXUSDT",
  "STORJUSDT",
  "STPTUSDT",
  "STRKPERP",
  "STRKUSDT",
  "STXUSDT",
  "SUIPERP",
  "SUIUSDT",
  "SUNDOGUSDT",
  "SUNUSDT",
  "SUPERUSDT",
  "SUSHIUSDT",
  "SWEATUSDT",
  "SWELLUSDT",
  "SXPUSDT",
  "SYNUSDT",
  "SYSUSDT",
  "TAIKOUSDT",
  "TAIUSDT",
  "TAOUSDT",
  "THETAUSDT",
  "THEUSDT",
  "TIAPERP",
  "TIAUSDT",
  "TLMUSDT",
  "TNSRUSDT",
  "TOKENUSDT",
  "TONPERP",
  "TONUSDT",
  "TRBUSDT",
  "TROYUSDT",
  "TRUUSDT",
  "TRXUSDT",
  "TUSDT",
  "TWTUSDT",
  "UMAUSDT",
  "UNIUSDT",
  "USDCUSDT",
  "USDEUSDT",
  "USTCUSDT",
  "USUALUSDT",
  "UXLINKUSDT",
  "VANRYUSDT",
  "VELOUSDT",
  "VETUSDT",
  "VIDTUSDT",
  "VIRTUALUSDT",
  "VOXELUSDT",
  "VRAUSDT",
  "VTHOUSDT",
  "WAVESUSDT",
  "WAXPUSDT",
  "WIFPERP",
  "WIFUSDT",
  "WLDPERP",
  "WLDUSDT",
  "WOOUSDT",
  "WUSDT",
  "XAIUSDT",
  "XCHUSDT",
  "XCNUSDT",
  "XEMUSDT",
  "XLMPERP",
  "XLMUSDT",
  "XMRUSDT",
  "XNOUSDT",
  "XRDUSDT",
  "XRPPERP",
  "XRPUSDT",
  "XTZUSDT",
  "XVGUSDT",
  "XVSUSDT",
  "YFIUSDT",
  "YGGUSDT",
  "ZBCNUSDT",
  "ZECUSDT",
  "ZENUSDT",
  "ZETAUSDT",
  "ZEUSUSDT",
  "ZILUSDT",
  "ZKJUSDT",
  "ZKUSDT",
  "ZRCUSDT",
  "ZROUSDT",
  "ZRXUSDT",
];

const TradingViewWidget = ({ symbol, setSymbol }) => {
  const containerRef = useRef(null);
  const [search, setSearch] = useState("");
  const [filteredSymbols, setFilteredSymbols] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // All available symbols

  // Filtering symbols based on search input
  useEffect(() => {
    const filtered = symbols.filter(
      (symbol) =>
        symbol.toUpperCase().includes(search.toUpperCase()) &&
        symbol.endsWith("USDT"),
    );
    setFilteredSymbols(filtered);
  }, [search]);

  // Load TradingView chart when symbol changes
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        loadChart(symbol);
      } else {
        console.error("TradingView library not available.");
      }
    };
    script.onerror = (error) => {
      console.error("Error loading TradingView script", error);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [symbol]);

  //   const loadChart = (symbol) => {
  //     if (containerRef.current && window.TradingView) {
  //       new window.TradingView.widget({
  //         autosize: true,
  //         symbol: `BYBIT:${symbol}.P`,
  //         interval: '5',
  //         timezone: 'Asia/Karachi',
  //         style: '1',
  //         theme: 'dark',
  //         locale: 'en',
  //         withdateranges: true,
  //         hide_side_toolbar: false,
  //         allow_symbol_change: false,
  //         details: true,
  //         calendar: false,
  //         toolbar_bg: '#ffffff',
  //         container_id: containerRef.current.id,
  //         support_host: "https://www.tradingview.com",
  //       });
  //     } else {
  //       console.error('TradingView container or window is not available.');
  //     }
  //   };
  const loadChart = (symbol) => {
    const theme = localStorage.getItem("color-theme");
    if (containerRef.current && window.TradingView) {
      new window.TradingView.widget({
        autosize: true,
        symbol: `BYBIT:${symbol}.P`,
        interval: "5",
        timezone: "Asia/Karachi",
        style: "1",
        theme: "light",
        locale: "en",
        withdateranges: true,
        hide_side_toolbar: false,
        allow_symbol_change: false, // Prevents user from searching/changing the symbol
        details: true,
        calendar: false,
        toolbar_bg: "#ffffff",
        container_id: containerRef.current.id,
        support_host: "https://www.tradingview.com",
      });
    } else {
      console.error("TradingView container or window is not available.");
    }
  };

  const handleSymbolSelect = (sym) => {
    setSymbol(sym);
    setSearch(sym);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <div
        style={{
          fontFamily: "var(--basic-font-family)", // Corrected to camelCase
          color: "var(--color-text)", // Values should be strings
          // Corrected to camelCase
          margin: "0 auto", // Strings for values
          padding: "20px", // Strings for values
          backgroundColor: "var(--color-section)", // Corrected to camelCase
          borderRadius: "8px", // Corrected to camelCase
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Corrected to camelCase
        }}
      >
        <div
          style={{ position: "relative", marginBottom: "10px", width: "100%" }}
        >
          <input
            type="text"
            placeholder="Search or select symbol..."
            value={search}
            onChange={handleSearchChange}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // Delay to allow clicking
            style={{
              background: "var(--color-section)",
              padding: "1.2%",
              width: "100%",
              border: "2px solid var(--color-detailing)",
              borderRadius: "4px",
              fontFamily: "var(--basic-font-family)", // Corrected to camelCase
              color: "var(--color-white)",
              fontSize: "17px",
            }}
          />
          {isDropdownOpen && filteredSymbols.length > 0 && (
            <ul
              style={{
                position: "absolute",
                zIndex: 10,
                listStyle: "none",
                margin: 0,
                padding: "10px",
                background: "var(--colour-button)",
                border: "1.5px solid var(--color-white)",
                borderRadius: "4px",
                maxHeight: "200px",
                overflowY: "auto",
                width: "100%",
                fontFamily: "var(--basic-font-family)", // Corrected to camelCase
                color: "var(--color-white)",
              }}
            >
              {filteredSymbols.map((sym) => (
                <li
                  key={sym}
                  onMouseDown={() => handleSymbolSelect(sym)}
                  style={{
                    padding: "5px",
                    cursor: "pointer",
                  }}
                >
                  {sym}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div
          className="tradingview-widget-container"
          ref={containerRef}
          id="tvchart"
          style={{ height: "96vh", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default TradingViewWidget;
