import "./TodosPanel.css";
import Box from "./Box.js";
import AbsoluteText from "./AbsoluteText.js";
import CustomButton from "./CustomButton";
import { getQuery, create } from "../utils/Repo";
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
import Todo from "./Todo";
import BoxContainer from "./BoxContainer";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Checkbox, FormControlLabel } from "@mui/material";

function TodosPanel() {
  const [spinner, setSpinner] = useState(false);
  const [todos, setTodos] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const ref = getQuery(CollectionTypes.TODO, {
    field: "timestamp",
    direction: "desc",
  });

  function getTodos() {
    setSpinner(true);
    onSnapshot(ref, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setTodos(items);
      console.log("GET TODOS");
    });
  }

  useEffect(() => {
    getTodos();
  }, []);

  function addNewTodo() {
    create(
      {
        description: "",
        checked: false,
        timestamp: Date.now(),
      },
      CollectionTypes.TODO
    );
  }

  return (
    <div>
      <div className="todosPanel">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
              addNewTodo();
            }}
          ></AddBoxIcon>
          <FormControlLabel
            style={{ marginRight: "40px" }}
            control={
              <Checkbox
                label="Pokaż wykonane"
                checked={showAll}
                onChange={(event) => setShowAll(event.target.checked)}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Pokaż wykonane"
          />
        </div>
        {todos
          .filter((todo) => (showAll ? true : !todo.checked))
          .map((todo) => {
            return (
              <Todo
                key={todo.id}
                id={todo.id}
                checked={todo.checked}
                description={todo.description}
              ></Todo>
            );
          })}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "30px",
          }}
        ></div>
      </div>
    </div>
  );
}

export default TodosPanel;
