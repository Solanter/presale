import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { MyDivider } from "./MyDivider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/system";
import PropTypes from "prop-types";

const PageTitle = ({ title, action }) => {
  const theme = useTheme();

  return (
    <Grid
      item
      xs={12}
      container
      sx={{
        padding: 0,
        paddingTop: 2,
        [theme.breakpoints.between("xs", "sm")]: {
          padding: 1,
        },
      }}
    >
      <Typography variant={"h3"} color={"text.primary"}>
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: "flex" }}>
        {action && (
          <Button
            sx={{ margin: "auto" }}
            disabled={!action.func}
            variant={"contained"}
            color={"secondary"}
            onClick={action.func}
          >
            {action.title}
          </Button>
        )}
      </Box>
      <MyDivider sx={{ marginTop: 1 }} />
    </Grid>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.object,
};

export default PageTitle;
