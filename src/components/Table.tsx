import {
  Button,
  Checkbox,
  TextField,
  Grid,
  FormLabel,
  Box,
} from "@mui/material";

import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface IProps {
  title: string;
  body: string;
  completed: boolean;
}

const ListTable = ({ title, body, completed }: IProps) => {
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

  const handleSubmitTodo: SubmitHandler<any> = async (data) => {
    console.log("hello");
    console.log(data);
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
      <form onSubmit={handleSubmit(handleSubmitTodo)}>
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
                onChange={(value) => {
                  field.onChange(value);
                }}
              />
            )}
          />
        </Grid>
        {/* body */}
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

export default ListTable;
