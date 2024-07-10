"use client";

import { MdWbSunny, MdMyLocation, MdOutlineLocationSearching } from "react-icons/md";
import SearchBox from "./SearchBox";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useAppContext } from "./Providers";
import { fetchCityData, fetchWeatherDataByCoords } from "@/services/weatherApi";

type Props = {
  location: string;
};

export default function Navbar(props: Props) {
  const { city, setCity, setLoading } = useAppContext();
  const [error, setError] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleInputChange = async (e: string) => {
    setCity(e);

    if (e.length >= 3) {
      try {
        const response = await fetchCityData(e);

        const suggestions = response.list.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (item: string) => {
    setCity(item);
    setShowSuggestions(false);
  };

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    if (suggestions.length === 0) {
      setError("Location not found");
      setLoading(false);
    } else {
      setError("");
      setTimeout(() => {
        setShowSuggestions(false);
        setLoading(false);
      }, 500);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          setLoading(true);
          const response = await fetchWeatherDataByCoords(longitude, latitude);

          if (response.cod === 200) {
            setLoading(false);
            setCity(response.name);
          }
        } catch (error) {
          setLoading(false);
          console.error(error);
        }
      });
    }
  };

  return (
    <>
      <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-sky-600 text-3xl">Weather</h2>
            <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
          </div>

          <section className="flex gap-2 items-center">
            <MdMyLocation title="Your Current Location" onClick={handleCurrentLocation} className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
            <MdOutlineLocationSearching className="text-3xl" />
            <p className="text-slate-900/80 text-sm">{props.location}</p>
            <div className="relative hidden md:flex">
              <SearchBox value={city} onSubmit={handleSubmitSearch} onChange={(e) => handleInputChange(e.target.value)} />
              <SuggetionBox {...{ showSuggestions, suggestions, handleSuggestionClick, error }} />
            </div>
          </section>
        </div>
      </nav>
      <section className="flex max-w-7xl px-3 md:hidden">
        <div className="relative">
          <SearchBox value={city} onSubmit={handleSubmitSearch} onChange={(e) => handleInputChange(e.target.value)} />
          <SuggetionBox {...{ showSuggestions, suggestions, handleSuggestionClick, error }} />
        </div>
      </section>
    </>
  );
}

interface SuggestionBoxProps {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}

function SuggetionBox({ showSuggestions, suggestions, handleSuggestionClick, error }: SuggestionBoxProps) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-white absolute border top-[40px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
          {error && suggestions.length < 1 && <li className="text-red-500 p-1">{error}</li>}

          {suggestions.map((item, i) => (
            <li key={i} onClick={() => handleSuggestionClick(item)} className="cursor-pointer p-1 rounded hover:bg-gray-200">
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
