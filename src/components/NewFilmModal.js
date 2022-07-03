import Modal from "./Modal";
import "./NewFilmModal.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import CustomButton from "./CustomButton";
import { create } from "../utils/Repo";
import CollectionTypes from "../utils/CollectionTypes";
import { Checkbox, FormControlLabel } from "@mui/material";

function NewFilmModal(props) {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [score, setScore] = useState("");
  const [cover, setCover] = useState("");
  const [isSerial, setIsSerial] = useState(false);

  return (
    props.open && (
      <Modal onClose={() => props.onClose()}>
        <div className="newFilmModal">
          <div>
            <img
              width="200px"
              src={
                cover !== ""
                  ? cover
                  : "https://www.seekpng.com/png/detail/15-154428_tama-filmowa-icon-film-reel.png"
              }
            ></img>
          </div>
          <div
            style={{
              width: "300px",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Tytuł"
              variant="outlined"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Gatunek"
              variant="outlined"
              style={{ marginTop: "16px" }}
              value={type}
              onChange={(event) => setType(event.target.value)}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Ocena"
              variant="outlined"
              style={{ marginTop: "16px" }}
              value={score}
              onChange={(event) => setScore(event.target.value)}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Link do okładki"
              variant="outlined"
              style={{ marginTop: "16px" }}
              value={cover}
              onChange={(event) => setCover(event.target.value)}
            />
            <FormControlLabel
              style={{ marginTop: "12px", alignSelf: "flex-start" }}
              control={
                <Checkbox
                  label="Serial"
                  checked={isSerial}
                  onChange={(event) => setIsSerial(event.target.checked)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Serial"
            />
            <div
              style={{
                marginTop: "32px",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <CustomButton
                label="ZAPISZ"
                style={{
                  backgroundColor: "#555",
                  color: "white",
                  fontWeight: "500",
                }}
                onClick={() => {
                  create(
                    {
                      types: type.split(" "),
                      title: title,
                      score: Number(score),
                      coverLink: cover,
                      formatType: isSerial ? "Serial" : "Film",
                    },
                    CollectionTypes.FILM
                  );
                }}
              ></CustomButton>
            </div>
          </div>
        </div>
      </Modal>
    )
  );
}

export default NewFilmModal;
