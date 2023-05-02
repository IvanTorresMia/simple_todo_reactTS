import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { app } from "../..";
import { useAuth } from "../../providers/authPorvider";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { todoType } from "../../types/todoType";
import TodoItem from "../../components/TodoItem";

export const Completed = () => {
  const db = getFirestore(app);
  const user = useAuth();
  const q = query(collection(db, "todos"), where("user", "==", user.user));
  const [todos, setTodos] = useState<todoType[] | []>([]);
  const [keys, setKeys] = useState<string[] | []>([]);

  const saveUseEffect = useCallback(() => {
    onSnapshot(q, (snapshot) => {
      const list: todoType[] = [];
      const companies: string[] = [];
      for (const todo of snapshot.docs) {
        const data = { ...(todo.data() as any), id: todo.id };
        console.log(data);
        if (data.completed) {
          list.push(data);
        }

        if (!companies.includes(data.company) && data.completed) {
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
    </Box>
  );
};
