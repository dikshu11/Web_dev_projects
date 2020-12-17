import {ALPHAVANTAGE_API_KEY} from "./CONFIG.js"

const slice_index = 50
const sleep_time = 30000

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const fetchCompanyNames = async (keyword) => {
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${ALPHAVANTAGE_API_KEY}` 
    try {
        const response = await fetch(url)
        const json_response = await response.json()
        if( json_response["Note"] !== undefined ){
            return json_response
        }
        var symbols = []
        const symbolsObject = Array.from( json_response.bestMatches ).map( (stock) => {
            symbols.push(stock['1. symbol'])
            return [{ 
                symbol: stock['1. symbol'],
                name: stock['2. name'],
                type: stock['3. type'], 
                region: stock['4. region'], 
                marketOpen: stock['5. marketOpen'],
                marketClose: stock['6. marketClose'],
                timezone: stock['7. timezone'],
                currency: stock['8. currency'],
                matchScore: stock['9. matchScore'] }]} ).flat();
        return symbols
    } catch (error) {
        console.warn("Cant fetch data", error)
    }
};


export const fetchCompanyOverview = async (companyName) => {
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${companyName}&apikey=${ALPHAVANTAGE_API_KEY}`
    try {
        const response = await fetch(url)
        const json_response = await response.json()
        if( json_response["Note"] !== undefined ){
            return json_response
        }
        if ( typeof json_response !== undefined && typeof json_response["Name"] !== undefined ){
            return {
                symbol: json_response["Symbol"],
                name: json_response["Name"],
                description: json_response["Description"],
                sector: json_response["Sector"],
                industry: json_response["Industry"],
                address: json_response["Address"],
                fullTimeEmployees: json_response["FullTimeEmployees"],
                payoutRatio: json_response["PayoutRatio"]
            }
        }          
    } catch (error) {
        console.warn("Cant fetch data", error)
    }
};


export const fetchQuoteEnpoint = async (companyName) => {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${companyName}&apikey=${ALPHAVANTAGE_API_KEY}`
    try {
        const response = await fetch(url)
        const json_response = await response.json()
        const quote = json_response["Global Quote"]
        if( json_response["Note"] !== undefined ){
            return json_response
        }
        console.log("Quoote response", quote, quote["01. symbol"])
        if ( quote !== undefined && quote["01. symbol"] !== undefined ){

            return {
                symbol: quote["01. symbol"],
                open: quote["02. open"],
                high: quote["03. high"],
                low: quote["04. low"],
                price: quote["05. price"],
                volume: quote["06. volume"],
                latest_trading_day: quote["07. latest trading day"],
                previous_close: quote["08. previous close"],
                change: quote["09. change"],
                change_percent: quote["10. change percent"]
            }
        }          
    } catch (error) {
        console.warn("Cant fetch data", error)
    }
};

export const fetchSMA = async (companyName, interval='weekly', time_period=200, series_type='close') => {
    await sleep(sleep_time);
    const sma_url = `https://www.alphavantage.co/query?function=SMA&symbol=${companyName}&interval=${interval}&time_period=${time_period}&series_type=${series_type}&apikey=${ALPHAVANTAGE_API_KEY}` 
    const ema_url = `https://www.alphavantage.co/query?function=EMA&symbol=${companyName}&interval=${interval}&time_period=${time_period}&series_type=${series_type}&apikey=${ALPHAVANTAGE_API_KEY}` 
    try {
        const sma_response = await fetch(sma_url)
        const sma_json_response = await sma_response.json()
        if( sma_json_response["Note"] !== undefined ){
            return sma_json_response
        }
        const sma_labels = Object.keys(sma_json_response["Technical Analysis: SMA"])
        const sma_data = Object.values( sma_json_response["Technical Analysis: SMA"] ).map( (sma) => {
            return sma["SMA"];
        })

        const ema_response = await fetch(ema_url)
        const ema_json_response = await ema_response.json()
        if( ema_json_response["Note"] !== undefined ){
            return ema_json_response
        }
        const ema_labels = Object.keys(ema_json_response["Technical Analysis: EMA"])
        const ema_data = Object.values( ema_json_response["Technical Analysis: EMA"] ).map( (ema) => {
            return ema["EMA"];
        })

        if( sma_data.length >= 0 && ema_data.length >= 0){
            return {
                sma_labels: sma_labels.slice(0, slice_index),
                ema_labels: ema_labels.slice(0, slice_index),
                sma_data: sma_data.slice(0, slice_index),
                ema_data: ema_data.slice(0, slice_index)
            }
        }
    } catch (error) {
        console.warn("Cant fetch data", error)
    }
}


export const fetchAROON = async (companyName, interval='weekly', time_period=200) => {
    await sleep(sleep_time);
    const url = `https://www.alphavantage.co/query?function=AROON&symbol=${companyName}&interval=${interval}&time_period=${time_period}&apikey=${ALPHAVANTAGE_API_KEY}` 
    try {
        const response = await fetch(url)
        const json_response = await response.json()
        if( json_response["Note"] !== undefined ){
            return json_response
        }
        const labels = Object.keys(json_response["Technical Analysis: AROON"])
        const aroon_down_data = Object.values( json_response["Technical Analysis: AROON"] ).map( (arron) => {
            return arron["Aroon Down"];
        })
        const aroon_up_data = Object.values( json_response["Technical Analysis: AROON"] ).map( (arron) => {
            return arron["Aroon Up"];
        })
        if( labels.length >= 0){
            return {
                labels: labels.slice(0, slice_index),
                aroon_up_data: aroon_up_data.slice(0, slice_index),
                aroon_down_data: aroon_down_data.slice(0, slice_index)
            }
        }
    } catch (error) {
        console.warn("Cant fetch data", error)
    }
}


export const fetchVWAP = async (companyName, interval='weekly') => {
    await sleep(sleep_time);
    const url = `https://www.alphavantage.co/query?function=VWAP&symbol=${companyName}&interval=${interval}&apikey=${ALPHAVANTAGE_API_KEY}` 
    // console.log(url)
    
    try {
        const response = await fetch(url)
        const json_response = await response.json()
        if( json_response["Note"] !== undefined ){
            return json_response
        }
        const labels = Object.keys(json_response["Technical Analysis: VWAP"])
        const data = Object.values( json_response["Technical Analysis: VWAP"] ).map( (vwap) => {
            return vwap["VWAP"];
        })

        if( data.length >= 0 && labels.length >= 0){
            return {
                labels: labels.slice(0, slice_index),
                data: data.slice(0, slice_index),
            }
        }
    } catch (error) {
        console.warn("Cant fetch data", error)
    }
}


export const fetchOBV = async (companyName, interval='weekly') => {
    await sleep(sleep_time);
    const url = `https://www.alphavantage.co/query?function=OBV&symbol=${companyName}&interval=${interval}&apikey=${ALPHAVANTAGE_API_KEY}` 
    
    try {
        const response = await fetch(url)
        const json_response = await response.json()
        if( json_response["Note"] !== undefined ){
            return json_response
        }
        const labels = Object.keys(json_response["Technical Analysis: OBV"])
        const data = Object.values( json_response["Technical Analysis: OBV"] ).map( (obv) => {
            return obv["OBV"];
        })

        if( data.length >= 0 && labels.length >= 0){
            return {
                labels: labels.slice(0, slice_index),
                data: data.slice(0, slice_index),
            }
        }
    } catch (error) {
        console.warn("Cant fetch data", error)
    }
}

export const fetchHT_TRENDLINE = async (companyName, interval='weekly', series_type='close') => {
    const url = `https://www.alphavantage.co/query?function=HT_TRENDLINE&symbol=${companyName}&interval=${interval}&series_type=${series_type}&apikey=${ALPHAVANTAGE_API_KEY}` 
    // console.log(url)
    
    try {
        const response = await fetch(url)
        const json_response = await response.json()
        if( json_response["Note"] !== undefined ){
            return json_response
        }
        const labels = Object.keys(json_response["Technical Analysis: HT_TRENDLINE"])
        const data = Object.values( json_response["Technical Analysis: HT_TRENDLINE"] ).map( (ht_trendline) => {
            return ht_trendline["HT_TRENDLINE"];
        })

        if( data.length >= 0 && labels.length >= 0){
            return {
                labels: labels.slice(0, slice_index),
                data: data.slice(0, slice_index),
            }
        }
    } catch (error) {
        console.warn("Cant fetch data", error)
    }
}



