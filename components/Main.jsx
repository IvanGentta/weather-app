import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";
import Weather from "./Weather";
import Spinner from "./Spinner";
import { data } from "autoprefixer";

const Main = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  //In celsius -(&units=metric) in fahrenheit -(&units=imperial)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(url).then((response) => {
      setWeather(response.data);
      console.log(response.data);
    });
    setCity("");
    setLoading(false);
  };

  // const backgroundPhoto = () => {
  //   if (data.weather[0].main === "Rain") {
  //     return (
  //       <Image
  //         src="/assets/Rainy weather.jpg"
  //         layout="fill"
  //         className="object-cover"
  //       />
  //     );
  //   } else if (data.weather[0].main === "Clouds") {
  //     return (
  //       <Image
  //         src="/assets/Cloudy weather.jpg"
  //         layout="fill"
  //         className="object-cover"
  //       />
  //     );
  //   } else if (data.main.temp.toFixed(0) < 0) {
  //     return (
  //       <Image
  //         src="/assets/Cold weather.jpg"
  //         layout="fill"
  //         className="object-cover"
  //       />
  //     );
  //   } else if (data.main.temp.toFixed(0) <= 27) {
  //     return (
  //       <Image
  //         src="/assets/Sunny weather.jpg"
  //         layout="fill"
  //         className="object-cover"
  //       />
  //     );
  //   } else if (data.main.temp.toFixed(0) >= 28) {
  //     return (
  //       <Image
  //         src="/assets/Hot weather.jpg"
  //         layout="fill"
  //         className="object-cover"
  //       />
  //     );
  //   }
  // };

  //  <Background
  //           weatherDescription={data.weather ? data.weather[0].main : null}
  //         />

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        {/* Overlay, so we use a self-closing div */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]" />
        <Image
          src="/assets/Sunny weather.jpg"
          layout="fill"
          className="object-cover"
        />
        <div className="z-20">
          <h1>Weather App</h1>
        </div>
        <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
          <form
            onSubmit={fetchWeather}
            className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
          >
            <div>
              <input
                onChange={(e) => setCity(e.target.value)}
                className="bg-transparent border-none text-white focus:outline-none text-2xl"
                type="text"
                placeholder="Search any city"
              />
            </div>
            <button onClick={fetchWeather}>
              <BsSearch size={20} />
            </button>
          </form>
        </div>

        {weather.main && <Weather data={weather} />}
      </div>
    );
  }
};

export default Main;
