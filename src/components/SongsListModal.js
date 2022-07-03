import Modal from "./Modal";
import "./SongsListModal.css";
import { useEffect, useState } from "react";
import { getQuery } from "../utils/Repo";
import CollectionTypes from "../utils/CollectionTypes";
import { getDocs } from "firebase/firestore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SongsListItem from "./SongsListItem";

function SongsListModal(props) {
  const [spinner, setSpinner] = useState(false);
  const [songs, setSongs] = useState([]);
  const [queryIndex, setQueryIndex] = useState(0);
  const [lastSongByPage, setLastSongByPage] = useState({});

  async function getSongs() {
    if (!props.open) {
      return;
    }
    setSpinner(true);

    const refSongs = getQuery(
      CollectionTypes.SONG,
      {
        field: "title",
        direction: "asc",
      },
      11,
      null,
      lastSongByPage[queryIndex - 1] || null
    );

    const items = [];
    const querySnapshot = await getDocs(refSongs);
    console.log(querySnapshot.length);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      items.push({ ...doc.data(), id: doc.id });
      setLastSongByPage({
        ...lastSongByPage,
        [queryIndex]: doc,
      });
    });
    setSongs(items);
  }

  useEffect(() => {
    getSongs();
  }, [queryIndex, props.open]);

  return (
    props.open && (
      <Modal onClose={() => props.onClose()}>
        <div className="songsModalContainer">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className="modalTitle">Subiektywny Ranking</div>
          </div>
          <div className="songsListModal">
            {songs &&
              songs
                .filter((song, index) => index < 10)
                .map((song) => (
                  <SongsListItem
                    key={song.id}
                    title={song.title}
                    artist={song.artist}
                    album={song.album}
                    score={song.score}
                    coverLink={song.coverLink}
                  ></SongsListItem>
                ))}
          </div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronLeftIcon
              className={queryIndex > 0 ? "" : "disabled"}
              onClick={() => {
                if (queryIndex > 0) {
                  setQueryIndex(queryIndex - 1);
                }
              }}
              style={{
                marginRight: "10px",
                fontSize: "30px",
                cursor: "pointer",
              }}
            ></ChevronLeftIcon>
            <div>{queryIndex + 1}</div>
            <ChevronRightIcon
              className={songs && songs.length > 10 ? "" : "disabled"}
              onClick={() => {
                if (songs && songs.length > 10) {
                  setQueryIndex(queryIndex + 1);
                }
              }}
              style={{
                marginLeft: "10px",
                fontSize: "30px",
                cursor: "pointer",
              }}
            ></ChevronRightIcon>
          </div>
        </div>
      </Modal>
    )
  );
}

export default SongsListModal;
