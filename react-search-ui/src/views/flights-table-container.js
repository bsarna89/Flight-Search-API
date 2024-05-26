import { useQuery } from "@apollo/client";
import { GET_FLIGHTS } from "../api/allFlights";

export default function useFligthsTableContainer() {
  const { loading, error, data } = useQuery(GET_FLIGHTS);

  return {
    loading,
    error,
    data,
  };
}
