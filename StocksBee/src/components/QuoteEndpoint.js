import React, {useState, useEffect} from "react";
import {fetchQuoteEnpoint} from "./../apis"
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

function QuoteEndpoint({companyName}){

    const [quote, setQuote] = useState({})
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if( typeof companyName === "undefined" || companyName === null || companyName.length <= 0 )
            return;
        else{
            setLoading(true);
            fetchQuoteEnpoint(companyName).then( (response) => {
                setQuote( response )
                console.log("Quote", response)
                setLoading(false);
                })
        }}, [companyName])
    
    
    if( loading === true ){
        return (
            <Card>
                <Typography>
                    ...Loading !!! Please wait
                </Typography>
            </Card>
        )
    }
    if( quote.Note !== undefined  ){
        return (
            <Card>
                <Typography>
                    Can't load information due to API limit.
                </Typography>
            </Card>
        )
    }
    return (
        <Card style={{padding:'10px'}} >
            <Typography variant='h5' align='center' style={{color:'blue'}} paragraph={true}>Quote</Typography>
            
            <Typography variant='body1' paragraph={true} ><b>Opening Price:</b>   {quote.open}</Typography>
            <Typography variant='body1' paragraph={true} ><b>High:</b>   {quote.high}</Typography>
            <Typography variant='body1' paragraph={true} ><b>Low:</b>   {quote.low}</Typography>
            <Typography variant='body1' paragraph={true} ><b>Price:</b>   {quote.price}</Typography>
            <Typography variant='body1' paragraph={true} ><b>Volume:</b>   {quote.volume}</Typography>
            <Typography variant='body1' paragraph={true} ><b>Latest Trading Day:</b>   {quote.latest_trading_day}</Typography>
            <Typography variant='body1' paragraph={true} ><b>Previous Close:</b>   {quote.previous_close}</Typography>
            <Typography variant='body1' paragraph={true} ><b>Change:</b>   {quote.change}</Typography>
            <Typography variant='body1' paragraph={true} ><b>Change Percent:</b>   {quote.change_percent}</Typography>

        </Card>
    );
}

export default QuoteEndpoint;