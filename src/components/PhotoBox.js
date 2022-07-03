import "./PhotoBox.css";
import { useState } from "react";
import Modal from "./Modal.js";
import { Fragment } from "react";

function PhotoBox(props) {
  const [extend, setExtend] = useState(false);

  return (
    <Fragment>
      <div
        className="photoBox"
        onClick={() => {
          setExtend(true);
        }}
      >
        <img className="photoImage" src={props.imgSrc}></img>
      </div>
      {extend && (
        <Modal onClose={() => setExtend(false)}>
          <div className="photoModalContainer">
            <img className="photoImageBig" src={props.imgSrc}></img>
          </div>
        </Modal>
      )}
    </Fragment>
  );
}

export default PhotoBox;
