import { useEffect, useState } from "react";

export default function List({ onSelect, selectedUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("/data/users.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка загрузки списка пользователей");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="list">Загрузка списка...</div>;
  }

  if (error) {
    return <div className="list error">{error}</div>;
  }

  return (
    <ul className="list">
      {users.map((user) => (
        <li
          key={user.id}
          className={selectedUser?.id === user.id ? "active" : ""}
          onClick={() => {
            // чтобы повторный клик по тому же пользователю
            // НЕ вызывал лишнего обновления
            if (selectedUser?.id !== user.id) {
              onSelect(user);
            }
          }}
        >
          {user.name}
        </li>
      ))}
    </ul>
  );
}
