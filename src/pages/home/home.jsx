import { getAuth, signOut } from "firebase/auth";

export function Home() {
  const auth = getAuth();

  return (
    <div>
      <button onClick={() => signOut(auth)}>Sign out</button>
    </div>
  );
}
