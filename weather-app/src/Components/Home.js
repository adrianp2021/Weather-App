import React, { useEffect, useState } from "react";

const Home = () => {
  const api = {
    key: "143d8b76759d409186be983f59e673a1",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  // let url = "http://openweathermap.org/img/wn/";
  // let png = '@2x.png'

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [iconURL, setIconURL] = useState('')

  useEffect(() => {
    if (weather && weather.weather) {
      setIconURL('http://openweathermap.org/img/wn/' + `${weather.weather[0].icon}` + '.png')
      // console.log('what is weather',weather)
    }
  }, [weather])
  

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


  // console.log('what is iconURL', iconURL)

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

  // need to review this piece of code. when refreshing the page, error is produced in the console
  // Uncaught TypeError: Cannot read properties of undefined (reading '0')


  return (
    <main>
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={(e) => {
            setQuery(e.target.value); // get the value of input typed in,
          }}
          value={query} // find the value equal to query
          onKeyPress={searchWeather}
        />
        <i className="fas fa-search svg"></i>
      </div>

      {typeof weather.main != "undefined" ? (
        <>
          <div id="weather">
            <div className="weather-container">
              <div>
                <div>
                  {weather.name}, {weather.sys.country}
                </div>
                <div>{weatherCurrentTime(new Date())}</div>
              </div>

              <div className="weather-box">
                <div>as of {new Date().toLocaleTimeString()}</div>
                <div className="temperature">
                  {Math.round(weather.main.temp)} °C
                </div>
                <div className="weather-description">
                  {weather.weather[0].description}
                </div>
                <div>Feels like {Math.round(weather.main.feels_like)}</div>
                <div>
                  Minimum temperature {Math.round(weather.main.temp_min)}{" "}
                </div>

                <div>
                  Minimum temperature {Math.round(weather.main.temp_min)}{" "}
                </div>

                <div>
                  Maximum temperature {Math.round(weather.main.pressure)}{" "}
                </div>
                <div>Humidity {Math.round(weather.main.humidity)}%</div>
                <img src={iconURL} className="weather-icon" alt="" />  
                <div className="weather-wind-container">
                  <div>Wind {Math.round(weather.wind.speed)}km </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </main>
  );
};

export default Home;
