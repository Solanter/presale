import Page from "./components/Page";
import PageTitle from "./components/PageTitle";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const Error404 = () => {
  return (
    <Page title={"404"} description={"404"}>
      <PageTitle title={"ERROR 404"} />
      <Box
        sx={{
          height: "100%",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            margin: "auto",
            mt: 10,
          }}
          variant={"h6"}
        >
          We could not find what you are looking for
          <a href={"/"}> Go Back Home</a>
        </Typography>
      </Box>
    </Page>
  );
};

export default Error404;
