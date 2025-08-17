import { GENERATE_DATA } from "../../const";
import { QRCodeSVG } from "qrcode.react";
import s from "./history.module.css";
import { useState, useEffect } from "react";

export const GenerateHistory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(GENERATE_DATA) || "[]");
    setData(stored);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem(GENERATE_DATA);
    setData([]);
  };

  if (data.length === 0) {
    return (
      <div className={s.history}>
        <p className={s.empty}>История генерирования пуста</p>
      </div>
    );
  }

  return (
    <div className={s.history}>
      <button className={s.clearButton} onClick={clearHistory}>
        Очистить историю
      </button>
      {data.map((text, index) => (
        <div key={index} className={s.card}>
          <QRCodeSVG value={text} size={120} />
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
};
