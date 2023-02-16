import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

export function MyDivider({ ...rest }) {
  return (
    <Grid item md={12} sm={12} xs={12} {...rest}>
      <Divider variant={"fullWidth"} />
    </Grid>
  );
}
