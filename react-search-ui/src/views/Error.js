import { Link } from "react-router-dom";
import { ErrorPageCopy } from "../copy/errorPageCopy";

// MUI imports //
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

function ErrorPage() {
  const { alert, header, backHome } = ErrorPageCopy;
  return (
    <Stack sx={{ width: "100%" }}>
      <Alert severity="error">{alert.text}</Alert>
      <br></br>
      <Typography variant="h3" component="h3">
        {header.text}
      </Typography>
      <br></br>
      <Link to="/"> {backHome.text}</Link>
    </Stack>
  );
}

export default ErrorPage;
