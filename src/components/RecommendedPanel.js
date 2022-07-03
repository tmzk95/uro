import "./RecommendedPanel.css";
import AbsoluteText from "./AbsoluteText.js";
import CustomButton from "./CustomButton";
import BoxContainer from "./BoxContainer";
import FilmBox from "./FilmBox";
import NewFilmModal from "./NewFilmModal";
import { useState, useEffect } from "react";
import { getQuery } from "../utils/Repo";
import { onSnapshot } from "firebase/firestore";
import CollectionTypes from "../utils/CollectionTypes";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ShuffleOutlinedIcon from "@mui/icons-material/ShuffleOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import NewSongModal from "./NewSongModal";
import SongBox from "./SongBox";
import FilmsListModal from "./FilmsListModal";
import SongsListModal from "./SongsListModal";

function RecommendedPanel() {
  const [openNewFilmModal, setOpenNewFilmModal] = useState(false);
  const [openNewSongModal, setOpenNewSongModal] = useState(false);
  const [openFilmsListModal, setOpenFilmsListModal] = useState(false);
  const [openSongsListModal, setOpenSongsListModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [allFilms, setAllFilms] = useState([]);
  const [films, setFilms] = useState([]);
  const [songs, setSongs] = useState([]);

  const refFilms = getQuery(CollectionTypes.FILM, null);
  const refSongs = getQuery(CollectionTypes.SONG, null, 4);

  function getFilms() {
    setSpinner(true);
    onSnapshot(refFilms, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setFilms(findRandomItems(items));
      setAllFilms(items);
    });
  }

  function findRandomItems(items) {
    const randomIndexes = [];
    for (let i = 0; i < 4; i++) {
      let index = Math.round(Math.random() * (items.length - 1));
      if (randomIndexes.includes(index)) {
        i--;
      } else {
        randomIndexes.push(index);
      }
    }
    const itemsRandom = [];
    itemsRandom.push(items[randomIndexes[0]]);
    itemsRandom.push(items[randomIndexes[1]]);
    itemsRandom.push(items[randomIndexes[2]]);
    itemsRandom.push(items[randomIndexes[3]]);
    return itemsRandom;
  }

  function getSongs() {
    setSpinner(true);
    onSnapshot(refSongs, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setSongs(items);
    });
  }

  useEffect(() => {
    getFilms();
    getSongs();
  }, []);

  function shuffleFilms() {
    setFilms(findRandomItems(allFilms));
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "10px",
        }}
      >
        <AddBoxIcon
          style={{
            marginLeft: "26px",
            fontSize: "30px",
            cursor: "pointer",
            color: "#555",
          }}
          onClick={() => {
            setOpenNewFilmModal(true);
          }}
        ></AddBoxIcon>
        <ShuffleOutlinedIcon
          label="Losuj"
          style={{
            marginLeft: "6px",
            fontSize: "30px",
            cursor: "pointer",
            color: "#555",
          }}
          onClick={() => shuffleFilms()}
        ></ShuffleOutlinedIcon>
        <ListAltOutlinedIcon
          style={{
            marginLeft: "6px",
            fontSize: "30px",
            cursor: "pointer",
            color: "#555",
          }}
          onClick={() => setOpenFilmsListModal(true)}
        ></ListAltOutlinedIcon>
      </div>
      <div className="recommendedPanel">
        <BoxContainer>
          <div className="boxSectionTitle">Filmy</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "24px",
              marginRight: "24px",
            }}
          >
            {films.map((film) => (
              <FilmBox
                key={film.id}
                title={film.title}
                subtitle={film.types}
                imgSrc={film.coverLink}
                score={film.score}
                formatType={film.formatType}
              ></FilmBox>
            ))}
          </div>
        </BoxContainer>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "10px",
        }}
      >
        <AddBoxIcon
          style={{
            marginLeft: "26px",
            fontSize: "30px",
            cursor: "pointer",
            color: "#555",
          }}
          onClick={() => {
            setOpenNewSongModal(true);
          }}
        ></AddBoxIcon>
        <ShuffleOutlinedIcon
          label="Losuj"
          style={{
            marginLeft: "6px",
            fontSize: "30px",
            cursor: "pointer",
            color: "#555",
          }}
        ></ShuffleOutlinedIcon>
        <ListAltOutlinedIcon
          style={{
            marginLeft: "6px",
            fontSize: "30px",
            cursor: "pointer",
            color: "#555",
          }}
          onClick={() => setOpenSongsListModal(true)}
        ></ListAltOutlinedIcon>
      </div>
      <div className="recommendedPanel">
        <BoxContainer>
          <div className="boxSectionTitle">Muzyka</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "24px",
              marginRight: "24px",
            }}
          >
            {songs.map((song) => (
              <SongBox
                title={song.title}
                subtitle={song.artist}
                subtitleSecondary={song.album}
                imgSrc={song.coverLink}
                score={song.score}
              ></SongBox>
            ))}
          </div>
        </BoxContainer>
      </div>
      <NewFilmModal
        open={openNewFilmModal}
        onClose={() => setOpenNewFilmModal(false)}
      ></NewFilmModal>
      <FilmsListModal
        open={openFilmsListModal}
        onClose={() => setOpenFilmsListModal(false)}
      ></FilmsListModal>
      <NewSongModal
        open={openNewSongModal}
        onClose={() => setOpenNewSongModal(false)}
      ></NewSongModal>
      <SongsListModal
        open={openSongsListModal}
        onClose={() => setOpenSongsListModal(false)}
      ></SongsListModal>
    </div>
  );
}

export default RecommendedPanel;
