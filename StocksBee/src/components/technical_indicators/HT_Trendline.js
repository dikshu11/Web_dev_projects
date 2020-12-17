import React, {useState, useEffect} from "react";
import {fetchHT_TRENDLINE, sleep} from "./../../apis"
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {Line} from 'react-chartjs-2';

function HT_TRENDLINE({companyName, interval='60min', series_type='close'}){
    const [labels, setLabels] = useState([]);
    const [HT_TRENDLINE, setHT_TRENDLINE] = useState({});
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState({})

    function fetchFromAPI(){
        fetchHT_TRENDLINE(companyName, interval, series_type)
            .then((response) => {
                setResponse(response)
                if (response !== null && response !== undefined) {
                    setHT_TRENDLINE({
                        data: response.data,
                        lineTension: 0,
                        fill: false,
                        borderColor: "red",
                        borderWidth: 2,
                        Label:"HT_TRENDLINE"
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
            datasets: [HT_TRENDLINE]
        });
        setLoading(false);
    }, [labels, HT_TRENDLINE])
    

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
                Hilbert transform TRENDLINE Information Not Available  due to API limit.
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
                        text: `Hilbert Transform Trendline for ${companyName}`,
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
            Hilbert transform TRENDLINE for {companyName} with time interval: {interval}.
            </Typography>
            <Typography variant='subtitle2' paragraph={true}>
            The Hilbert Transform Indicator was authored by John Ehlers. 
            The Hilbert Transform itself, is an all-pass filter used in digital signal processing. 
            By using present and prior price differences, and some feedback, price values are split into their complex number components of real (inPhase) and imaginary (quadrature) parts. 
                <br/><a href='https://www.motivewave.com/studies/hilbert_transform_indicator.htm'>Read more here</a>
            </Typography> 
        </Card>
    )
}

export default HT_TRENDLINE;