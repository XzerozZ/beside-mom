"use client";

import React from "react";
import { Alert, Snackbar, AlertColor } from "@mui/material";

interface StyledAlertProps {
  open: boolean;
  message: string;
  severity: AlertColor;
  onClose: () => void;
  autoHideDuration?: number;
}

const StyledAlert: React.FC<StyledAlertProps> = ({
  open,
  message,
  severity,
  onClose,
  autoHideDuration = 4000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          width: "100%",
          fontFamily: "inherit",
          "& .MuiAlert-message": {
            fontWeight: 500,
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default StyledAlert;
