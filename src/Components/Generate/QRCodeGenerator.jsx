import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import s from "./qrCodeGenerator.module.css";
import { GENERATE_DATA } from "../../const";

export const QRCodeGenerator = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const onClickHandler = () => {
     if (!value.trim()) {
      setValue("");  
      alert("Пожалуйста, введите данные для генерации QR кода!"); 
      return;
    }
    const prevData = JSON.parse(localStorage.getItem(GENERATE_DATA) || "[]");
    localStorage.setItem(GENERATE_DATA, JSON.stringify([...prevData, value]));
    setResult(value);
    setValue("");
  };

  const onChangeHandler = (event) => {
    setValue(event.target.value);
    setResult("");
  };

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const downloadQRCode = () => {
    const svg = document.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      if (isMobile) {
        canvas.toBlob((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        });
      } else {
        canvas.toBlob((blob) => {
          if (!blob) return;
          const downloadLink = document.createElement("a");
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.download = "qrcode.png";
          downloadLink.click();
          setTimeout(() => URL.revokeObjectURL(downloadLink.href), 1000);
        });
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className={s.qrGenerator}>
      <input
        className={s.qrInput}
        type="text"
        placeholder="Введите данные"
        value={value}
        onChange={onChangeHandler}
      />
      <button className={s.qrButton} type="button" onClick={onClickHandler}>
        Сгенерировать
      </button>

      {result !== "" && (
        <div className={s.qrCodeWrapper}>
          <QRCodeSVG value={result} size={200} />
          <button className={s.downloadButton} onClick={downloadQRCode}>
            Скачать PNG
          </button>
        </div>
      )}
    </div>
  );
};
