import { homeCopy } from "../copy/homeCopy";
import CustomLoader from "../components/CustomLoader";
import { useNavigate } from "react-router-dom";
import useHomeContainer from "./home-container";
import { formatDate } from "../utils/dateFormater";

// MUI imports //
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FlightCard from "../components/FlightCard";

function Home() {
  const {
    pageContent,
    images,
    button,
    inputs,
    datePicker,
    noFoundFlight,
    nextFlight,
  } = homeCopy;
  const {
    departureCity,
    destinationCity,
    dateAndTime,
    allLoading,
    searchError,
    allError,
    displayCard,
    cardProps,
    nextFlightClose,
    noFound,
    handleDepartureChange,
    handleDestinationChange,
    handleDateChange,
    handleSearch,
  } = useHomeContainer();
  const navigate = useNavigate();

  if (allLoading) {
    return <CustomLoader />;
  }

  if (searchError || allError) {
    navigate("/error");
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

      <img src={images.dashboard.link} alt={images.dashboard.alt} />
      <br></br>
      <br></br>
      <Box>
        <TextField
          id={inputs.departureCity.id}
          label={inputs.departureCity.label}
          variant="outlined"
          value={departureCity}
          onChange={(e) => handleDepartureChange(e)}
        />

        <TextField
          id={inputs.destinationCity.id}
          label={inputs.destinationCity.label}
          variant="outlined"
          value={destinationCity}
          onChange={(e) => handleDestinationChange(e)}
        />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                disablePast
                label={datePicker.label}
                value={dateAndTime}
                onChange={(newValue) => handleDateChange(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <br></br>
        {displayCard && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FlightCard cardProps={cardProps} />
            <br></br>
          </div>
        )}
        {!displayCard && nextFlightClose.length > 0 && (
          <Typography gutterBottom variant="h5" component="div">
            {nextFlight.textOne}
            {nextFlightClose[0].departureCity}
            {nextFlight.textLink}
            {nextFlightClose[0].destinationCity}
            {nextFlight.textTwo}
            {formatDate(nextFlightClose[0].departureTime)}
          </Typography>
        )}
        {noFound && (
          <Typography gutterBottom variant="h5" component="div">
            {noFoundFlight.text}
          </Typography>
        )}

        <br></br>
        <Button
          variant="contained"
          disableElevation
          onClick={(e) => handleSearch(e)}
        >
          {button.buttonText}
        </Button>
        <br></br>
      </Box>
    </div>
  );
}

export default Home;
