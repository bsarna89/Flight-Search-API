import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CustomLoader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ display: "flex" }} justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    </div>
  );
}
