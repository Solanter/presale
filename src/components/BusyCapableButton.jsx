import Button from "@mui/material/Button";
import BarredProgress from "./Progress/BarredProgress";
import PropTypes from "prop-types";

const BusyCapableButton = ({
  disabled,
  busy,
  children,
  variant,
  color,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={busy || disabled}
      variant={variant}
      color={color}
    >
      {busy && <BarredProgress width={16} sx={{ mr: 1 }} />} {children}
    </Button>
  );
};

BusyCapableButton.propTypes = {
  disabled: PropTypes.bool,
  busy: PropTypes.bool,
  children: PropTypes.node,
  variant: PropTypes.oneOf(["text", "outlined", "contained"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "error",
    "info",
    "success",
    "warning",
  ]),
};

export default BusyCapableButton;
