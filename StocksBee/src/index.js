import React, {Component} from "react";
import ReactDOM from "react-dom";
import Grid from '@material-ui/core/Grid';

import {SearchBar, CompanyOverview, MovingAverage, VWAP, QuoteEndpoint, AROON, OBV, HT_TRENDLINE}  from "./components"
import { Typography } from "@material-ui/core";


class StocksApi extends Component {
    state = {
      companyName: ""
    }

    getCompanyOnSearch = ( companySelected ) => {
      this.setState({
        companyName: companySelected
      });
      console.log("Company name", this.state.companyName)
    }

    render(){
        const display = (this.state.companyName !== "" && this.state.companyName !== undefined )?true:false;
        return (
          <Grid style={{padding:'5px'}}>
              <Typography style={{color:'white', margin:'5px'}} variant='h1' align='center' paragraph={true}>StocksBee</Typography>
              
              <Grid style={{margin:'5px'}} container justify="center" spacing={1}>
                <Grid item xs={6} align="center" style={{backgroundColor:'white'}}>
                  <SearchBar getCompanyOnSearch={this.getCompanyOnSearch}/>
                </Grid>
              </Grid>
              { (display === true)? 
                <Grid container spacing={3} style={{backGroundColor:'#e6e6e6', margin:'5px'}} alignContent='flex-start' alignItems='flex-start'>
                  <Grid item xs={12}>
                    <CompanyOverview companyName={this.state.companyName}/>
                  </Grid>
                  <Grid item xs={4}>
                    <QuoteEndpoint companyName={this.state.companyName}/>
                  </Grid>
                  <Grid item xs={4}>
                    <MovingAverage companyName={this.state.companyName}/>
                  </Grid>
                  <Grid item xs={4}>
                    <VWAP companyName={this.state.companyName}/>
                  </Grid>
                  <Grid item xs={4}>
                    <AROON companyName={this.state.companyName}/>
                  </Grid>
                  <Grid item xs={4}>
                    <OBV companyName={this.state.companyName}/>
                  </Grid>
                  <Grid item xs={4}>
                    <HT_TRENDLINE companyName={this.state.companyName}/>
                  </Grid>
                </Grid>
                :''
            }
          </Grid>
        )
    }
}

ReactDOM.render(<StocksApi/>, document.getElementById("root"));

