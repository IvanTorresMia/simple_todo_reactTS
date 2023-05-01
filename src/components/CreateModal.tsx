import {
  Button,
  FormLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  Timestamp,
  addDoc,
  collection,
  getFirestore,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../providers/authPorvider";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { app } from "..";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  backgroundColor: "white",
  pt: 2,
  px: 4,
  pb: 3,
};
interface IProps {
  company: string | undefined;
  companies: string[] | [];
  openModal: boolean;
}

const CreateModal = ({ company, companies, openModal }: IProps) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const user = useAuth();
  const db = getFirestore(app);
  const collectionRef = collection(db, "todos");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleSubmitTodo: SubmitHandler<any> = async (data) => {
    console.log("hello");
    console.log(data);

    const submitData = {
      title: data.title,
      body: data.body,
      company: data.companies ? data.companies : data.company,
      completed: false,
      created: Timestamp.fromDate(new Date()),
      user: user.user,
    };

    await addDoc(collectionRef, submitData);
  };

  return (
    <React.Fragment>
      <Modal
        open={openModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <form onSubmit={handleSubmit(handleSubmitTodo)}>
          <Box
            sx={{ ...style, width: 400 }}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <h2 id="child-modal-title">Simple List</h2>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              marginBottom={"20px"}
            >
              {companies.length === 0 ? null : (
                <Box>
                  <InputLabel id="demo-simple-select-label">
                    Companies
                  </InputLabel>
                  <Controller
                    control={control}
                    name="companies"
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Select
                        name={field.name}
                        value={field.value}
                        fullWidth
                        defaultValue={""}
                        id="demo-simple-select"
                        labelId="demo-simple-select-label"
                        onChange={(value) => {
                          field.onChange(value);
                          console.log(value.target.value);
                        }}
                      >
                        {companies.map((company, i) => (
                          <MenuItem key={i} value={company}>
                            {company}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Box>
              )}
              <Box>
                <InputLabel id="demo-simple-select-label">Company</InputLabel>
                <Controller
                  control={control}
                  name="company"
                  rules={{ required: false }}
                  render={({ field }) => (
                    <TextField
                      helperText={errors.company?.message?.toString()}
                      name={field.name}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </Box>
            </Box>

            <Box marginBottom={"20px"}>
              <InputLabel id="demo-simple-select-label">Title</InputLabel>
              <Controller
                control={control}
                name="title"
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    name={field.name}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />

              <InputLabel id="demo-simple-select-label">Body</InputLabel>
              <Controller
                control={control}
                name="body"
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    name={field.name}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
            </Box>

            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </Modal>
      z
    </React.Fragment>
  );
};

export default CreateModal;
