import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import PropTypes from "prop-types";

function RichEditor({ value, setValue, placeholder }) {
  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ align: [] }, { list: "ordered" }, { list: "bullet" }],
    // [{ script: "sub" }, { script: "super" }], // superscript/subscript
    //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown

    ["link", "image", "video"],
    [{ direction: "rtl" }], // text direction

    ["clean"], // remove formatting button
  ];
  return (
    <ReactQuill
      className={"ql-container ql-editor mydisplay"}
      placeholder={placeholder ? placeholder : "Start typing"}
      style={{
        width: "100%",
        minHeight: "300px",
        backgroundColor: "white",
        color: "black",
      }}
      modules={{
        toolbar: toolbarOptions,
      }}
      theme="snow"
      value={value}
      scrollingContainer={"div"}
      onChange={setValue}
    />
  );
}

RichEditor.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default RichEditor;
