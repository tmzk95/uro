import Modal from "./Modal";
import "./FilmsListModal.css";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import CustomButton from "./CustomButton";
import { create, getQuery } from "../utils/Repo";
import CollectionTypes from "../utils/CollectionTypes";
import { getDocs } from "firebase/firestore";
import FilmsListItem from "./FilmsListItem";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function FilmsListModal(props) {
  const [spinner, setSpinner] = useState(false);
  const [films, setFilms] = useState([]);
  const [typeFilter, setTypeFilter] = useState("Dowolny");
  const [formatFilter, setFormatFilter] = useState("Dowolny");
  const [queryIndex, setQueryIndex] = useState(0);
  const [lastFilmByPage, setLastFilmByPage] = useState({});

  async function getFilms() {
    if (!props.open) {
      return;
    }
    setSpinner(true);
    let refFilms;
    let whereClauses = [];
    if (typeFilter !== "Dowolny") {
      whereClauses.push({
        field: "types",
        operator: "array-contains",
        value: typeFilter,
      });
    }
    if (formatFilter !== "Dowolny") {
      whereClauses.push({
        field: "formatType",
        operator: "==",
        value: formatFilter,
      });
    }
    refFilms = getQuery(
      CollectionTypes.FILM,
      typeFilter === "Dowolny" && formatFilter === "Dowolny"
        ? {
            field: "score",
            direction: "desc",
          }
        : null,
      11,
      whereClauses,
      lastFilmByPage[queryIndex - 1] || null
    );

    const items = [];
    const querySnapshot = await getDocs(refFilms);
    console.log(querySnapshot.length);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      items.push({ ...doc.data(), id: doc.id });
      setLastFilmByPage({
        ...lastFilmByPage,
        [queryIndex]: doc,
      });
    });
    setFilms(items);
  }

  useEffect(() => {
    getFilms();
  }, [formatFilter, typeFilter, queryIndex, props.open]);

  return (
    props.open && (
      <Modal onClose={() => props.onClose()}>
        <div className="filmsModalContainer">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className="modalTitle">Subiektywny Ranking</div>
            <div>
              <FormControl
                size="small"
                style={{
                  marginRight: "16px",
                  minWidth: "120px",
                  textAlign: "left",
                }}
              >
                <InputLabel id="demo-simple-select-label">Format</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formatFilter}
                  label="Format"
                  sx={{
                    "& .MuiSelect-select": {
                      fontFamily: '"Lexend Deca", sans-serif',
                      fontWeight: "300",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        "& .MuiMenuItem-root": {
                          fontFamily: '"Lexend Deca", sans-serif',
                          fontWeight: "300",
                        },
                      },
                    },
                  }}
                  onChange={(event) => {
                    setQueryIndex(0);
                    setLastFilmByPage({});
                    setFormatFilter(event.target.value);
                  }}
                >
                  <MenuItem value="Dowolny">Dowolny</MenuItem>
                  <MenuItem value="Film">Film</MenuItem>
                  <MenuItem value="Serial">Serial</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                size="small"
                style={{
                  marginRight: "16px",
                  minWidth: "150px",
                  textAlign: "left",
                }}
              >
                <InputLabel id="demo-simple-select-label">Gatunek</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={typeFilter}
                  label="Gatunek"
                  sx={{
                    "& .MuiSelect-select": {
                      fontFamily: '"Lexend Deca", sans-serif',
                      fontWeight: "300",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        "& .MuiMenuItem-root": {
                          fontFamily: '"Lexend Deca", sans-serif',
                          fontWeight: "300",
                        },
                      },
                    },
                  }}
                  onChange={(event) => {
                    setQueryIndex(0);
                    setLastFilmByPage({});
                    setTypeFilter(event.target.value);
                  }}
                >
                  <MenuItem value="Dowolny">Dowolny</MenuItem>
                  <MenuItem value="Akcja">Akcja</MenuItem>
                  <MenuItem value="Animowany">Animowany</MenuItem>
                  <MenuItem value="Dramat">Dramat</MenuItem>
                  <MenuItem value="Komedia">Komedia</MenuItem>
                  <MenuItem value="Kryminał">Kryminał</MenuItem>
                  <MenuItem value="Sci-Fi">Sci-Fi</MenuItem>
                  <MenuItem value="Thriller">Thriller</MenuItem>
                  <MenuItem value="Western">Western</MenuItem>
                  <MenuItem value="Więzienny">Więzienny</MenuItem>
                  <MenuItem value="Wojenny">Wojenny</MenuItem>
                  <MenuItem value="Zagadka">Zagadka</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="filmsListModal">
            {films &&
              films
                .filter((film, index) => index < 10)
                .map((film) => (
                  <FilmsListItem
                    key={film.id}
                    title={film.title}
                    types={film.types}
                    score={film.score}
                    coverLink={film.coverLink}
                    formatType={film.formatType}
                  ></FilmsListItem>
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
              className={films && films.length > 10 ? "" : "disabled"}
              onClick={() => {
                if (films && films.length > 10) {
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

export default FilmsListModal;
