import Modal from "./Modal";
import "./NewEventModal.css";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import CustomButton from "./CustomButton";
import { create } from "../utils/Repo";
import { format } from "date-fns";
import EventTypes from "../utils/EventTypes";
import CollectionTypes from "../utils/CollectionTypes";

function NewEventModal(props) {
  const [type, setType] = useState(EventTypes.TASK);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [dateValue, setDate] = useState(null);
  const [timeValue, setTimeValue] = useState(null);

  return (
    props.open && (
      <Modal onClose={() => props.onClose()}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="newEventModal">
            <div>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={dateValue}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Typ</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Typ"
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
                    setType(event.target.value);
                  }}
                >
                  <MenuItem value={EventTypes.TASK}>{EventTypes.TASK}</MenuItem>
                  <MenuItem value={EventTypes.BIRTHDAY}>
                    {EventTypes.BIRTHDAY}
                  </MenuItem>
                  <MenuItem value={EventTypes.WEDDING_ANNIVERSARY}>
                    {EventTypes.WEDDING_ANNIVERSARY}
                  </MenuItem>
                  <MenuItem value={EventTypes.NAME_DAY}>
                    {EventTypes.NAME_DAY}
                  </MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                id="outlined-basic"
                label={
                  type === EventTypes.TASK
                    ? "Temat"
                    : type === EventTypes.BIRTHDAY
                    ? "Solenizant"
                    : "Solenizanci"
                }
                variant="outlined"
                style={{ marginTop: "16px" }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontFamily: '"Lexend Deca", sans-serif',
                    fontWeight: "300",
                  },
                }}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Notatki"
                variant="outlined"
                style={{ marginTop: "16px" }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontFamily: '"Lexend Deca", sans-serif',
                    fontWeight: "300",
                  },
                }}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
              {type === EventTypes.TASK && (
                <div style={{ marginTop: "16px", width: "100%" }}>
                  <TimePicker
                    fullWidth
                    label="Godzina"
                    value={timeValue}
                    sx={{
                      "& input": {
                        fontFamily: '"Lexend Deca", sans-serif',
                        fontWeight: "300",
                      },
                    }}
                    onChange={(newValue) => {
                      setTimeValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              )}
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
                        type: type,
                        date: dateValue,
                        time: timeValue,
                        title: title,
                        notes: notes,
                        dateSortValue: format(dateValue, "MMdd"),
                      },
                      CollectionTypes.EVENT
                    );
                  }}
                ></CustomButton>
              </div>
            </div>
          </div>
        </LocalizationProvider>
      </Modal>
    )
  );
}

export default NewEventModal;
