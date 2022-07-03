import "./EditBox.css";
import { useState } from "react";

function EditBox(props) {
  const [value, setValue] = useState(props.value);

  return (
    <div className="editBox">
      <div style={{ marginBottom: "12px" }}>{props.label}:</div>
      <textarea
        value={value}
        rows={8}
        className="textArea"
        onChange={(evt) => {
          setValue(evt.target.value);
          props.onChange(evt.target.value);
        }}
      />
    </div>
  );
}

export default EditBox;
