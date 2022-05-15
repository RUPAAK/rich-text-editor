import React, { useMemo, useState } from "react";
import ReactQuill from "react-quill"; // Typescript
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css"; // ES6
import "../styles.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { api } from "../http/api";
import { useNavigate } from "react-router-dom";
import { Button, Chip } from "@material-ui/core";
import { TextField } from "@mui/material";

var quillObj: any;

const titleHeight = 12;
const notify = (noti: any) => toast(noti);

const Editor = () => {
  const navigate = useNavigate();
  const [title, settitle] = useState<string>("");
  const [desc, setdesc] = useState<string>("");
  const [logo, setlogo] = useState<string>("");
  const [tag, settag] = useState<string>("");

  const [tags, settags] = useState<string[]>([]);

  //   const [state, setState] = React.useState({ value: null });

  const imageHandler = () => {
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

      try {
        const { data } = await api.post("/services/imageupload", formData);
        quillObj.getEditor().insertEmbed(range.index, "image", data);
      } catch (error) {
        notify("Failed to upload image");
      }
    };
  };
  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#toolbar", // Selector for toolbar container
        handlers: {
          image: () => imageHandler(),
        },
      },
    }),
    []
  );

  const submitBlog = async () => {
    if (title.length === 0) return notify("Please Give Valid Title");
    if (desc.length === 0) return notify("Please Give Description");
    const response = await api.post("/admin/blogs", {
      title,
      desc,
      logo,
      tags,
    });
    notify("Sucessful blog create");
    settitle("");
    settitle("");
  };
  const logout = async () => {
    localStorage.removeItem("token");
    navigate("/login");
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
          top: 0,
          position: "sticky",
          zIndex: 5,
          background: "grey",
          color: "#fff",
        }}
      >
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
          <Button onClick={logout} variant="outlined">
            Logout
          </Button>

          <Button onClick={submitBlog} variant="outlined">
            Publish
          </Button>

          <Toaster />
        </div>
        <TextField
          size="small"
          fullWidth
          placeholder="Give href link for blog"
          onChange={(e) => setlogo(e.target.value)}
        />
        <TextField
          size="small"
          fullWidth
          value={tag}
          placeholder="Enter Tags"
          onKeyPress={(e) => {
            if (e.key == "Enter") {
              settags((prev) => [...prev, tag]);
              settag("");
            }
          }}
          onChange={(e) => settag(e.target.value)}
        />
        {tags.length > 0 &&
          tags.map((each, index) => {
            return (
              <Chip
                onDelete={() => {
                  settags((prev) => {
                    return prev.filter((item) => item != each);
                  });
                }}
                key={index}
                label={each}
              />
            );
          })}
        {logo && <img src={logo} style={{ height: "50px" }} />}
        <EditorToolbar />
      </div>
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
