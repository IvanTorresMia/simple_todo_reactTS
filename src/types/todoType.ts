import { Timestamp } from "firebase/firestore";

export type todoType = {
  body: string;
  title: string;
  completed: boolean;
  created: Timestamp;
  user: string;
  company: string;
  id: string;
};
