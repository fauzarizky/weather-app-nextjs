"use client";

import Container from "@/components/Container";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/components/Providers";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherIcon from "@/components/WeatherIcon";
import WeatherSkeleton from "@/components/WeatherSkeleton";
import { fetchWeatherData } from "@/services/weatherApi";
import { convertKelvinToCelcius } from "@/utils/convertKelvinToCelcius";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { metersToKilometers } from "@/utils/metersToKilometers";
import { format, fromUnixTime, parseISO } from "date-fns";
import { useEffect } from "react";
import { useQuery } from "react-query";

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherEntry[];
  city: City;
}

interface WeatherEntry {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  sys: Sys;
  dt_txt: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Rain {
  "3h": number;
}

interface Sys {
  pod: string;
}

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface Coord {
  lat: number;
  lon: number;
}

export default function Home() {
  const { city, loading } = useAppContext();
  const { isLoading, data, refetch } = useQuery<WeatherData>("repoData", () => fetchWeatherData(city || "Indonesia"));

  const uniqueDates = [...new Set(data?.list.map((entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]))];

  // Filtering data to get the first entry after 6 AM for each unique date
  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  useEffect(() => {
    refetch();
  }, [city, loading, refetch]);

  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-sky-500 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
      </div>
    );
  const firstData = data?.list[0];

  return (
    <div className="flex flex-col gap-4 bg-sky-100 min-h-screen">
      <Navbar location={data?.city.name ?? "-"} />
      {loading ? (
        <WeatherSkeleton />
      ) : (
        <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
          {/* Today Data */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="flex gap-1 text-2xl items-end">
                <p>{firstData && format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
                <p className="text-lg">{firstData && format(parseISO(firstData?.dt_txt ?? ""), "dd-MM-yyyy")}</p>
              </h2>
              <Container className="gap-10 px-6 items-center">
                {/* Temperature */}
                <div className="flex flex-col px-4">
                  <span className="text-5xl">{convertKelvinToCelcius(firstData?.main.temp ?? 0)}°C</span>
                  <p className="text-xs space-x-1 whitespace-nowrap">
                    <span>Feels Like</span>
                    <span>{convertKelvinToCelcius(firstData?.main.feels_like ?? 0)}°C</span>
                  </p>
                  <p className="text-xs space-x-2">
                    <span>{convertKelvinToCelcius(firstData?.main.temp_min ?? 0)}°↓</span>
                    <span>{convertKelvinToCelcius(firstData?.main.temp_max ?? 0)}°↑</span>
                  </p>
                </div>
                {/* Time and weather Icon */}
                <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                  {data?.list.map((d, i) => (
                    <div key={i} className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                      <p className="whitespace-nowrap">{format(parseISO(d?.dt_txt), "H:mm a")}</p>
                      <WeatherIcon iconName={getDayOrNightIcon(d?.weather[0].icon, d?.dt_txt)} />
                      <p>{convertKelvinToCelcius(d?.main.temp ?? 0)}°</p>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
            <div className="flex gap-4">
              {/* Left */}
              <Container className="w-fit justify-center flex-col px-4 items-center">
                <p className="capitalize text-center">{firstData?.weather[0].description}</p>
                <WeatherIcon iconName={getDayOrNightIcon(firstData?.weather[0].icon ?? "", firstData?.dt_txt ?? "")} />
              </Container>
              {/* Right */}
              <Container className="bg-sky-500 px-6 gap-4 justify-between overflow-x-auto">
                <WeatherDetails
                  className="text-white"
                  visability={metersToKilometers(firstData?.visibility ?? 0)}
                  airPressure={`${firstData?.main.pressure} hPa`}
                  humidity={`${firstData?.main.humidity}%`}
                  sunrise={format(fromUnixTime(data?.city.sunrise ?? 1702949452), "H:mm")}
                  sunset={format(fromUnixTime(data?.city.sunset ?? 1702949452), "H:mm")}
                  windSpeed={convertWindSpeed(firstData?.wind.speed ?? 0)}
                />
              </Container>
            </div>
          </section>

          {/* 7 days forecast data */}
          <section className="flex w-ful flex-col gap-4">
            <p className="text-2xl">Forecast (7 days)</p>
            {firstDataForEachDate.map((d, i) => (
              <ForecastWeatherDetail
                key={i}
                description={d?.weather[0].description ?? ""}
                weatherIcon={d?.weather[0].icon ?? ""}
                date={format(parseISO(d?.dt_txt ?? ""), "dd-MM")}
                day={format(parseISO(d?.dt_txt ?? ""), "EEEE")}
                feels_like={d?.main.feels_like ?? 0}
                temp={d?.main.temp ?? 0}
                temp_max={d?.main.temp_max ?? 0}
                temp_min={d?.main.temp_min ?? 0}
                airPressure={`${d?.main.pressure} hPa`}
                humidity={`${d?.main.humidity}%`}
                sunrise={format(fromUnixTime(data?.city.sunrise ?? 1702949452), "H:mm")}
                sunset={format(fromUnixTime(data?.city.sunset ?? 1702949452), "H:mm")}
                visability={metersToKilometers(d?.visibility ?? 0)}
                windSpeed={convertWindSpeed(d?.wind.speed ?? 0)}
              />
            ))}
          </section>
        </main>
      )}
    </div>
  );
}
