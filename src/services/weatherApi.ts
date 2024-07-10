import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export async function fetchWeatherData(city: string) {
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&cnt=56`;
  const { data } = await axios.get(url);
  return data;
}

export async function fetchWeatherDataByCoords(lon: number, lat: number) {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const { data } = await axios.get(url);
  return data;
}

export async function fetchCityData(city: string) {
  const url = `http://api.openweathermap.org/data/2.5/find?q=${city}&appid=${API_KEY}`;
  const { data } = await axios.get(url);
  return data;
}