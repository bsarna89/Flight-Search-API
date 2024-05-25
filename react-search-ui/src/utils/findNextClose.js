export function findNextClose(data, departureCity, destinationCity) {
  return data.filter(
    (flight) =>
      flight.destinationCity === destinationCity &&
      flight.departureCity === departureCity
  );
}
