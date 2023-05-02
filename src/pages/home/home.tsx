import { Box, Typography, Fab } from "@mui/material";
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
        if (!data.completed) {
          list.push(data);
        }

        if (!companies.includes(data.company) && !data.completed) {
          console.log(data.company);
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

  return (
    <Box>
      <Box
        padding={"20px"}
        display={"flex"}
        flexDirection={"row"}
        width={"100%"}
      >
        {keys.map((key, i) => (
          <Box
            key={i}
            display={"flex"}
            flexDirection={"column"}
            flexWrap={"wrap"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Box
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
                    <TodoItem key={i} todoData={todo} />
                  ) : null}
                </>
              ))}
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
        closeModal={() => setOpen(false)}
      />
    </Box>
  );
}
