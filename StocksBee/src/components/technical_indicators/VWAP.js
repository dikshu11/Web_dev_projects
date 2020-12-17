import React, {useState, useEffect} from "react";
import {fetchVWAP, sleep} from "./../../apis"
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {Line} from 'react-chartjs-2';

function VWAP({companyName, interval='60min'}){
    const [labels, setLabels] = useState([]);
    const [vwap, setVwap] = useState({});
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState({})

    function fetchFromAPI(){
        fetchVWAP(companyName, interval)
            .then((response) => {
                setResponse(response)
                if (response !== null && response !== undefined) {
                    setVwap({
                        data: response.data,
                        lineTension: 0,
                        fill: false,
                        borderColor: "red",
                        borderWidth: 2,
                        Label:"vwap"
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
            datasets: [vwap]
        });
        setLoading(false);
    }, [labels, vwap])
    

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
                    VWAP Information Not Available due to API limit.
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
                        text: `Volume Weighted Average Price for ${companyName}`,
                        fontColor: 'blue',
                        fontSize:30,
                        fontFamily:"Fantasy",
                        fontStyle:'normal'
                    },
                    legend:{
                        display:false,
                        positions:'right'
                    },
                    scales: {
                        xAxes: [{
                          type: 'time'
                        }]
                    }
                }}
            />
            <Typography align='center' variant='caption' paragraph={true}>
                Volume Weighted Average Price for {companyName} with time interval: {interval}.
            </Typography>
            <Typography variant='subtitle2' paragraph={true}>
                The volume weighted average price (VWAP) is a trading benchmark used by traders that gives the average price a security has traded at throughout the day, based on both volume and price. 
                It is important because it provides traders with insight into both the trend and value of a security.
                <br/><a href='https://www.investopedia.com/terms/v/vwap.asp'>Read more here-Investopedia</a>
            </Typography> 
        </Card>
    )
}

export default VWAP;