import { useEffect } from "react";
import './Toast.scss';

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className={`toaster toast-${type.toLowerCase()}`}>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
