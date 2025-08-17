import { QRCodeGenerator } from "./Components/Generate/QRCodeGenerator";
import { QRCodeScanner } from "./Components/Scan/QRCodeScanner";
import { Navigation } from "./Components/Navigation/Navigation";
import { GenerateHistory } from "./Components/History/GenerateHistory";
import { ScanHistory } from "./Components/History/ScanHistory";
import { Routes, Route, Navigate } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/generate" replace />} />
        <Route path="/generate" element={<QRCodeGenerator />} />
        <Route path="/scan" element={<QRCodeScanner />} />
        <Route path="/scanHistory" element={<ScanHistory />} />
        <Route path="/generateHistory" element={<GenerateHistory />} />
      </Routes>
    </div>
  );
};
