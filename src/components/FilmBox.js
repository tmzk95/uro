import "./FilmBox.css";
import { useState } from "react";
import Modal from "./Modal.js";
import { Fragment } from "react";

function FilmBox(props) {
  const [extend, setExtend] = useState(false);

  return (
    <Fragment>
      <div
        className="filmBox"
        onClick={() => {
          setExtend(true);
        }}
      >
        <img className="filmImage" src={props.imgSrc}></img>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            marginTop: "8px",
          }}
        >
          <div>
            <div
              className={`score ${
                props.formatType === "Serial" ? "titleGreen" : ""
              }`}
            >
              {props.score.toFixed(1)}
            </div>
          </div>
          <div style={{ textAlign: "left" }}>
            <div
              className={`title ${
                props.formatType === "Serial" ? "titleGreen" : ""
              }`}
            >
              {props.title}
            </div>
            <div
              className={`subtitle ${
                props.formatType === "Serial" ? "titleGreen" : ""
              }`}
            >
              {props.subtitle && props.subtitle.map((type) => `${type} `)}
            </div>
          </div>
        </div>
      </div>
      {extend && (
        <Modal onClose={() => setExtend(false)}>
          <div class="filmModalContainer">
            <img className="filmImage" src={props.imgSrc}></img>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                marginTop: "8px",
              }}
            >
              <div>
                <div className="score">{props.score}</div>
              </div>
              <div style={{ textAlign: "left" }}>
                <div>{props.title}</div>
                <div className="subtitle">{props.subtitle}</div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  );
}

export default FilmBox;
