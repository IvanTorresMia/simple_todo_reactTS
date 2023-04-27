import { Box, Typography, Fab, Button } from "@mui/material";
import TodoItem from "../../components/TodoItem";

import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { app } from "../..";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../providers/authPorvider";
import { todoType } from "../../types/todoType";
import AddIcon from "@mui/icons-material/Add";
import CreateModal from "../../components/CreateModal";

export function Home() {
  const db = getFirestore(app);
  const user = useAuth();
  const q = query(collection(db, "todos"), where("user", "==", user.user));
  const [todos, setTodos] = useState<todoType[] | []>([]);
  const [keys, setKeys] = useState<string[] | []>([]);
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState<string | undefined>();

  const saveUseEffect = useCallback(() => {
    onSnapshot(q, (snapshot) => {
      const list: todoType[] = [];
      const companies: string[] = [];
      for (const todo of snapshot.docs) {
        const data = { ...(todo.data() as any), id: todo.id };
        list.push(data);
        if (!companies.includes(data.company)) {
          companies.push(data.company);
        }
      }
      console.log("hello");
      setTodos(list);
      setKeys(companies);
    });
  }, []);
  useEffect(() => {
    return () => saveUseEffect();
  }, [saveUseEffect]);

  const addNewTodo = (currentKey: string | undefined) => {
    setKey(currentKey);
    setOpen(true);
  };

  const handleSubmit = () => {
    setOpen(false);

    if (key) {
      console.log("add to existing list");
    } else {
      console.log("add to new list");
    }
  };

  return (
    <Box>
      <Box padding={"20px"} display={"flex"} width={"100%"}>
        {keys.map((key, i) => (
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Box
              key={i}
              borderRight={"0.5px solid grey"}
              padding={"20px"}
              width={"100%"}
            >
              <Typography
                marginBottom={"10px"}
                textAlign={"center"}
                variant="subtitle1"
              >
                {key}
              </Typography>
              {todos.map((todo, i) => (
                <>
                  {todo?.company === key ? (
                    <TodoItem
                      key={i}
                      title={todo.title}
                      body={todo.body}
                      completed={todo.completed}
                      company={todo.company}
                    />
                  ) : null}
                </>
              ))}
            </Box>
            <Box textAlign={"center"}>
              <Button onClick={() => addNewTodo(key)} variant="contained">
                Add new
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
      <Fab
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        color="primary"
        onClick={() => addNewTodo(undefined)}
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      <CreateModal
        company={key}
        companies={keys}
        openModal={open}
        handleSubmit={() => handleSubmit()}
      />
    </Box>
  );
}
