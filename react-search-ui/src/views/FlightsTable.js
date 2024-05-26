import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { tableCopy } from "../copy/flightsTableCopy";
import { formatDate } from "../utils/dateFormater";
import CustomLoader from "../components/CustomLoader";

// MUI imports //
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import useFligthsTableContainer from "./flights-table-container";

function FlightsTable() {
  const { loading, error, data } = useFligthsTableContainer();
  const navigate = useNavigate();
  const { tableHeadList: titles, pageContent } = tableCopy;

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  if (loading) {
    return <CustomLoader />;
  }

  if (error) {
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
      <br></br>
      <Typography variant="h4" component="h4">
        {pageContent.intro.searchTitle}
      </Typography>
      <Typography variant="h6" component="h6">
        {pageContent.intro.searchText}
      </Typography>
      <Link to="/"> {pageContent.intro.link}</Link>
      <br></br>
      <br></br>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {titles.map((title, ind) => (
                <StyledTableCell key={ind}>
                  {title.toUpperCase()}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.allFlights.map((flight, ind) => (
                <StyledTableRow
                  key={ind}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell align="left">
                    {flight.airline}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {flight.flightNumber}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {flight.departureCity}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {formatDate(flight.departureTime)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {flight.destinationCity}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {formatDate(flight.arrivalTime)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {"$" + flight.price}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {flight.co2Emissions}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default FlightsTable;
