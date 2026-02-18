import { useState } from "react";
import List from "./components/List";
import Details from "./components/Details";
import "./App.css";

export default function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="container">
      <List onSelect={setSelectedUser} selectedUser={selectedUser} />
      <Details info={selectedUser} />
    </div>
  );
}
