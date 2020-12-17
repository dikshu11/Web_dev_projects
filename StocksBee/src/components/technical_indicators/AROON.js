import React, {useState, useEffect} from "react";
import {fetchAROON, sleep} from "./../../apis"
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {Line} from 'react-chartjs-2';

function AROON({companyName, interval='weekly', time_period=200}){
    const [labels, setLabels] = useState([]);
    const [AROON_Down, setAROON_Down] = useState({});
    const [AROON_UP, setAROON_UP] = useState({});
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState({})

    function fetchFromAPI(){
        fetchAROON(companyName, interval, time_period)
            .then((response) => {
                setResponse(response)
                if (response !== null && response !== undefined && response.Note === undefined ) {
                    setAROON_Down({
                        data: response.aroon_down_data,
                        label: "AROON DOWN",
                        lineTension: 0,
                        fill: false,
                        borderColor: "red",
                        borderWidth: 2,
                        Label:"AROON DOWN"
                    });
                    setAROON_UP({
                        data: response.aroon_up_data,
                        label: "AROON UP",
                        lineTension: 0,
                        fill: false,
                        borderColor: "blue",
                        borderWidth: 2,
                        Label:"AROON UP",
                    });
                    setLabels(response.labels) 
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
            datasets: [ AROON_UP, AROON_Down ]
        });
        setLoading(false);
    }, [labels, AROON_UP, AROON_Down ])
    

    if( loading === true ){
        return (
            <Card>
                <Typography variant='h4'>
                    Loading...
                </Typography>
            </Card>
        )
    }
    
    if( response !== undefined && response.Note !== undefined ){
        return (
            <Card>
                <Typography variant='h4'>
                    Can't load AROON value for {companyName} due to API limit.
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
                        text: `AROON Values for ${companyName}`,
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
                }}></Line>
            <Typography align='center' variant='caption' paragraph={true}>
                AROON values for {companyName} with time interval: {interval}.
            </Typography>
            <Typography variant='subtitle2' paragraph={true}>
                The Aroon indicator is a technical indicator that is used to identify trend changes in the price of an asset, as well as the strength of that trend. 
                In essence, the indicator measures the time between highs and the time between lows over a time period.
                <br/><a href='https://www.investopedia.com/articles/trading/06/aroon.asp'>Read more here-Investopedia</a>
            </Typography>  
        </Card>
    )
}

export default AROON;