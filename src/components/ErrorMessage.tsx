import { Box, FormHelperText } from "@mui/material";
import { FieldError } from "react-hook-form";

interface IProps {
  errorMessage?: FieldError | string;
}

export default function ({ errorMessage }: IProps) {
  return (
    <Box visibility={errorMessage ? "visible" : "hidden"}>
      <FormHelperText error={!!errorMessage}>
        {/* {errorMessage ?? " "} */}
      </FormHelperText>
    </Box>
  );
}
