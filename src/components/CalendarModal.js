import Modal from "./Modal";
import "./CalendarModal.css";
import { useCallback, useEffect, useState } from "react";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import startOfYear from "date-fns/startOfYear";
import endOfYear from "date-fns/endOfYear";
import { prepareMonthLists } from "../utils/CalendarUtils";
import { getQuery } from "../utils/Repo";
import { getDocs } from "firebase/firestore";
import collectionTypes from "../utils/CollectionTypes";
import { format } from "date-fns";
import FavoriteIcon from "@mui/icons-material/Favorite";
import eventTypes from "../utils/EventTypes";

const MONTH_NAMES = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

const DAY_NAMES = ["pon", "wt", "śr", "czw", "pt", "sob", "nd"];

function CalendarModal(props) {
  const [eventsByDate, setEventsByDate] = useState([]);
  const [dateSortValues, setDateSortValues] = useState([]);
  const [dateSortValuesTasks, setDateSortValuesTasks] = useState([]);
  const [months, setMonths] = useState([]);

  function getDays() {
    const daysOfYear = eachDayOfInterval({
      start: startOfYear(new Date()),
      end: endOfYear(new Date()),
    });
    setMonths(prepareMonthLists(daysOfYear));
  }

  async function getEvents() {
    let refEvents;
    let refTasks;

    refEvents = getQuery(collectionTypes.EVENT, null, null, [
      {
        field: "type",
        operator: "!=",
        value: "zadanie",
      },
    ]);

    refTasks = getQuery(collectionTypes.EVENT, null, null, [
      {
        field: "type",
        operator: "==",
        value: "zadanie",
      },
      {
        field: "date",
        operator: ">=",
        value: startOfYear(new Date()),
      },
    ]);

    const items = {};
    const querySnapshot = await getDocs(refEvents);
    const querySnapshot2 = await getDocs(refTasks);

    const dsvEvents = [];
    const dsvTasks = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (items[doc.data().dateSortValue]) {
        items[doc.data().dateSortValue] = [
          ...items[doc.data().dateSortValue],
          { ...doc.data(), id: doc.id },
        ];
      } else {
        items[doc.data().dateSortValue] = [{ ...doc.data(), id: doc.id }];
      }
      dsvEvents.push(doc.data().dateSortValue);
    });
    querySnapshot2.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (items[doc.data().dateSortValue]) {
        items[doc.data().dateSortValue] = [
          ...items[doc.data().dateSortValue],
          { ...doc.data(), id: doc.id },
        ];
      } else {
        items[doc.data().dateSortValue] = [{ ...doc.data(), id: doc.id }];
      }
      dsvTasks.push(doc.data().dateSortValue);
    });
    setEventsByDate(items);
    setDateSortValues(dsvEvents);
    setDateSortValuesTasks(dsvTasks);
  }

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      props.onClose();
    }
  }, []);

  useEffect(() => {
    getDays();
    getEvents();
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [props.open]);

  const todaySortValue = format(new Date(), "MMdd");

  return (
    props.open && (
      <Modal onClose={() => props.onClose()}>
        <div className="calendarModal">
          <div
            className="modalTitle"
            style={{ position: "absolute", top: "0", marginTop: "20px" }}
          >
            Kalendarz Wydarzeń
          </div>
          {months.map((month, index) => {
            return (
              <div
                key={`month${index}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "10px",
                }}
              >
                <div style={{ textAlign: "right", marginBottom: "10px" }}>
                  {MONTH_NAMES[index]}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  {DAY_NAMES.map((dayName) => (
                    <div
                      key={`day${dayName}`}
                      style={{
                        width: "30px",
                        margin: "2px",
                        color: "#aaa",
                        fontWeight: "200",
                        fontSize: "14px",
                      }}
                    >
                      {dayName}
                    </div>
                  ))}
                </div>
                {month.map((week, weekIndex) => (
                  <div
                    key={`day${index}${weekIndex}`}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    {week.map((day, dayIndex) => {
                      const daySortValue = format(day, "MMdd");
                      const tempEvent = dateSortValues.includes(daySortValue);
                      const tempTask =
                        dateSortValuesTasks.includes(daySortValue);

                      let background = "#e9e9e9";
                      if (eventsByDate[daySortValue]) {
                        const colors = [];
                        if (
                          tempEvent &&
                          eventsByDate[daySortValue].find(
                            (evt) => evt.type === eventTypes.BIRTHDAY
                          )
                        ) {
                          colors.push("#2a9d8f");
                        }
                        if (
                          tempEvent &&
                          eventsByDate[daySortValue].find(
                            (evt) => evt.type === eventTypes.WEDDING_ANNIVERSARY
                          )
                        ) {
                          colors.push("#aa4dab");
                        }
                        if (
                          tempEvent &&
                          eventsByDate[daySortValue].find(
                            (evt) => evt.type === eventTypes.NAME_DAY
                          )
                        ) {
                          colors.push("#6084ef");
                        }
                        if (tempTask) {
                          colors.push("#49616C");
                        }
                        if (colors.length === 1) {
                          background = colors[0];
                        } else if (colors.length === 2) {
                          background = `linear-gradient(90deg, ${colors[0]} 30%, ${colors[1]} 70%)`;
                        } else if (colors.length === 3) {
                          background = `linear-gradient(90deg, ${colors[0]} 20%, ${colors[1]} 40%, ${colors[1]} 60%, ${colors[2]} 80%)`;
                        } else if (colors.length === 4) {
                          background = `linear-gradient(90deg, ${colors[0]} 14%, ${colors[1]} 28%, ${colors[1]} 42%, ${colors[2]} 56%, ${colors[2]} 70%, ${colors[3]} 84%)`;
                        }
                      }

                      const outline =
                        todaySortValue === daySortValue
                          ? "#ed4681 solid 2px"
                          : "none";
                      const isAnniversary = daySortValue === "0718";

                      return (
                        <div
                          key={`day${index}${weekIndex}${dayIndex}`}
                          className="calendarDay"
                          style={{
                            cursor: "default",
                            fontWeight: "300",
                            width: "20px",
                            padding: "5px",
                            margin: "2px",
                            background: background,
                            color: tempEvent || tempTask ? "white" : "inherit",
                            opacity: day !== 0 ? 1 : 0,
                            outline: outline,
                            outlineOffset: "1px",
                          }}
                        >
                          {isAnniversary && (
                            <div>
                              <div
                                style={{
                                  position: "absolute",
                                  color: "#9d0601",
                                  transform:
                                    "translate(-12px, -10px) rotate(10deg)",
                                }}
                              >
                                <FavoriteIcon
                                  style={{ fontSize: "22px" }}
                                ></FavoriteIcon>
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  color: "#ef3671",
                                  transform:
                                    "translate(-10px, -8px) rotate(10deg)",
                                }}
                              >
                                <FavoriteIcon
                                  style={{ fontSize: "18px" }}
                                ></FavoriteIcon>
                              </div>
                            </div>
                          )}
                          {(tempEvent || tempTask) && (
                            <div className="calendarDayTooltip">
                              {eventsByDate[daySortValue].map((event) => (
                                <div
                                  style={{ padding: "4px" }}
                                  key={`calendarEvent${event.id}`}
                                >
                                  <span>{event.title}</span>
                                  <span
                                    style={{
                                      fontWeight: "200",
                                      marginLeft: "20px",
                                    }}
                                  >
                                    {event.type}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                          {day !== 0 ? day.getDate() : 0}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </Modal>
    )
  );
}

export default CalendarModal;
