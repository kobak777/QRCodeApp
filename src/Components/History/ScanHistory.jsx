import { SCAN_DATA } from "../../const";
import { QRCodeSVG } from "qrcode.react";
import s from "./history.module.css";
import { useState, useEffect } from "react";

export const ScanHistory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(SCAN_DATA) || "[]");
    setData(stored);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem(SCAN_DATA);
    setData([]);
  };

  if (data.length === 0) {
    return (
      <div className={s.history}>
        <p className={s.empty}>История сканирования пуста</p>
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
          {text.startsWith("http://") || text.startsWith("https://") ? (
            <a href={text} target="_blank" rel="noopener noreferrer">
              {text}
            </a>
          ) : (
            <span>{text}</span>
          )}
        </div>
      ))}
    </div>
  );
};
