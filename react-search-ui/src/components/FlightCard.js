import { homeCopy } from "../copy/homeCopy";
import getImageFromCopy from "../utils/getImageFromCopy";

// MUI imports //
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { formatDate } from "../utils/dateFormater";

export default function FlightCard(props) {
  const { cardProps } = props;
  const { citiesPhotos, linkers, cardInfo } = homeCopy;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={getImageFromCopy(cardProps.departureCity, citiesPhotos)}
          alt={cardProps.departureCity}
        />
        <br></br>
        <CardMedia
          component="img"
          height="140"
          image={getImageFromCopy(cardProps.destinationCity, citiesPhotos)}
          alt={cardProps.destinationCity}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {cardProps.departureCity} {linkers.to} {cardProps.destinationCity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cardInfo.airline}
            {cardProps.airline}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cardInfo.flightNumber}
            {cardProps.flightNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cardInfo.price}
            {cardProps.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cardInfo.departureTime}
            {formatDate(cardProps.departureTime)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cardInfo.arrivalTime}
            {formatDate(cardProps.arrivalTime)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cardInfo.co2Emission}
            {cardProps.co2Emissions}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
