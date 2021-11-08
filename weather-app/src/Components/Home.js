import React, { useEffect, useState } from "react";
import { Container, Divider, Grid, Header } from "semantic-ui-react";

import { WiSunrise, WiSunset, WiHumidity, WiBarometer } from "react-icons/wi";
import { BsCloudSunFill } from "react-icons/bs";
import { FiWind } from "react-icons/fi";
import { FaTemperatureLow, FaTemperatureHigh } from "react-icons/fa";
import { GoReport } from "react-icons/go";

const Home = () => {
  const api = {
    key: "143d8b76759d409186be983f59e673a1",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [iconURL, setIconURL] = useState("");

  useEffect(() => {
    if (weather && weather.weather) {
      setIconURL(
        "http://openweathermap.org/img/wn/" +
          `${weather.weather[0].icon}` +
          "@4x.png"
      );
      // console.log('what is weather',weather)
    }
  }, [weather]);

  const searchWeather = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
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

  return (
    <main>
      <Header as="h1" id="display">
        <div className="search-box">
          <button className="btn-search">
            <i className="fas fa-search"></i>
          </button>
          <input
            type="text"
            className="input-search"
            placeholder="search city..."
            onChange={(e) => {
              setQuery(e.target.value); // get the value of input typed in,
            }}
            value={query} // find the value equal to query
            onKeyPress={searchWeather}
          />
        </div>
        <div id="display-flex">
          <h1 id="app-title">Weather App</h1>
          {/* <BsCloudSunFill className="logo" /> */}
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            className="logo"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            
            <path d="M11.473 11a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z"></path>
            {/* <animate attributeName="transform" type="rotate" begin="0s" dur="10s" from="0 200 200" to="360 400 400" repeatCount="indefinite" color="yellow"/> */}
            <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708l.707-.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708l-.708-.707zm1.734 3.374a2 2 0 1 1 3.296 2.198c.199.281.372.582.516.898a3 3 0 1 0-4.84-3.225c.352.011.696.055 1.028.129zm4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377zM14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"></path>
          </svg>
        </div>
      </Header>

      {/* <div>{new Date().toLocaleTimeString()}</div> */}

      <Divider />

      {typeof weather.main != "undefined" ? (
        <>
          <Container className="container">
            <div id="top-weather-section">
              <div>
                <div className="country-name">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="today-date">
                  {weatherCurrentTime(new Date())}
                </div>
              </div>

              <div className="top-right-section">
                <div id="display">
                  <WiSunrise id="sunrise" />
                  {new Date(
                    weather.sys.sunrise * 1000
                  ).toLocaleTimeString()}{" "}
                </div>
                <div id="display">
                  <WiSunset id="sunset" />
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
                </div>
              </div>
            </div>

            <div id="temperature-container">
              <div>
                <div className="temperature">
                  {Math.round(weather.main.temp)}
                  <span id="celsius">°C</span>
                </div>
              </div>

              <div>
                <img src={iconURL} className="weather-icon" alt="" />
              </div>
            </div>

            <Grid columns={3} divided>
              <Grid.Row>
                <Grid.Column>
                  <GoReport id="icons" />
                  <div>{weather.weather[0].description}</div>
                </Grid.Column>
                <Grid.Column>
                  <div>
                    <FaTemperatureLow id="icons" />
                    {Math.round(weather.main.temp_min)}{" "}
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div>
                    <FaTemperatureHigh id="icons" />
                    {Math.round(weather.main.temp_max)}{" "}
                  </div>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  {/* <Image src='/images/wireframe/media-paragraph.png' /> */}
                  <div>
                    <WiBarometer id="icons" />
                    {Math.round(weather.main.pressure)} hPa
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div>
                    <WiHumidity id="icons" />
                    {Math.round(weather.main.humidity)}%
                  </div>
                </Grid.Column>

                <Grid.Column>
                  <div>
                    <FiWind id="icons" />
                    {Math.round(weather.wind.speed)}km/hr{" "}
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </>
      ) : (
        ""
      )}
    </main>
  );
};

export default Home;
