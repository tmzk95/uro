import Modal from "./Modal";
import "./NewSongModal.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import CustomButton from "./CustomButton";
import { create } from "../utils/Repo";
import CollectionTypes from "../utils/CollectionTypes";

function NewSongModal(props) {
  const [album, setAlbum] = useState("");
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [score, setScore] = useState("");
  const [cover, setCover] = useState("");

  return (
    props.open && (
      <Modal onClose={() => props.onClose()}>
        <div className="newSongModal">
          <div>
            <img
              width="200px"
              src={
                cover !== ""
                  ? cover
                  : "https://www.discrepancy-records.com.au/assets/themes/dr-20220606-bfhe/img/placeholder.png"
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
              label="Wykonawca"
              variant="outlined"
              style={{ marginTop: "16px" }}
              value={artist}
              onChange={(event) => setArtist(event.target.value)}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Album"
              variant="outlined"
              style={{ marginTop: "16px" }}
              value={album}
              onChange={(event) => setAlbum(event.target.value)}
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
                      album: album,
                      artist: artist,
                      title: title,
                      score: score,
                      coverLink: cover,
                    },
                    CollectionTypes.SONG
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

export default NewSongModal;
