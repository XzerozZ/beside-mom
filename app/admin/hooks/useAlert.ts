"use client";

import { useState } from "react";
import { AlertColor } from "@mui/material";

interface AlertState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

export const useAlert = () => {
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: "",
    severity: "info",
  });

  const showAlert = (message: string, severity: AlertColor = "info") => {
    setAlert({
      open: true,
      message,
      severity,
    });
  };

  const hideAlert = () => {
    setAlert(prev => ({
      ...prev,
      open: false,
    }));
  };

  // Convenience methods
  const showSuccess = (message: string) => showAlert(message, "success");
  const showError = (message: string) => showAlert(message, "error");
  const showWarning = (message: string) => showAlert(message, "warning");
  const showInfo = (message: string) => showAlert(message, "info");

  return {
    alert,
    showAlert,
    hideAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
