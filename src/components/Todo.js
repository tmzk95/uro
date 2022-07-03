import { Checkbox, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import "./Todo.css";
import { update } from "../utils/Repo";
import CollectionTypes from "../utils/CollectionTypes";
import SaveIcon from "@mui/icons-material/Save";

function Todo(props) {
  const [description, setDescription] = useState(props.description);
  const [enableSave, setEnableSave] = useState(false);
  const [checked, setChecked] = useState(props.checked);

  function save(descriptionOverride, checkedOverride) {
    console.log("TESAT");
    update(
      {
        description:
          descriptionOverride != null ? descriptionOverride : description,
        checked: checkedOverride != null ? checkedOverride : checked,
      },
      CollectionTypes.TODO,
      props.id
    );
  }

  return (
    <div className="todo">
      <Checkbox
        checked={checked}
        onChange={(event) => {
          setChecked(event.target.checked);
          save(null, event.target.checked);
        }}
        inputProps={{ "aria-label": "controlled" }}
      />
      <TextField
        style={{
          marginLeft: "10px",
          marginRight: "20px",
        }}
        sx={{
          "& .MuiInput-underline:before": { borderBottomColor: "#ddd" },
          "& .MuiInput-underline:after": { borderBottomColor: "#777" },
          "& .MuiInput-underline": {
            fontFamily: '"Lexend Deca", sans-serif',
            fontWeight: "300",
          },
        }}
        classes={{}}
        fullWidth
        variant="standard"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        onFocus={() => setEnableSave(true)}
        onBlur={(event) => {
          save(event.target.value);
          setTimeout(() => setEnableSave(false), 500);
        }}
      />
    </div>
  );
}

export default Todo;
