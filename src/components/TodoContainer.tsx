import { Box, Fab, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "../theme/main.module.css";
import { todoType } from "../types/todoType";
import TodoItem from "./TodoItem";
import AddIcon from "@mui/icons-material/Add";
import CreateModal from "./CreateModal";

interface IProps {
  keys: string[];
  todos: todoType[];
  complete: boolean;
}

const TodoContainer = ({ keys, todos, complete }: IProps) => {
  const [open, setOpen] = useState(false);
  const addNewTodo = (currentKey: string | undefined) => {
    setOpen(true);
  };
  return (
    <Box>
      <Box padding={"30px"}>
        <Typography
          variant="h3"
          color={`${styles.textBlue}`}
          textAlign={"center"}
        >
          {complete ? "Complete Tasks" : "Incomplete Tasks"}
        </Typography>
      </Box>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
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
            width={"80%"}
            margin={"auto"}
            marginBottom={"30px"}
          >
            <Box padding={"20px"} width={"100%"}>
              <Typography
                marginBottom={"10px"}
                textAlign={"center"}
                variant="h5"
                color="ThreeDShadow"
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

      {!complete ? (
        <>
          <Fab
            style={{
              position: "sticky",
              bottom: 16,
              right: 20,
              left: 16,
            }}
            color="primary"
            onClick={() => addNewTodo(undefined)}
            aria-label="add"
          >
            <AddIcon />
          </Fab>
          <CreateModal
            companies={keys}
            openModal={open}
            closeModal={() => setOpen(false)}
          />
        </>
      ) : null}
    </Box>
  );
};

export default TodoContainer;
