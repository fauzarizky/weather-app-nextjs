import { cn } from "@/utils/cn";
import React from "react";
import { FiDroplet } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { MdAir } from "react-icons/md";

export interface WeatherDetailProps {
  visability: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
  className?: string;
}

export default function WeatherDetails(props: WeatherDetailProps) {
  const { visability = "-", humidity = "-", windSpeed = "-", airPressure = "-", sunrise = "-", sunset = "-" } = props;
  return (
    <>
      <SingleWeatherDetail className={props.className} icon={<LuEye />} information="Visability" value={visability} />
      <SingleWeatherDetail className={props.className} icon={<FiDroplet />} information="Humidity" value={humidity} />
      <SingleWeatherDetail className={props.className} icon={<MdAir />} information="Wind Speed" value={windSpeed} />
      <SingleWeatherDetail className={props.className} icon={<ImMeter />} information="Air Preasure" value={airPressure} />
      <SingleWeatherDetail className={props.className} icon={<LuSunrise />} information="Sunrise" value={sunrise} />
      <SingleWeatherDetail className={props.className} icon={<LuSunset />} information="Sunset" value={sunset} />
    </>
  );
}

export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
  className?: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
  return (
    <div className={cn("flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80", props.className)}>
      <p className="whitespace-nowrap">{props.information}</p>
      <div className="text-3xl">{props.icon}</div>
      <p>{props.value}</p>
    </div>
  );
}
