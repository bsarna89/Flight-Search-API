import { homeCopy } from "../copy/homeCopy";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_FLIGHTS } from "../api/allFlights";
import { SEARCH_FLIGHT } from "../api/searchFlight";
import CustomLoader from "../components/CustomLoader";
import { reformatDate } from "../utils/dateFormater";
import { findNextClose } from "../utils/findNextClose";

// MUI imports //
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function Home() {
  const { pageContent } = homeCopy;

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

    if (searchData.searchFlights.length === 0)
      findNextClose(
        allData.allFlights,
        searchParams.departureCity,
        searchParams.destinationCity
      );
  }

  if (allLoading || searchLoading) {
    return <CustomLoader />;
  }

  return (
    <div>
      <br></br>
      <Typography variant="h3" component="h3">
        {pageContent.intro.header}
      </Typography>
      <Typography variant="h6" component="h6">
        {pageContent.intro.subText}
      </Typography>
      <br></br>

      <Box>
        <TextField
          id="outlined-basic"
          label="departure City"
          variant="outlined"
          value={departureCity}
          onChange={(e) => handleDepartureChange(e)}
        />

        <TextField
          id="outlined-basic"
          label="destination City"
          variant="outlined"
          value={destinationCity}
          onChange={(e) => handleDestinationChange(e)}
        />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                disablePast
                label="Basic date time picker"
                value={dateAndTime}
                onChange={(newValue) => handleDateChange(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <br></br>
        <Button
          variant="contained"
          disableElevation
          onClick={(e) => handleSearch(e)}
        >
          Search Flight
        </Button>
      </Box>
    </div>
  );
}

export default Home;
