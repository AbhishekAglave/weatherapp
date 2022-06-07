import React, { useEffect, useState } from "react";
import './weatherapp.css';

function WeatherApp() {
    const [city, setCity] = useState('');
    const [search, setSearch] = useState('');
    
    useEffect(()=>{
        const getCity = async () =>{
            const request = await fetch("https://ipinfo.io/json?token=a82a6dc5325fa8")
            const json = await request.json()
            // console.log(json.city);
            setSearch(json.city);
        }
        getCity();
    },[]);


    useEffect(() => {
        const fetchApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=5b9ef8832cf4b3892b4da66bf61deb4b`;
            const response = await fetch(url);
            const resJson = await response.json();
            // console.log(resJson.cod);
            if(resJson.cod===200){
                setCity(resJson);
            }else{
                setCity('')
            }
        };
        fetchApi();
    }, [search]);

    return (
        <>
            <div className="app-container">
                <div className="input-div">
                    <input
                        type='text'
                        className="input-field"
                        value={search}
                        onChange={(event) => { setSearch(event.target.value); }}
                    />
                </div>
                {!city ? (
                    <div className="result">
                    <h2 className="no-data">No Data Found!</h2>
                    </div> 
                ) : (
                    <div className="result">
                        <h1 className="city">{search}</h1>
                        <p className="country">{city.weather[0].description}</p>
                        <h2 className='temp'>{city.main.temp}°Cel</h2>
                        <h4 className='min-max'>Min: {city.main.temp_min}°Cel | Max: {city.main.temp_max}°Cel</h4>
                    </div>
                )}
            </div>
        </>
    );
}

export default WeatherApp;