import Box from "@mui/material/Box";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import PropTypes from "prop-types";

const DisplayRichText = ({ text, ...rest }) => {
  return (
    <Box
      className={"ql-container ql-editor mydisplay"}
      dangerouslySetInnerHTML={{
        __html: text,
      }}
      {...rest}
    />
  );
};

DisplayRichText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default DisplayRichText;
