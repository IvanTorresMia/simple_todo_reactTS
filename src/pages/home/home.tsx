import { Box } from "@mui/material";
import ListTable from "../../components/Table";

const mockData = [
  {
    title: "My First ever todo",
    body: "just do the todo",
    completed: false,
  },
  {
    title: "My Second ever todo",
    body: "just do the todo",
    completed: false,
  },
  {
    title: "My Third ever todo",
    body: "just do the todo",
    completed: false,
  },
  {
    title: "My Fourth ever todo",
    body: "just do the todo",
    completed: true,
  },
];

export function Home() {
  return (
    <Box padding={"20px"}>
      {mockData.map((data, i) => (
        <ListTable
          title={data.title}
          body={data.body}
          completed={data.completed}
        />
      ))}
    </Box>
  );
}
