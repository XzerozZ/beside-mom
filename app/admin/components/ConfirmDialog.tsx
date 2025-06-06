"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { AlertColor } from "@mui/material/Alert";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  severity?: AlertColor;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title = "ยืนยันการดำเนินการ",
  message,
  confirmText = "ยืนยัน",
  cancelText = "ยกเลิก",
  severity = "warning",
  onConfirm,
  onCancel,
}) => {
  const getSeverityColor = (severity: AlertColor) => {
    switch (severity) {
      case "error":
        return "#d32f2f";
      case "warning":
        return "#ed6c02";
      case "info":
        return "#0288d1";
      case "success":
        return "#2e7d32";
      default:
        return "#ed6c02";
    }
  };

  const confirmButtonColor = getSeverityColor(severity);

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 2,
          padding: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 600,
          fontSize: "1.2rem",
          color: "#333",
          paddingBottom: 1,
        }}
      >
        {title}
      </DialogTitle>
      
      <DialogContent>
        <Typography
          variant="body1"
          sx={{
            color: "#666",
            lineHeight: 1.6,
          }}
        >
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ padding: 2, gap: 1 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            color: "#666",
            borderColor: "#ddd",
            backgroundColor: "#fff",
            minWidth: 80,
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#f5f5f5",
              borderColor: "#ccc",
            },
          }}
        >
          {cancelText}
        </Button>
        
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: confirmButtonColor,
            color: "#fff",
            minWidth: 80,
            fontWeight: 500,
            boxShadow: "none",
            "&:hover": {
              backgroundColor: confirmButtonColor,
              filter: "brightness(0.9)",
              boxShadow: "none",
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;