import React, {useState, useEffect} from "react";
import {fetchCompanyOverview} from "./../apis"
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

function CompanyOverview({companyName}){

    const [overview, setOverview] = useState({})
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if( typeof companyName === "undefined" || companyName === null || companyName.length <= 0 )
            return;
        else{
            setLoading(true);
            fetchCompanyOverview(companyName).then( (response) => {
                setOverview( response )
                setLoading(false);
                })
        }}, [companyName])
    
    
    if( loading===true){
        return (
            <Card>
                <Typography>
                    ...Loading !!! Please wait
                </Typography>
            </Card>
        )
    }
    
    if( overview.Note !== undefined ){
        return (
            <Card>
                <Typography>
                    Can't load information due to API limit.
                </Typography>
            </Card>
        )
    }

    return (
            <Card style={{padding:'10px'}}>
                <Typography variant='h3' style={{color:'blue'}} paragraph={true}>{overview.name}</Typography>
                <Typography paragraph={true} >{overview.description}</Typography>
                <Typography variant='caption' paragraph={true} >Sector:   {overview.sector}</Typography>
                <Typography variant='caption' paragraph={true} >Industry:   {overview.industry}</Typography>
                <Typography variant='caption' paragraph={true} >Address:   {overview.address}</Typography>
                <Typography variant='caption' paragraph={true} >Number of Full Time Employees:   {overview.fullTimeEmployees}</Typography>
            </Card>
        
    );
}

export default CompanyOverview;