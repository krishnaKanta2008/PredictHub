import { useEffect } from 'react'

const TickerTape = () => {
    useEffect(() => {
        const script = document.createElement('script')
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
        script.async = true
        script.innerHTML = JSON.stringify({
            symbols: [
                {
                    proName: "FOREXCOM:SPXUSD",
                    title: "S&P 500 Index"
                },
                {
                    proName: "FOREXCOM:NSXUSD",
                    title: "US 100 Cash CFD"
                },
                {
                    proName: "FX_IDC:EURUSD",
                    title: "EUR to USD"
                },
                {
                    proName: "BITSTAMP:BTCUSD",
                    title: "Bitcoin"
                },
                {
                    proName: "BITSTAMP:ETHUSD",
                    title: "Ethereum"
                }
            ],
            showSymbolLogo: true,
            colorTheme: "dark",
            isTransparent: true,
            displayMode: "adaptive",
            locale: "en"
        })
        document.getElementById('tradingview-widget')?.appendChild(script)

        return () => {
            document.getElementById('tradingview-widget')?.removeChild(script)
        }
    }, [])
  return (
      <div className="tradingview-widget-container">
          <div id="tradingview-widget" className="tradingview-widget-container__widget"></div>
      </div>
  )
}

export default TickerTape