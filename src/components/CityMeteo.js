import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTemperatureLow } from "react-icons/fa";
import { WiDayCloudy } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";
const apiKey = process.env.REACT_APP_API_KEY;

const CityMeteo = () => {
  const [cityInput, setCityInput] = useState("");
  const [cityDesc, setCityDesc] = useState("");
  const [cityTemp, setCityTemp] = useState("");
  const [weatherDesc, setWeatherDesc] = useState("");
  const [cityWind, setCityWind] = useState("");
  const [cityHumidity, setCityHumidity] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric&lang=fr`
      )
      .then(res => {
        setCityTemp(res.data.main.temp);
        setCityDesc(res.data);
        setWeatherDesc(res.data.weather[0].description);
        setCityWind(res.data.wind.speed);
        setCityHumidity(res.data.main.humidity);
      })
      .catch(error => {
        console.log("error :>> ", error);
      });
  }, []);

  const handleSubmitForm = e => {
    e.preventDefault();

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric&lang=fr`
      )
      .then(res => {
        setCityTemp(res.data.main.temp);
        setCityDesc(res.data);
        setWeatherDesc(res.data.weather[0].description);
        setCityWind(res.data.wind.speed);
        setCityHumidity(res.data.main.humidity);
      })
      .catch(error => {
        console.log("error :>> ", error);
      });
  };
  return (
    <div className="main-div">
      <h1>City meteo</h1>
      <form onSubmit={handleSubmitForm}>
        <input
          type="text"
          value={cityInput}
          onChange={e => {
            setCityInput(e.target.value);
          }}
        />
        <button type="submit">Valider</button>
      </form>

      <h4>Ville {cityDesc.name}</h4>

      <div className="container">
        <div>
          <span>
            {" "}
            <FaTemperatureLow />
          </span>
          <p>{`${cityTemp}°c`}</p>
        </div>
        <div>
          <span>
            <WiDayCloudy />
          </span>
          <p>{weatherDesc}</p>
        </div>
        <div>
          <span>
            {" "}
            <WiStrongWind />
          </span>
          <p>{cityWind} km</p>
        </div>
        <div>
          <span>
            <WiHumidity />
          </span>
          <p>{cityHumidity} %</p>
        </div>
      </div>
    </div>
  );
};

export default CityMeteo;
