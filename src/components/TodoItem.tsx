import {
  Button,
  Checkbox,
  TextField,
  Grid,
  FormLabel,
  Box,
} from "@mui/material";
import { Timestamp, doc, getFirestore, updateDoc } from "firebase/firestore";
import { useState } from "react";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { app } from "..";
import { useAuth } from "../providers/authPorvider";
import { todoType } from "../types/todoType";

interface IProps {
  todoData: todoType;
}

const TodoItem = ({ todoData }: IProps) => {
  const [displayBody, setDisplayBody] = useState(false);
  const db = getFirestore(app);
  const user = useAuth();

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

  const handleEditTodo: SubmitHandler<any> = async (data) => {
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

  return (
    <Grid
      display={"flex"}
      justifyContent={"center"}
      marginBottom={"30px"}
      width={"50%"}
      flexDirection={"column"}
      margin={"auto"}
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
      </form>
    </Grid>
  );
};

export default TodoItem;
