import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { keyframes } from "@emotion/react";
import { useTheme } from "@mui/system";
import { formatMoneyNumber } from "../utils/NumberUtils/formatNumbers";

const barLoad = keyframes`
    from {
        transform: scaleX(0);
    }
    to {
        transform: scaleX(1);
    }
    `;

export const FillBar = ({ percentage, raised = 2365, total = 10000 }) => {
  const theme = useTheme();
  console.log("percentage", percentage);
  return (
    <Box
      style={{
        animationDelay: 0.2 + "s",
        flexGrow: "1",
      }}
      sx={{
        animationName: `${barLoad}`,
        animationDuration: "3s",
        animationFillMode: "both",
        animationTimingFunction: "cubic-bezier(0.6, 0.2, 0.1, 1)",
        transformOrigin: "left",
        position: "relative",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        style={{
          backgroundColor: theme.palette.secondary.light,
          background: `linear-gradient(270deg, ${theme.palette.primary.dark}, ${theme.palette.primary.light})`,
          width: `${100 - percentage}%`,
          color: "yellow",
          fontWeight: 700,
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: -1,
          //margin: 'auto',
        }}
        sx={{
          minHeight: "6px",
          borderRadius: 12,
          textAlign: "center",
          fontSize: "1.2rem",
        }}
      ></Box>
      <Box
        SX={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <div
          style={{
            margin: "auto",
            textAlign: "center",
            height: "fit-content",
          }}
        >
          {"  $" +
            formatMoneyNumber(raised) +
            " / $" +
            formatMoneyNumber(total) +
            " Raised"}
        </div>
      </Box>
    </Box>
  );
};

FillBar.propTypes = {
  percentage: PropTypes.number,
  raised: PropTypes.number,
  total: PropTypes.number,
  symbol: PropTypes.string,
};
