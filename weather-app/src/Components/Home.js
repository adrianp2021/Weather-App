import React, { useEffect, useState } from "react";
import { WiSunrise } from "react-icons/wi";
import { WiSunset } from "react-icons/wi";
import { Container, Divider, Grid, Header, Segment } from "semantic-ui-react";

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
        <h1 id="app-title">Weather App</h1>
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
      </Header>
      {/* <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search the city..."
          onChange={(e) => {
            setQuery(e.target.value); // get the value of input typed in,
          }}
          value={query} // find the value equal to query
          onKeyPress={searchWeather}
        />
        <i className="fas fa-search svg"></i>
      </div> */}

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

            {/* <div> */}
            <div className="temperature">
              <div>
                <div className="degrees">
                  {Math.round(weather.main.temp)} <span id="celsius">°C</span>
                </div>
                <div className="feels">
                  Feels {Math.round(weather.main.feels_like)}°C
                </div>
              </div>
              <img src={iconURL} className="weather-icon" alt="" />
            </div>

            <Grid columns={3} divided>
              <Grid.Row>
                <Grid.Column>
                  <div>{weather.weather[0].description}</div>
                </Grid.Column>
                <div>
                  Minimum temperature {Math.round(weather.main.temp_min)}{" "}
                </div>

                <div>
                  Maximum temperature {Math.round(weather.main.temp_max)}{" "}
                </div>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <div>Pressure {Math.round(weather.main.pressure)} hPa</div>
                </Grid.Column>
                <Grid.Column>
                  <div>Humidity {Math.round(weather.main.humidity)}%</div>
                </Grid.Column>

                <Grid.Column>
                  <div className="weather-wind-container">
                    <div>Wind {Math.round(weather.wind.speed)}km/hr </div>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {/* </div> */}
          </Container>
        </>
      ) : (
        ""
      )}
    </main>
  );
};

export default Home;
