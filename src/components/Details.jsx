import { useEffect, useState } from "react";
import Spinner from "./Spinner";

export default function Details({ info }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!info) {
      setDetails(null);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${import.meta.env.BASE_URL}data/${info.id}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных пользователя");
        }
        return response.json();
      })
      .then((data) => {
        setDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [info?.id]);

  if (!info) {
    return <div className="details empty">Выберите пользователя</div>;
  }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!details) {
    return null;
  }

  return (
    <div className="details">
      <img src={details.avatar} alt={details.name} />
      <h2>{details.name}</h2>
      <p><strong>Город:</strong> {details.details.city}</p>
      <p><strong>Компания:</strong> {details.details.company}</p>
      <p><strong>Должность:</strong> {details.details.position}</p>
    </div>
  );
}
