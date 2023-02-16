import { Breadcrumbs, Grid, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import PropTypes from "prop-types";
import RouterLink from "react-router-dom/Link";

const BreadCrumbs = ({ path }) => {
  return (
    <Grid item xs={12} sx={{ p: 2, pt: 1, pb: 0 }}>
      <Breadcrumbs aria-label="breadcrumb">
        {path?.map((p, i, array) => {
          if (i === array.length - 1 || !p.href)
            return (
              <Typography key={p.toString()} color="text.primary">
                {p.title}
              </Typography>
            );
          else
            return (
              <Link
                component={RouterLink}
                key={p.toString()}
                underline="hover"
                color="inherit"
                to={p.href}
              >
                {p.title}
              </Link>
            );
        })}
      </Breadcrumbs>
    </Grid>
  );
};

BreadCrumbs.propTypes = {
  path: PropTypes.array,
};

export default BreadCrumbs;
