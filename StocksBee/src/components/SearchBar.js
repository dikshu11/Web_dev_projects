import React, {useState} from "react";
import {TextField } from "@material-ui/core";
import AutoComplete from "@material-ui/lab/Autocomplete";
import {fetchCompanyNames} from "./../apis"

function SearchBar({getCompanyOnSearch}) {
    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(true)

    const handleOnChange = async (event) => {
        setLoading(true);
        const result = await fetchCompanyNames(event.target.value)
        if ( typeof result !== "undefined" && result !== null && result.length > 0 ){
            setCompanies(result)
        }
        setLoading(false);
    }

    return (
            <AutoComplete 
                id='companyName'
                options={companies}
                autoSelect={true}
                onChange={(event, value) => {
                    getCompanyOnSearch(value)
                }}
                loading={loading}
                loadingText={'...Loading'}
                renderInput={(params) => (
                <TextField 
                    {...params} 
                    onChange={handleOnChange} 
                    label="Type Company Name" 
                    margin="normal" 
                    variant="standard"
                    fullWidth />
                )}
            />
    )
    
}

export default SearchBar
