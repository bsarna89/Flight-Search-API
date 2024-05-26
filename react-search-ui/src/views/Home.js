import { homeCopy } from "../copy/homeCopy";
import CustomLoader from "../components/CustomLoader";
import { useNavigate } from "react-router-dom";

// MUI imports //
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import useHomeContainer from "./home-container";

function Home() {
  const { pageContent } = homeCopy;
  const {
    departureCity,
    destinationCity,
    dateAndTime,
    searchLoading,
    allLoading,
    searchError,
    allError,
    handleDepartureChange,
    handleDestinationChange,
    handleDateChange,
    handleSearch,
  } = useHomeContainer();
  const navigate = useNavigate();

  if (allLoading || searchLoading) {
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
