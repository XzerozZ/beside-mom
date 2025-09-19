"use client";

import { useState, useCallback } from "react";
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

  const showAlert = useCallback(
    (message: string, severity: AlertColor = "info") => {
      setAlert({
        open: true,
        message,
        severity,
      });
    },
    []
  );

  const hideAlert = useCallback(() => {
    setAlert((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);

  // Convenience methods - now stable with useCallback
  const showSuccess = useCallback(
    (message: string) => showAlert(message, "success"),
    [showAlert]
  );
  const showError = useCallback(
    (message: string) => showAlert(message, "error"),
    [showAlert]
  );
  const showWarning = useCallback(
    (message: string) => showAlert(message, "warning"),
    [showAlert]
  );
  const showInfo = useCallback(
    (message: string) => showAlert(message, "info"),
    [showAlert]
  );

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
