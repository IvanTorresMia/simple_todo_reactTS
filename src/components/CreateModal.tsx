import {
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  Timestamp,
  addDoc,
  collection,
  getFirestore,
} from "firebase/firestore";
import React from "react";
import { useAuth } from "../providers/authPorvider";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { app } from "..";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  backgroundColor: "white",
  borderRadius: "10px",
  pt: 2,
  px: 4,
  pb: 3,
};
interface IProps {
  company: string | undefined;
  companies: string[] | [];
  openModal: boolean;
  closeModal: () => void;
}

const CreateModal = ({ company, companies, openModal, closeModal }: IProps) => {
  const user = useAuth();
  const db = getFirestore(app);
  const collectionRef = collection(db, "todos");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleSubmitTodo: SubmitHandler<FieldValues> = async (data) => {
    const submitData = {
      title: data.title,
      body: data.body,
      company: data.companies ? data.companies : data.company,
      completed: false,
      created: Timestamp.fromDate(new Date()),
      user: user.user,
    };

    await addDoc(collectionRef, submitData);
    closeModal();
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
            <Typography marginBottom={"40px"} variant="h5">
              Create a new todo
            </Typography>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              marginBottom={"20px"}
            >
              {companies.length === 0 ? null : (
                <Box>
                  <InputLabel id="demo-simple-select-label">
                    Select Existing Company
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
                <InputLabel id="demo-simple-select-label">
                  Add new company
                </InputLabel>
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

            <Box paddingBottom={"40px"}>
              <InputLabel id="demo-simple-select-label">Title</InputLabel>
              <Controller
                control={control}
                name="title"
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    style={{ marginBottom: "20px" }}
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
            <Box display={"flex"} justifyContent={"space-between"}>
              <Button type="button" variant="outlined" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
      z
    </React.Fragment>
  );
};

export default CreateModal;
