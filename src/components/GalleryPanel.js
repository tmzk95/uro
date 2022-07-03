import "./GalleryPanel.css";
import AbsoluteText from "./AbsoluteText.js";
import CustomButton from "./CustomButton";
import BoxContainer from "./BoxContainer";
import PhotoBox from "./PhotoBox";
import { createRef, useEffect, useRef, useState } from "react";
import { gapi } from "gapi-script";
import TigerSpinner from "../utils/TigerSpinner";
import { Alert, Collapse, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const scope = [
  "https://www.googleapis.com/auth/photoslibrary",
  "https://www.googleapis.com/auth/photoslibrary.readonly",
];

function GalleryPanel(props) {
  const [spinner, setSpinner] = useState(false);
  const [specificSpinner, setSpecificSpinner] = useState("");
  const [albums, setAlbums] = useState(null);
  const [photos, setPhotos] = useState({});
  const [tokenByPage, setTokenByPage] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [refs, setRefs] = useState(null);
  const [currentRef, setCurrentRef] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  function clearData() {
    setSpinner(false);
    setSpecificSpinner("");
    setAlbums(null);
    setPhotos({});
    setTokenByPage({});
    setCurrentPage(0);
    setRefs(null);
    setCurrentRef(null);
    setOpenAlert(false);
  }

  function getAllPhotoGoogleApi() {
    setSpinner(true);
    setOpenAlert(false);
    gapi.client
      .request({
        path: "https://photoslibrary.googleapis.com/v1/albums",
        scope: scope,
        method: "GET",
      })
      .then(
        function (response) {
          setAlbums(response.result.albums);
          setSpinner(false);
          setRefs(
            response.result.albums.reduce((acc, value) => {
              acc[value.id] = createRef();
              return acc;
            }, {})
          );
        },
        function (reason) {
          setSpinner(false);
          if (reason.result?.error?.status === "UNAUTHENTICATED") {
            setOpenAlert(true);
          }
        }
      );
  }

  function getAlbumPhotos(albumId, page = 0, titleRef) {
    setSpecificSpinner(albumId);
    gapi.client
      .request({
        path: "https://photoslibrary.googleapis.com/v1/mediaItems:search",
        scope: scope,
        method: "POST",
        contentType: "application/json",
        body: {
          pageSize: 6,
          albumId: albumId,
          pageToken: tokenByPage && tokenByPage[page] ? tokenByPage[page] : "",
        },
      })
      .then(
        function (response) {
          console.log(response);
          setPhotos({ [albumId]: response.result.mediaItems });
          if (response.result.nextPageToken) {
            setTokenByPage({
              ...tokenByPage,
              [page + 1]: response.result.nextPageToken,
            });
          }
          setSpecificSpinner("");
          if (refs && refs[albumId]) {
            setCurrentRef(refs[albumId]);
          }
        },
        function (reason) {
          console.log(reason);
        }
      );
  }

  function goToNextPage(albumId) {
    getAlbumPhotos(albumId, currentPage + 1);
    setCurrentPage(currentPage + 1);
  }

  function goToPreviousPage(albumId) {
    getAlbumPhotos(albumId, currentPage - 1);
    setCurrentPage(currentPage - 1);
  }

  function getAlbum(albumId, titleRef) {
    setCurrentPage(0);
    setTokenByPage({});
    getAlbumPhotos(albumId, 0, titleRef);
  }

  useEffect(() => {
    if (props.authorization) {
      albums == null && getAllPhotoGoogleApi();
    } else {
      clearData();
    }
  }, [props.authorization]);

  useEffect(() => {
    currentRef &&
      currentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }, [currentRef]);

  return (
    <div>
      <div className="galleryPanel">
        <BoxContainer>
          <div className="boxSectionTitle">Albumy</div>
          {spinner && <TigerSpinner />}
          <div style={{ padding: "20px 20px 0px 20px" }}>
            <Collapse in={openAlert}>
              <Alert
                severity="info"
                sx={{
                  mb: 2,
                }}
              >
                Zaloguj się na konto Google aby zobaczyć galerię
              </Alert>
            </Collapse>
          </div>
          {albums &&
            albums.map((album) => {
              return (
                <div>
                  <div
                    ref={refs[album.id]}
                    style={{
                      marginTop: "-40px",
                      position: "absolute",
                    }}
                  ></div>
                  <div>
                    <div
                      onClick={() => getAlbum(album.id)}
                      className={`albumTitle ${
                        photos && photos[album.id] ? "albumSelected" : ""
                      }`}
                    >
                      <div className="albumHeader">{album.title}</div>
                      <div className="albumSubtitle">
                        {album.mediaItemsCount}
                        {album.mediaItemsCount
                          ? album.mediaItemsCount == 1
                            ? " zdjęcie"
                            : !(
                                album.mediaItemsCount % 100 > 10 &&
                                album.mediaItemsCount % 100 < 20
                              ) &&
                              (album.mediaItemsCount % 10 == 2 ||
                                album.mediaItemsCount % 10 == 3 ||
                                album.mediaItemsCount % 10 == 4)
                            ? " zdjęcia"
                            : " zdjęć"
                          : ""}
                      </div>
                    </div>
                  </div>
                  {specificSpinner === album.id && (
                    <div
                      style={{
                        position: "absolute",
                        width: "810px",
                        marginTop: "-50px",
                      }}
                    >
                      <TigerSpinner />
                    </div>
                  )}
                  {photos && photos[album.id] && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "7px",
                        justifyContent: "space-between",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        paddingTop: "40px",
                        paddingBottom: "20px",
                        marginLeft: "20px",
                        marginRight: "20px",
                        marginBottom: "20px",
                        backgroundColor: "#eee",
                      }}
                    >
                      {photos[album.id].map((photo) => {
                        if (photo.mimeType === "image/jpeg") {
                          return <PhotoBox imgSrc={photo.baseUrl}></PhotoBox>;
                        }
                        if (photo.mimeType === "video/mp4") {
                          return (
                            <div
                              style={{
                                width: "245px",
                                backgroundColor: "#222",
                              }}
                            >
                              <video
                                style={{ display: "block", width: "245px" }}
                                height="245px"
                                controls
                                src={`${photo.baseUrl}=dv`}
                              ></video>
                            </div>
                          );
                        }
                      })}
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "center",
                          marginTop: "20px",
                        }}
                      >
                        {currentPage > 0 && (
                          <div
                            style={{ marginRight: "10px", cursor: "pointer" }}
                            onClick={() => goToPreviousPage(album.id)}
                          >
                            {"<"} Poprzednie
                          </div>
                        )}
                        {tokenByPage && tokenByPage[currentPage + 1] && (
                          <div
                            style={{ marginLeft: "10px", cursor: "pointer" }}
                            onClick={() => goToNextPage(album.id)}
                          >
                            Następne {">"}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </BoxContainer>
      </div>
    </div>
  );
}

export default GalleryPanel;
