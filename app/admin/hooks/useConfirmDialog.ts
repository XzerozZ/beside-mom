"use client";

import { useState } from "react";
import { AlertColor } from "@mui/material/Alert";

interface ConfirmState {
  open: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  severity: AlertColor;
  onConfirm: () => void;
}

interface ConfirmOptions {
  title?: string;
  confirmText?: string;
  cancelText?: string;
  severity?: AlertColor;
}

export const useConfirmDialog = () => {
  const [confirmState, setConfirmState] = useState<ConfirmState>({
    open: false,
    title: "ยืนยันการดำเนินการ",
    message: "",
    confirmText: "ยืนยัน",
    cancelText: "ยกเลิก",
    severity: "warning" as AlertColor,
    onConfirm: () => {},
  });

  const showConfirm = (
    message: string,
    onConfirmCallback: () => void,
    options: ConfirmOptions = {}
  ) => {
    setConfirmState({
      open: true,
      title: options.title || "ยืนยันการดำเนินการ",
      message,
      confirmText: options.confirmText || "ยืนยัน",
      cancelText: options.cancelText || "ยกเลิก",
      severity: options.severity || "warning",
      onConfirm: onConfirmCallback,
    });
  };

  const handleConfirm = () => {
    confirmState.onConfirm();
    setConfirmState(prev => ({ ...prev, open: false }));
  };

  const handleCancel = () => {
    setConfirmState(prev => ({ ...prev, open: false }));
  };

  return {
    confirmState,
    showConfirm,
    handleConfirm,
    handleCancel,
  };
};