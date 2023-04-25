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
import { useEffect, useState } from "react";
import { useAuth } from "../../providers/authPorvider";
import { todoType } from "../../types/todoType";
import AddIcon from "@mui/icons-material/Add";

export function Home() {
  const db = getFirestore(app);
  const user = useAuth();
  const q = query(collection(db, "todos"), where("user", "==", user.user));
  const [todos, setTodos] = useState<todoType[] | []>([]);
  const [keys, setKeys] = useState<string[] | []>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: todoType[] = [];
      const companies: string[] = [];
      for (const todo of snapshot.docs) {
        const data = { ...(todo.data() as any), id: todo.id };

        list.push(data);
        if (!companies.includes(data.company)) {
          companies.push(data.company);
        }
      }

      setTodos(list);
      setKeys(companies);
    });
    return () => unsubscribe();
  }, [q]);

  return (
    <Box>
      <Box padding={"20px"} display={"flex"} width={"100%"}>
        {keys.map((key, i) => (
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
                  />
                ) : null}
              </>
            ))}
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
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
