import React, { useMemo, useState } from "react";
import ReactQuill from "react-quill"; // Typescript
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css"; // ES6
import "../styles.css";
import toast, { Toaster } from "react-hot-toast";

var quillObj: any;

const titleHeight = 12;
const notify = (noti: any) => toast(noti);

const Editor = () => {
  const [title, settitle] = useState<string>("");
  const [desc, setdesc] = useState<string>("");

  //   const [state, setState] = React.useState({ value: null });

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
  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#toolbar", // Selector for toolbar container
        handlers: {
          image: () => consoleText(),
        },
      },
    }),
    []
  );

  const submitBlog = async () => {
    if (title.length === 0) return notify("Please Give Valid Title");
    if (desc.length === 0) return notify("Please Give Description");
    console.log(title, desc);
  };
  const handleChange = (value: string) => {
    setdesc(value);
  };
  const titleChange = (title: string) => {
    settitle(title);
  };
  return (
    <>
      <div
        style={{
          maxWidth: "100%",
          padding: "0 2rem 0 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>Draft</p>
        <button onClick={submitBlog}>Publish</button>
        <Toaster />
      </div>
      <EditorToolbar />
      <div>
        <input
          value={title}
          onChange={(e) => titleChange(e.target.value)}
          placeholder="Title of you blog..."
          style={{ padding: `${titleHeight}px`, width: "100%", border: "none" }}
        />
        <ReactQuill
          value={desc}
          ref={(el) => {
            quillObj = el;
          }}
          // style={{ padding: "2rem 0", }}
          theme="snow"
          // value={state.value}
          onChange={handleChange}
          placeholder={"Write something awesome..."}
          // modules={{
          //   toolbar: {
          //     container: "#toolbar", // Selector for toolbar container
          //     handlers: {
          //       image: () => consoleText(),
          //     },
          //   },
          // }}
          modules={modules}
          formats={formats}
        />
      </div>
    </>
  );
};

export default Editor;
