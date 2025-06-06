import { useState,useEffect } from "react";
import './countries.style.css'

const XStateCountry=()=>{
    // this is for making the country call
    const [countries,setCountries]=useState([])
    const [selectedCountry,setSelectedCountry]=useState("")

    // after selecting the country this is for selection state
    const [states,setStates]=useState([])
    const [selectState,setSelectedState]=useState('')

    //after selecting the state showing cities
    const [cities,setCities]=useState([])
    const [selectcity,setSelectedCity]=useState('')

    useEffect(() => {
        const fetchCountries = async () => {
          try {
            const response = await fetch('https://crio-location-selector.onrender.com/countries');
            const data = await response.json();
            // console.log('countriesdata', data);
            setCountries(data)
          } catch (error) {
            console.log('Error fetching country', error);
          }
        };
      
        fetchCountries();
      }, []);

    useEffect(()=>{
        const fetchState =async ()=>{
            try {
                const stateResponse = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
                const dataResponse = await stateResponse.json()
                // console.log(dataResponse)
                setStates(dataResponse)

            } catch (error) {
                console.log('Error fetching state',error)
            }
        }
        if (selectedCountry){
            setSelectedState('')
            setStates([])
            setSelectedCity('')
            setCities([])
            fetchState();
        }
        
    },[selectedCountry])

    useEffect(() => {
        const fetchCities = async () => {
          try {
            const citiesResponse = await fetch(
              `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectState}/cities`
            );
            const citiData = await citiesResponse.json();
      
            if (Array.isArray(citiData)) {
              setCities(citiData);
              setSelectedCity('')
            } else {
              setCities([]); // fallback if API doesn't return an array
            }
          } catch (error) {
            console.log('Error fetching cities', error);
            setCities([]); // prevent crash on error
          }
        };
      
        if (selectState && states.includes(selectState)) {
          fetchCities();
        }else{
            setCities([])
        }
      }, [selectState]);
      
    

    return(
        <div className="main_div">
            <h1>Select Location</h1>
            <div className="dropdown">
                
            <select value={selectedCountry} onChange={(e)=>(
                setSelectedCountry(e.target.value)
            )}>
                <option value="" disabled>
                        Select Country
                </option>
               {countries.map((country)=>(
                <option key={country} value={country}>
                    {country}
                </option>
               ))}
            </select>



            <select value={selectState} disabled={!selectedCountry} onChange={(e)=>{
                setSelectedState(e.target.value)
            }} >
                <option value="" disabled>Select state</option>
                {states.map((state)=>(
                    <option key={state} value={state}>
                        {state}
                    </option>
                ))}
            </select>


            <select value={selectcity} disabled={!selectState} onChange={(e)=>{
                setSelectedCity(e.target.value)
            }}>
                <option value="" disabled>Select Cities</option>
                {cities.map((city)=>(
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>
            </div> 
            {selectcity &&(
                <h2>You selected {selectcity}, {selectState}, {selectedCountry}</h2>
            )}
        </div>
    )
}

export default XStateCountry;