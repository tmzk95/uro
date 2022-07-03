import "./Box.css";
import { useState } from "react";
import Modal from "./Modal.js";
import Tag from "./Tag.js";
import EditBox from "./EditBox.js";
import EventTypes from "../utils/EventTypes";
import { Fragment } from "react";
import { update } from "../utils/Repo";
import CollectionTypes from "../utils/CollectionTypes";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Box(props) {
  const [extend, setExtend] = useState(false);
  const [notes, setNotes] = useState("");
  const [tagButtonVisible, setTagButtonVisible] = useState(true);
  const [selectedTag, setSelectedTag] = useState("Fotografia");
  const [openTagSelect, setOpenTagSelect] = useState(false);
  const [tags, setTags] = useState(props.details.tags);

  function saveData(data, id) {
    update(data, CollectionTypes.EVENT, id);
  }

  return (
    <Fragment>
      <div
        className={`box ${
          props.details.type === EventTypes.TASK ? "task" : ""
        }`}
        onClick={() => {
          setNotes(props.details.notes);
          setExtend(true);
        }}
      >
        <div className="top">{props.topText}</div>
        <div
          className={`${props.onlyPrimary ? "onlyPrimary" : "primary"} ${
            props.textColor
          }`}
        >
          {props.primaryText}
        </div>
        {!props.onlyPrimary && (
          <div className={`primarySubtitle ${props.textColor}`}>{`${
            props.primaryText === "1" ? "DZIEŃ" : "DNI"
          }`}</div>
        )}
        <div className="secondary">{props.secondaryText}</div>
      </div>
      {extend && (
        <Modal
          onClose={() => {
            setExtend(false);
            saveData({ notes, tags }, props.details.id);
          }}
        >
          <div class="modalContainer">
            <div className="modalLeft">
              <div className="top">{props.topText}</div>
              <div
                className={`${props.onlyPrimary ? "onlyPrimary" : "primary"}`}
              >
                {props.primaryText}
              </div>
              {!props.onlyPrimary && (
                <div className={`primarySubtitle`}>DNI</div>
              )}
              <div className="secondary">{props.secondaryText}</div>
            </div>
            <div className="modalRight">
              <div style={{ display: "flex" }}>
                <div style={{ flexGrow: "1" }}>
                  <div className="modalRightHeader">{`${props.details.number} ${props.details.type}`}</div>
                  <div className="modalRightBody">
                    <EditBox
                      value={notes}
                      label="Notatki"
                      onChange={(val) => {
                        setNotes(val);
                      }}
                    ></EditBox>
                  </div>
                </div>
                {props.details.type === EventTypes.BIRTHDAY && false && (
                  <img
                    width="40px"
                    height="40px"
                    style={{ marginLeft: "45px" }}
                    src={require("../images/birthday.png")}
                  ></img>
                )}
                {props.details.type === EventTypes.WEDDING_ANNIVERSARY &&
                  false && (
                    <img
                      width="40px"
                      height="40px"
                      style={{ marginLeft: "45px" }}
                      src={require("../images/wedding2.png")}
                    ></img>
                  )}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "24px",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                {tags &&
                  tags.map((tag) => (
                    <Tag text={tag.name} color={tag.color}></Tag>
                  ))}
                {tagButtonVisible && (
                  <div
                    onClick={() => {
                      setTagButtonVisible(false);
                      setOpenTagSelect(true);
                    }}
                    className="addTagButton"
                  >
                    +
                  </div>
                )}
                {!tagButtonVisible && (
                  <FormControl size="small">
                    <InputLabel id="demo-simple-select-label">Typ</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedTag}
                      label="Typ"
                      open={openTagSelect}
                      onClose={() => {
                        setOpenTagSelect(false);
                        setTagButtonVisible(true);
                      }}
                      onOpen={() => setOpenTagSelect(true)}
                      onChange={(event) => {
                        setSelectedTag(event.target.value);
                        setTagButtonVisible(true);
                        setOpenTagSelect(false);
                        setTags([
                          ...tags,
                          { name: event.target.value, color: "darkGrayBcg" },
                        ]);
                      }}
                    >
                      <MenuItem
                        sx={{ display: "inline-flex", width: "25%" }}
                        value="Fotografia"
                      >
                        Fotografia
                      </MenuItem>
                      <MenuItem
                        sx={{ display: "inline-flex", width: "25%" }}
                        value="Jedzenie"
                      >
                        Jedzenie
                      </MenuItem>
                      <MenuItem
                        sx={{ display: "inline-flex", width: "25%" }}
                        value="Piłka Nożna"
                      >
                        Piłka Nożna
                      </MenuItem>
                      <MenuItem
                        sx={{ display: "inline-flex", width: "25%" }}
                        value="Decoupage"
                      >
                        Decoupage
                      </MenuItem>
                      <MenuItem
                        sx={{ display: "inline-flex", width: "25%" }}
                        value="Kwiaty"
                      >
                        Kwiaty
                      </MenuItem>
                      <MenuItem
                        sx={{ display: "inline-flex", width: "25%" }}
                        value="Wnętrza"
                      >
                        Wnętrza
                      </MenuItem>
                      <MenuItem
                        sx={{ display: "inline-flex", width: "25%" }}
                        value="Whisky"
                      >
                        Whisky
                      </MenuItem>
                      <MenuItem
                        sx={{ display: "inline-flex", width: "25%" }}
                        value="Książki"
                      >
                        Książki
                      </MenuItem>
                      <MenuItem
                        sx={{ display: "inline-flex", width: "25%" }}
                        value="Muzyka"
                      >
                        Muzyka
                      </MenuItem>
                      <MenuItem
                        sx={{ display: "inline-flex", width: "25%" }}
                        value="Piwa"
                      >
                        Piwa
                      </MenuItem>
                      <MenuItem
                        sx={{ display: "inline-flex", width: "25%" }}
                        value="Winyle"
                      >
                        Winyle
                      </MenuItem>
                      <MenuItem
                        sx={{ display: "inline-flex", width: "25%" }}
                        value="Ogródek"
                      >
                        Ogródek
                      </MenuItem>
                      <MenuItem
                        sx={{ display: "inline-flex", width: "25%" }}
                        value="Gadżety"
                      >
                        Gadżety
                      </MenuItem>
                      <MenuItem
                        sx={{ display: "inline-flex", width: "25%" }}
                        value="Ubrania"
                      >
                        Ubrania
                      </MenuItem>
                      <MenuItem
                        sx={{ display: "inline-flex", width: "25%" }}
                        value="Klocki"
                      >
                        Klocki
                      </MenuItem>
                      <MenuItem
                        sx={{ display: "inline-flex", width: "25%" }}
                        value="Minecraft"
                      >
                        Minecraft
                      </MenuItem>
                      <MenuItem
                        sx={{ display: "inline-flex", width: "25%" }}
                        value="Siatkówka"
                      >
                        Siatkówka
                      </MenuItem>
                      <MenuItem
                        sx={{ display: "inline-flex", width: "25%" }}
                        value="World of Tanks"
                      >
                        World of Tanks
                      </MenuItem>
                      <MenuItem
                        sx={{ display: "inline-flex", width: "25%" }}
                        value="Komputery"
                      >
                        Komputery
                      </MenuItem>
                      <MenuItem
                        sx={{ display: "inline-flex", width: "25%" }}
                        value="Malowanie"
                      >
                        Malowanie
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  );
}

export default Box;
