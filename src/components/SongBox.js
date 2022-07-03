import "./SongBox.css";
import { useState } from "react";
import Modal from "./Modal.js";
import { Fragment } from "react";

function SongBox(props) {
  return (
    <Fragment>
      <div className="songBox">
        <img className="songImage" src={props.imgSrc}></img>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            marginTop: "12px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div className="songTitle">{props.title}</div>
            <div className="songSubtitle">{props.subtitle}</div>
            <div className="subtitleSecondary">{props.subtitleSecondary}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SongBox;
