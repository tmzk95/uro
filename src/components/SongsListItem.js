import "./SongsListItem.css";
import { useState } from "react";

function SongsListItem(props) {
  const [expand, setExpand] = useState(false);

  return (
    <div className="songListContainer" onClick={() => setExpand(!expand)}>
      <div className="songListItem">
        <div
          style={{
            flex: "3",
            fontWeight: "300",
            display: "flex",
            alignItems: "baseline",
          }}
        >
          {props.title}
        </div>
        <div style={{ flex: "2", fontWeight: "300", fontSize: "12px" }}>
          {props.album}
        </div>
        <div style={{ flex: "2", textAlign: "right", fontWeight: "300" }}>
          {props.artist}
        </div>
      </div>
      {expand && (
        <div className="songListExpanded">
          <div>
            <img className="songListImage" src={props.coverLink}></img>
          </div>
        </div>
      )}
    </div>
  );
}

export default SongsListItem;
