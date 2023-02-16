import { keyframes, styled } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import PropTypes from "prop-types";

const upAndDown = keyframes`
  0%{
    transform: scaleY(1)
  },
  25%{
    transform: scaleY(0.3)
  },
  50% {
    transform: scaleY(0.7)
  },
  75% {
    transform: scaleY(0.15)
  }
`;

const LeftRect = styled("rect")({
  animation: `${upAndDown} 1s linear .1s infinite`,
  transformOrigin: "center",
});

const CenterRect = styled("rect")({
  animation: `${upAndDown} 1s linear .2s infinite`,
  transformOrigin: "center",
});

const RightRect = styled("rect")({
  animation: `${upAndDown} 1s linear .4s infinite`,
  transformOrigin: "center",
});

const BarredProgress = ({ color, width, sx, ...props }) => {
  width = width ? width : 36;
  return (
    <SvgIcon
      sx={{ width: width + "px", height: (width * 22) / 36 + "px", ...sx }}
      viewBox={"0 0 36 22"}
      color={color}
      {...props}
    >
      <g>
        <LeftRect width="8" height="22" />
        <CenterRect width="8" height="22" x="14" />
        <RightRect width="8" height="22" x="28" />
      </g>
    </SvgIcon>
  );
};

BarredProgress.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  sx: PropTypes.object,
};

export default BarredProgress;
