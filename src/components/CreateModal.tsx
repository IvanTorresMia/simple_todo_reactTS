import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

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
  handleSubmit: () => void;
}

const CreateModal = ({
  company,
  companies,
  openModal,
  handleSubmit,
}: IProps) => {
  return (
    <React.Fragment>
      <Modal
        open={openModal}
        // onClose={handleSubmit}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">{company}</h2>
          <p id="child-modal-description">Hello world</p>
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
      </Modal>
      z
    </React.Fragment>
  );
};

export default CreateModal;
