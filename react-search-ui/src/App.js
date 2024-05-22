import "./App.css";
import { useQuery, gql } from "@apollo/client";

const GET_FLIGHTS = gql`
  query GetFlights {
    allFlights {
      flightNumber
      airline
      departureTime
      arrivalTime
      price
      co2Emissions
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_FLIGHTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App">
      <h1>Flights</h1>
      <ul>
        {data.allFlights.map((flight) => (
          <li key={flight.flightNumber}>
            Flight Number: {flight.flightNumber}
            <br />
            Airline: {flight.airline}
            <br />
            Departure Time: {flight.departureTime}
            <br />
            Arrival Time: {flight.arrivalTime}
            <br />
            Price: {flight.price}
            <br />
            CO2 Emissions: {flight.co2Emissions}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
