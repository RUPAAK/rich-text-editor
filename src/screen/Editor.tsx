import React from "react";
import ReactQuill from "react-quill"; // Typescript
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css"; // ES6
import "../styles.css";

const Editor = () => {
  //   const [state, setState] = React.useState({ value: null });
  var quillObj: any;

  const consoleText = () => {
    const range = quillObj.getEditorSelection();
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      var file: any = input.files![0];
      var formData = new FormData();

      formData.append("image", file);

      var fileName = file.name;

      quillObj
        .getEditor()
        .insertEmbed(
          range.index,
          "image",
          "https://imgs.search.brave.com/_RFZjrfLjK-fhA1f6qM_wOz_SHGTv1yOiW381ie2fVg/rs:fit:759:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5U/VVp4U1JNcTZtMnBx/czlVSWQzNExBSGFF/byZwaWQ9QXBp"
        );
    };
  };

  const handleChange = (value: any) => {
    // setState({ value });
    console.log(value);
  };
  return (
    <>
      <EditorToolbar />
      <ReactQuill
        ref={(el) => {
          quillObj = el;
        }}
        theme="snow"
        // value={state.value}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={{
          toolbar: {
            container: "#toolbar", // Selector for toolbar container
            handlers: {
              //   bold: customBoldHandler,
              image: consoleText,
            },
          },
        }}
        // modules={modules}
        formats={formats}
      />{" "}
    </>
  );
};

export default Editor;
