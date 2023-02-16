import { IconButton, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

const CircleIconButton = ({
  icon,
  onClick,
  sx,
  tooltip,
  href,
  badge,
  ...props
}) => {
  badge = badge || null;
  const theme = useTheme();
  return (
    <Tooltip title={tooltip}>
      <IconButton
        component={href ? "a" : "button"}
        href={href}
        target={href ? "_blank" : null}
        onClick={onClick}
        sx={{
          position: "relative",
          color: (theme) => theme.palette.text.primary,
          height: "fit-content",
          width: "fit-content",
          padding: "12px",
          borderRadius: "50%",
          border: (theme) => "1px solid " + theme.palette.divider,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.divider,
          },
          [theme.breakpoints.down("sm")]: {
            padding: "8px",
          },
          ...sx,
        }}
        {...props}
      >
        {icon}
        {badge && badge != "0" && (
          <Box
            sx={{
              backgroundColor: "primary.main",
              borderRadius: "10px",
              padding: "2px 10px 2px 10px",
              position: "absolute",
              color: "primary.contrastText",
              fontWeight: "bold",
              top: sx?.p === 1 ? "-25%" : "-10%",
              right: sx?.p === 1 ? "-50%" : "-10%",
              fontSize: "14px",
            }}
          >
            {badge}
          </Box>
        )}
      </IconButton>
    </Tooltip>
  );
};

CircleIconButton.propTypes = {
  icon: PropTypes.node,
  onClick: PropTypes.func,
  props: PropTypes.object,
  sx: PropTypes.object,
  tooltip: PropTypes.string,
  href: PropTypes.string,
  badge: PropTypes.string,
};

export default CircleIconButton;
