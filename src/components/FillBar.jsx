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
      }}
    >
      <Box
        style={{
          backgroundColor: theme.palette.secondary.light,
          background: `linear-gradient(270deg, ${theme.palette.primary.dark}, ${theme.palette.primary.light})`,
          width: `${100 - percentage}%`,
          color: "yellow",
          fontWeight: 700,
          //margin: 'auto',
        }}
        sx={{
          minHeight: "6px",
          borderRadius: 12,
          textAlign: "center",
          fontSize: "1.2rem",
        }}
      >
        {"  $" +
          formatMoneyNumber(raised) +
          " / $" +
          formatMoneyNumber(total) +
          " Raised"}
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
