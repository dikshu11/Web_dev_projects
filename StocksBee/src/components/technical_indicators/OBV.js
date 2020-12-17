import React, {useState, useEffect} from "react";
import {fetchOBV, sleep} from "./../../apis"
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {Line} from 'react-chartjs-2';

function OBV({companyName, interval='60min'}){
    const [labels, setLabels] = useState([]);
    const [obv, setOBV] = useState({});
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState({})

    function fetchFromAPI(){
        fetchOBV(companyName, interval)
            .then((response) => {
                setResponse(response)
                if (response !== null && response !== undefined) {
                    setOBV({
                        data: response.data,
                        lineTension: 0,
                        fill: false,
                        borderColor: "red",
                        borderWidth: 2,
                        Label:"OBV"
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
            datasets: [obv]
        });
        setLoading(false);
    }, [labels, obv])
    

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
                    On Balance Volume(OBV) Information Not Available due to API limit.
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
                        text: `On Balance Volume(OBV) for ${companyName}`,
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
                On Balance Volume(OBV) for {companyName} with time interval: {interval}.
            </Typography>
            <Typography variant='subtitle2' paragraph={true}>
                On-balance volume (OBV) is a technical indicator of momentum, using volume changes to make price predictions.
                OBV shows crowd sentiment that can predict a bullish or bearish outcome
                <br/><a href='https://www.investopedia.com/articles/technical/100801.asp'>Read more here-Investopedia</a>
            </Typography> 
        </Card>
    )
}

export default OBV;