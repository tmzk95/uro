import "./EventPanel.css";
import Box from "./Box.js";
import AbsoluteText from "./AbsoluteText.js";
import CustomButton from "./CustomButton";
import { getQuery } from "../utils/Repo";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import NewEventModal from "./NewEventModal";
import {
  format,
  differenceInCalendarDays,
  differenceInYears,
  setYear,
  getYear,
} from "date-fns";
import { pl } from "date-fns/esm/locale";
import CollectionTypes from "../utils/CollectionTypes";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarModal from "./CalendarModal";
import eventTypes from "../utils/EventTypes";

function EventPanel() {
  const [openNewEventModal, setOpenNewEventModal] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [events, setEvents] = useState([]);

  const ref = getQuery(CollectionTypes.EVENT, { field: "dateSortValue" }, 5, [
    {
      field: "dateSortValue",
      operator: ">=",
      value: format(new Date(), "MMdd"),
    },
  ]);

  function getEvents() {
    setSpinner(true);
    onSnapshot(ref, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setEvents(items);
    });
  }

  useEffect(() => {
    getEvents();
  }, []);

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
            setOpenNewEventModal(true);
          }}
        ></AddBoxIcon>
        <CalendarMonthIcon
          style={{
            marginLeft: "6px",
            fontSize: "28px",
            cursor: "pointer",
            color: "#555",
          }}
          onClick={() => setOpenCalendar(true)}
        ></CalendarMonthIcon>
      </div>
      <div className="eventPanel">
        {events.map((event) => {
          const dateInThisYear = setYear(
            event.date.toDate(),
            getYear(new Date())
          );
          const daysRemaining = differenceInCalendarDays(
            dateInThisYear,
            new Date()
          );
          const yearsSince = differenceInYears(
            dateInThisYear,
            event.date.toDate()
          );
          let textColor;
          if (event.type === eventTypes.BIRTHDAY) {
            textColor = "green";
          } else if (event.type === eventTypes.WEDDING_ANNIVERSARY) {
            textColor = "purple";
          } else if (event.type === eventTypes.NAME_DAY) {
            textColor = "blue";
          } else {
            textColor = "darkGreen";
          }
          return (
            <Box
              key={event.id}
              primaryText={`${daysRemaining > 0 ? daysRemaining : "DZIŚ"}`}
              onlyPrimary={daysRemaining <= 0}
              secondaryText={event.title}
              topText={format(dateInThisYear, "dd MMMM", { locale: pl })}
              textColor={textColor}
              details={{
                id: event.id,
                number: yearsSince,
                type: event.type,
                notes: event.notes,
                tags: event.tags || [],
              }}
            ></Box>
          );
        })}
      </div>
      <NewEventModal
        open={openNewEventModal}
        onClose={() => setOpenNewEventModal(false)}
      ></NewEventModal>
      <CalendarModal
        open={openCalendar}
        onClose={() => setOpenCalendar(false)}
      ></CalendarModal>
    </div>
  );
}

export default EventPanel;
