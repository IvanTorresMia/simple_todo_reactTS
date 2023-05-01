import {
  Button,
  Checkbox,
  TextField,
  Grid,
  FormLabel,
  Box,
} from "@mui/material";
import { Timestamp, collection, getFirestore, updateDoc } from "firebase/firestore";
import { useState } from "react";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { app } from "..";
import { useAuth } from "../providers/authPorvider";

interface IProps {
  title: string;
  body: string;
  completed: boolean;
  company: string;
}

const TodoItem = ({ title, body, completed }: IProps) => {
  const [displayBody, setDisplayBody] = useState(false);
  const db = getFirestore(app);
  const user = useAuth();
  const collectionRef = collection(db, "todos")
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: title,
      body: body,
      completed: completed,
    },
  });

  const handleEditTodo: SubmitHandler<any> = async (data) => {
    console.log("hello");
    console.log(data);
    const submitData = {
      
    }

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
