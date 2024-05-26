import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_FLIGHTS } from "../api/allFlights";
import { SEARCH_FLIGHT } from "../api/searchFlight";
import { reformatDate } from "../utils/dateFormater";
import { findNextClose } from "../utils/findNextClose";

export default function useHomeContainer() {
  const [departureCity, setDepartureCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [dateAndTime, setDateAndTime] = useState(null);
  const [searchParams, setSearchParams] = useState({
    departureCity: "",
    destinationCity: "",
    date: "",
  });

  const {
    loading: searchLoading,
    error: searchError,
    data: searchData,
  } = useQuery(SEARCH_FLIGHT, {
    variables: {
      departureCity: searchParams.departureCity,
      destinationCity: searchParams.destinationCity,
      date: searchParams.date,
    },
    skip:
      !searchParams.departureCity ||
      !searchParams.destinationCity ||
      !searchParams.date,
  });
  const {
    loading: allLoading,
    error: allError,
    data: allData,
  } = useQuery(GET_FLIGHTS);

  const handleDepartureChange = (e) => {
    e.preventDefault();
    setDepartureCity(e.target.value);
    setSearchParams({
      ...searchParams,
      departureCity: e.target.value.trim(),
    });
  };

  const handleDestinationChange = (e) => {
    e.preventDefault();
    setDestinationCity(e.target.value);
    setSearchParams({
      ...searchParams,
      destinationCity: e.target.value.trim(),
    });
  };

  const handleDateChange = (date) => {
    const reformatedDate = reformatDate(date["$d"]);

    setDateAndTime(date);
    setSearchParams({
      ...searchParams,
      date: reformatedDate,
    });
  };

  function handleSearch(e) {
    e.preventDefault();

    setSearchParams({
      ...searchParams,
    });

    if (searchData.searchFlights.length === 0) {
      const closeFlight = findNextClose(
        allData.allFlights,
        searchParams.departureCity,
        searchParams.destinationCity
      );
      console.log(closeFlight);
    }
    console.log(searchData, searchError);
    console.log(allData);
  }

  return {
    departureCity,
    destinationCity,
    dateAndTime,
    searchParams,
    searchLoading,
    searchError,
    searchData,
    allLoading,
    allError,
    allData,
    handleDepartureChange,
    handleDestinationChange,
    handleDateChange,
    handleSearch,
  };
}
