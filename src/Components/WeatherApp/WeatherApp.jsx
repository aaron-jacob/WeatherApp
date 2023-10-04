
import React, { useState } from 'react';
import './WeatherApp.css';


import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";



const WeatherApp = () => {
    const [cityInput, setCityInput] = useState('');
    const [weatherData, setWeatherData] = useState({
        humidity: '66',
        windSpeed: '6.17',
        temperature: '15.74',
        location: 'London',
    });

    const api_key = "8df047172d7377a281509eda4942261f";

    const[wicon,setWicon] = useState(cloud_icon);

    const search = async () => {
        if (cityInput === "") {
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=Metric&appid=${api_key}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            setWeatherData({
                humidity: data.main?.humidity+" %" || 'N/A',
                windSpeed: data.wind?.speed+" km/h" || 'N/A',
                temperature: data.main?.temp || 'N/A',
                location: data.name || 'N/A',
            });

            if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n")
            {
                setWicon(clear_icon);
            }
            else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n")
            {
                setWicon(cloud_icon);
            }
            else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n")
            {
                setWicon(drizzle_icon);
            }
            else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n")
            {
                setWicon(drizzle_icon);
            }
            else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n")
            {
                setWicon(rain_icon);
            }
            else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n")
            {
                setWicon(rain_icon);
            }
            else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n")
            {
                setWicon(snow_icon);
            }
        } catch (error) {
            console.error('Error:', error);
        }

    };



    return (
        <div className='container'>
            <div className="top-bar">
                <input
                    type="text"
                    className="cityInput"
                    placeholder='Search'
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">{weatherData.temperature} °C</div>
            <div className="weather-location">{weatherData.location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className='icon' />
                    <div className="data">
                        <div className="humidity-percent">{weatherData.humidity}</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className='icon' />
                    <div className="data">
                        <div className="wind-rate">{weatherData.windSpeed}</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;
