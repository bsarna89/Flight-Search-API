import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_FLIGHTS } from "../api/allFlights";
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

function FlightsTable() {
  const { loading, error, data } = useQuery(GET_FLIGHTS);

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
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  if (loading) {
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

//   <TableContainer component={Paper}>
//   <Table sx={{ minWidth: 650 }} aria-label="simple table">
//     <TableHead>
//       <TableRow>

//         <TableCell>Dessert (100g serving)</TableCell>

//       </TableRow>
//     </TableHead>
//     <TableBody>
//       {rows.map((row) => (
//         <TableRow
//           key={row.name}
//           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//         >
//           <TableCell component="th" scope="row">
//             {row.name}
//           </TableCell>
//           <TableCell align="right">{row.calories}</TableCell>
//           <TableCell align="right">{row.fat}</TableCell>
//           <TableCell align="right">{row.carbs}</TableCell>
//           <TableCell align="right">{row.protein}</TableCell>
//         </TableRow>
//       ))}
//     </TableBody>
//   </Table>
// </TableContainer>
