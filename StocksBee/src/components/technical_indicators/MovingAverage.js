import React, {useState, useEffect} from "react";
import {fetchSMA} from "./../../apis"
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {Line} from 'react-chartjs-2';

function MovingAverage({companyName, interval='weekly', time_period=200, series_type='close'}){
    const [labels, setLabels] = useState([]);
    const [sma, setSma] = useState({});
    const [ema, setEma] = useState({});
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState({})

    async function fetchFromAPI(){
        fetchSMA(companyName, interval, time_period, series_type)
            .then((response) => {
                setResponse(response)
                if (response !== null && response !== undefined && response.Note === undefined ) {
                    setSma({
                        data: response.sma_data,
                        label: "Simple Moving Average",
                        lineTension: 0,
                        fill: false,
                        borderColor: "red",
                        borderWidth: 2,
                        Label:"sma"
                    });
                    setEma({
                        data: response.ema_data,
                        label: "Exponential Moving Average",
                        lineTension: 0,
                        fill: false,
                        borderColor: "blue",
                        borderWidth: 2,
                        Label:"ema",
                    });
                    setLabels(response.sma_labels) 
                }
                else{
                    setLoading(false);
                }
            })
    }

    useEffect(() => {
            if (typeof companyName === "undefined" || companyName === null || companyName.length <= 0)
                return;
            else {
                setLoading(true);
                fetchFromAPI();
            }
        }, [companyName])
    

    useEffect(() => {
        setData({
            labels: labels,
            datasets: [ sma, ema]
        });
        setLoading(false);
    }, [labels, sma, ema])
    

    if( loading === true ){
        return (
            <Card>
                <Typography variant='h4'>
                    Loading...
                </Typography>
            </Card>
        )
    }
    
    if( response.Note !== undefined ){
        return (
            <Card>
                <Typography variant='h4'>
                    Can't load Moving Average of Closing Price for {companyName} due to API limit.
                </Typography>
            </Card>
        )
    }

    return ( 
        <Card style={{padding:'10px'}}>
            <Line
                data={data}
                options={{
                    title:{
                        display:true,
                        text: `Moving Average of Closing Price for ${companyName}`,
                        fontColor: 'blue',
                        fontSize:30,
                        fontFamily:"Fantasy",
                        fontStyle:'normal'
                    },
                    legend:{
                        display:true,
                        positions:'right'
                    },
                    scales: {
                        xAxes: [{
                          type: 'time'
                        }]
                      }
                }} />
            <Typography align='center' variant='caption' paragraph={true}>
                Moving Average of {series_type} price for {companyName} with time interval: {interval} averaged over {time_period} values.
            </Typography>
            <Typography variant='subtitle2' paragraph={true}>
                A simple moving average (SMA) is a calculation that takes the arithmetic mean of a given set of prices over the specific number of days in the past; for example, over the previous 15, 30, 100, or 200 days.
                Exponential moving averages (EMA) is a weighted average that gives greater importance to the price of a stock on more recent days, making it an indicator that is more responsive to new information.
                <br/><a href='https://www.investopedia.com/articles/technical/052201.asp'>Read more here-Investopedia</a>
            </Typography>  
        </Card>
    )
}

export default MovingAverage;