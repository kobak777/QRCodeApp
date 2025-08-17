import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { SCAN_DATA } from "../../const";
import s from "./qrCodeScanner.module.css";
import jsQR from "jsqr";

export const QRCodeScanner = () => {
  const [scanned, setScanned] = useState(null);
  const [mode, setMode] = useState("upload");  

  const isUrl = (text) => {
    try {
      const url = new URL(text);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const saveScanned = (value) => {
    setScanned(value);
    const prevData = JSON.parse(localStorage.getItem(SCAN_DATA) || "[]");
    localStorage.setItem(SCAN_DATA, JSON.stringify([...prevData, value]));
  };

  const scanHandler = (result) => {
    if (!result) return;
    saveScanned(result[0].rawValue);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);
      if (code) {
        saveScanned(code.data);
      } else {
        alert("QR код не найден на изображении");
      }
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <div className={s.container}>
      <div className={s.modeSwitch}>
        <button
          className={mode === "camera" ? s.active : ""}
          onClick={() => setMode("camera")}
        >
          Камера
        </button>
        <button
          className={mode === "upload" ? s.active : ""}
          onClick={() => setMode("upload")}
        >
          Фото
        </button>
      </div>

      {mode === "camera" && (
        <Scanner
          onScan={scanHandler}
          components={{ audio: false, finder: false }}
          styles={{ container: { width: 250 } }}
        />
      )}

      {mode === "upload" && (
        <input type="file" accept="image/*" onChange={handleFileUpload} />
      )}
      <h3>Результат:</h3>
      {scanned && (
        <p>
          {isUrl(scanned) ? (
            <a href={scanned} target="_blank" rel="noopener noreferrer">
              {scanned}
            </a>
          ) : (
            scanned
          )}
        </p>
      )}
    </div>
  );
};
