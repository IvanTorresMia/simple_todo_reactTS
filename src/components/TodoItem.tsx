import {
  Button,
  Checkbox,
  TextField,
  Grid,
  FormLabel,
  Box,
} from "@mui/material";
import {
  Timestamp,
  deleteDoc,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { useCallback, useState } from "react";

import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { app } from "..";
import { useAuth } from "../providers/authPorvider";
import { todoType } from "../types/todoType";

interface IProps {
  todoData: todoType;
}

const TodoItem = ({ todoData }: IProps) => {
  const [displayBody, setDisplayBody] = useState<boolean>(false);
  const db = getFirestore(app);
  const user = useAuth();
  const docRef = doc(db, "todos", todoData.id);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: todoData.title,
      body: todoData.body,
      completed: todoData.completed,
    },
  });

  const handleEditTodo: SubmitHandler<FieldValues> = async (data) => {
    const submitData = {
      title: data.title,
      body: data.body,
      company: todoData.company,
      completed: data.completed,
      created: Timestamp.fromDate(new Date()),
      user: user.user,
    };

    await updateDoc(doc(db, "todos", todoData.id), submitData);
  };

  const handleDelete = useCallback(async () => {
    await deleteDoc(docRef);
  }, [docRef]);

  return (
    <Grid
      display={"flex"}
      justifyContent={"space-between"}
      marginBottom={"30px"}
      width={"100%"}
      flexDirection={"column"}
      borderBottom={"0.5px solid grey"}
    >
      <form onSubmit={handleSubmit(handleEditTodo)}>
        {/* Title */}
        <Grid
          display={"flex"}
          flexDirection={"column"}
          marginBottom={"10px"}
          width={"100%"}
        >
          <FormLabel>Title</FormLabel>
          <Controller
            control={control}
            name="title"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <TextField
                helperText={errors.title?.message?.toString()}
                name={field.name}
                value={field.value}
                onFocus={() => setDisplayBody(true)}
                onChange={(value) => {
                  field.onChange(value);
                }}
              />
            )}
          />
        </Grid>
        {/* body */}
        {displayBody ? (
          <Grid display={"flex"} flexDirection={"column"} marginBottom={"10px"}>
            <FormLabel>Body</FormLabel>
            <Controller
              control={control}
              name="body"
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <TextField
                  helperText={errors.body?.message?.toString()}
                  name={field.name}
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              )}
            />
          </Grid>
        ) : null}

        {/* completed */}
        <Grid
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          marginBottom={"10px"}
        >
          <Box>
            <FormLabel>Completed</FormLabel>
            <Controller
              control={control}
              name="completed"
              rules={{ required: false }}
              render={({ field }) => (
                <Checkbox
                  name={field.name}
                  value={field.value}
                  defaultChecked={todoData.completed}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              )}
            />
          </Box>
          <Box>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </Grid>
        <Box>
          {todoData.completed ? (
            <Box marginBottom={"20px"}>
              <Button onClick={handleDelete} color="error" variant="outlined">
                Delete
              </Button>
            </Box>
          ) : null}
        </Box>
      </form>
    </Grid>
  );
};

export default TodoItem;
