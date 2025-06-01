import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'


const Weather = () => {

    const inputRef = useRef();
    const [weatherData, setWdata] = useState(true);
    
    const search = async (city)=>{
        if(city===""){
            alert("Enter city name");
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            let code = data.weather[0].icon;
            let ur1 = `https://openweathermap.org/img/wn/${code}@2x.png`;

            setWdata({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: data.main.temp,
                location: data.name,
                icn: ur1 
                
                // icon: rain_icon
            })
            console.log(weatherData.icn);
        }catch(error){
            setWdata(false);
            console.error("Error loading information:", error);
        }
    }
    useEffect(()=>{
        search("Delhi");
    }, [])

  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" name=" " id="" placeholder='search'/>
            <img src={search_icon} alt="laoding.." onClick={()=>search(inputRef.current.value)}/>
        </div>

            {/* <img src={weatherData.icn} alt="" className='weather-icon'/>
            <p className='temp'>{weatherData.temperature}°C</p>
            <p className='location'>{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weatherData.windSpeed} kmph</p>
                        <span>Wind speed</span>
                    </div>
                </div>
            </div> */}

        {weatherData?<>
            <img src={weatherData.icn} alt="" className='weather-icon'/>
            <p className='temp'>{weatherData.temperature}°C</p>
            <p className='location'>{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weatherData.windSpeed} kmph</p>
                        <span>Wind speed</span>
                    </div>
                </div>
            </div>
        </>:<>
            <img src={clear_icon} alt="" className='weather-icon'/>
            <p className='temp'>--°C</p>
            <p className='location'>({inputRef.current.value})</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>--%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>--kmph</p>
                        <span>Wind speed</span>
                    </div>
                </div>
            </div>
        </>}
    </div>
  )
}

export default Weather
