import "./FilmsListItem.css";
import { useState } from "react";

function FilmsListItem(props) {
  const [expand, setExpand] = useState(false);

  return (
    <div className="filmListContainer" onClick={() => setExpand(!expand)}>
      <div className="filmListItem">
        <div
          class={props.formatType === "Serial" ? "serialTitle" : ""}
          style={{
            flex: "6",
            fontWeight: "300",
            display: "flex",
            alignItems: "baseline",
          }}
        >
          {props.title}
          <div
            class={`serialPopup ${
              props.formatType === "Serial" ? "" : "hidden"
            }`}
            style={{ marginLeft: "30px", fontSize: "10px", fontWeight: "500" }}
          >{` SERIAL`}</div>
        </div>
        <div style={{ flex: "3", fontWeight: "300", fontSize: "12px" }}>
          {props.types && props.types.map((type) => `${type} `)}
        </div>
        <div style={{ flex: "1", textAlign: "right" }}>
          {props.score.toFixed(1)}
        </div>
      </div>
      {expand && (
        <div className="filmListExpanded">
          <div>
            <img className="filmListImage" src={props.coverLink}></img>
          </div>
          <div style={{ fontWeight: "300", fontSize: "16px", color: "#999" }}>
            Tu będzie się znajdował opis filmu i tak dalej i naprawdę coś z
            czegoś z tamtego któro wzięło się jakby skądś
          </div>
        </div>
      )}
    </div>
  );
}

export default FilmsListItem;
