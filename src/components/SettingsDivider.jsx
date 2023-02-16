import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";

const SettingsDivider = ({ title, variant, sx, color, ...rest }) => {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      sx={{
        mb: 2,
        ...sx,
      }}
      {...rest}
    >
      <Typography variant={variant ? variant : "h6"} color={color || "primary"}>
        {title}
      </Typography>
      <Divider
        color={color || "primary"}
        sx={{
          height: "2px",
          backgroundColor: (theme) =>
            theme.palette[color ? color : "primary"].main + "77",
        }}
      />
    </Grid>
  );
};

SettingsDivider.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  sx: PropTypes.object,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "error",
    "success",
    "warning",
  ]),
};

export default SettingsDivider;
