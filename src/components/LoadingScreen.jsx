import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import BarredProgress from "./Progress/BarredProgress";

const LoadingPage = ({ boxProps, progressProps, typographyProps, title }) => {
  return (
    <Box
      id={"myID"}
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "background.paper",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      {...boxProps}
    >
      <BarredProgress color={"text.primary"} width={75} {...progressProps} />
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 700, textTransform: "capitalize" }}
        {...typographyProps}
      >
        {title ? title : "Loading resources..."}
      </Typography>
    </Box>
  );
};

LoadingPage.propTypes = {
  boxProps: PropTypes.object,
  progressProps: PropTypes.object,
  typographyProps: PropTypes.object,
  title: PropTypes.string,
};

export default LoadingPage;
