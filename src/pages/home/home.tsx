import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { app } from "../..";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../providers/authPorvider";
import { todoType } from "../../types/todoType";
import TodoContainer from "../../components/TodoContainer";

export function Home() {
  const db = getFirestore(app);
  const user = useAuth();
  const q = query(collection(db, "todos"), where("user", "==", user.user));
  const [todos, setTodos] = useState<todoType[] | []>([]);
  const [keys, setKeys] = useState<string[] | []>([]);

  const saveUseEffect = useCallback(() => {
    onSnapshot(q, (snapshot) => {
      const list: todoType[] = [];
      const companies: string[] = [];
      for (const todo of snapshot.docs) {
        const data = { ...(todo.data() as any), id: todo.id };
        if (!data.completed) {
          list.push(data);
        }

        if (!companies.includes(data.company) && !data.completed) {
          console.log(data.company);
          companies.push(data.company);
        }
      }
      console.log("hello");
      setTodos(list);
      setKeys(companies);
    });
  }, []);
  useEffect(() => {
    return () => saveUseEffect();
  }, [saveUseEffect]);

  return <TodoContainer keys={keys} todos={todos} complete={false} />;
}
