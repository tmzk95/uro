import "./Main.css";
import EventPanel from "./EventPanel.js";
import RecommendedPanel from "./RecommendedPanel";
import GalleryPanel from "./GalleryPanel";
import TodosPanel from "./TodosPanel";
import { useState } from "react";
import Login from "../oauth2/login";
import Logout from "../oauth2/logout";
import AbsoluteText from "./AbsoluteText";

const EVENTS_VIEW = "Wydarzenia";
const RECOMMENDED_VIEW = "Polecajki";
const GALLERY_VIEW = "Galeria";
const BLOG_VIEW = "Posty";
const TODO_LIST_VIEW = "Zadania";

function Main(props) {
  const [selectedView, setSelectedView] = useState(EVENTS_VIEW);

  return (
    <div className="main">
      <div className="menu">
        <div onClick={() => setSelectedView(EVENTS_VIEW)} className="menuText">
          {EVENTS_VIEW}
        </div>
        <div
          onClick={() => setSelectedView(RECOMMENDED_VIEW)}
          className="menuText"
        >
          {RECOMMENDED_VIEW}
        </div>
        <div onClick={() => setSelectedView(GALLERY_VIEW)} className="menuText">
          {GALLERY_VIEW}
        </div>
        <div onClick={() => setSelectedView(BLOG_VIEW)} className="menuText">
          {BLOG_VIEW}
        </div>
        <div
          onClick={() => setSelectedView(TODO_LIST_VIEW)}
          className="menuText"
        >
          {TODO_LIST_VIEW}
        </div>
        <div
          style={{
            position: "absolute",
            right: "0",
            marginRight: "20px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <Login
            onLogin={() => props.onLogin()}
            onFailure={() => props.onLoginFailure()}
          ></Login>
          <Logout onLogout={() => props.onLogout()}></Logout>
        </div>
      </div>
      <div style={{ width: "920px" }}>
        <div
          className={`header ${
            selectedView === EVENTS_VIEW ? "header-1" : "header-2"
          }`}
        >
          <img width="140px" src={require("../images/tiger2.png")}></img>
          <div>Dziabułki</div>
        </div>
        {selectedView === EVENTS_VIEW && <EventPanel></EventPanel>}

        {selectedView === RECOMMENDED_VIEW && (
          <RecommendedPanel></RecommendedPanel>
        )}

        {selectedView === GALLERY_VIEW && (
          <GalleryPanel authorization={props.authorization}></GalleryPanel>
        )}

        {selectedView === TODO_LIST_VIEW && <TodosPanel></TodosPanel>}
      </div>
    </div>
  );
}

export default Main;
