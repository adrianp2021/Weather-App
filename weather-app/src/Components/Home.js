import React, { useState } from "react";

const Home = () => {
  const api = {
    key: "143d8b76759d409186be983f59e673a1",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  
  const searchWeather = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`) 
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery('');
          console.log("what is the result ->", result);
        });
    }
  };


  function weatherCurrentTime(d) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Octomber",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];


    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  } 

  return (
    <main>
      <div>
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={(e) => {
            setQuery(e.target.value);  // get the value of input typed in, 
          }}
          value={query}                // find the value equal to query
          onKeyPress={searchWeather}   
        />
      </div>

      {typeof weather.main != "undefined" ? (
        <>
          <div>
            <div>
              {weather.name}, {weather.sys.country}
            </div>
            <div>{weatherCurrentTime(new Date())}</div>
          </div>

          <div className="weather-box">
            <div className="temperature">
              {Math.round(weather.main.temp)} °C
            </div>
            <div>{weather.weather[0].icon}</div>
          </div>
        </>
      ) : (
        ""
      )}
    </main>
  );
};

export default Home;
