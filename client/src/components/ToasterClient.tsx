// components/ToasterClient.tsx
import { CheckCircle, XCircle } from "lucide-react";
import { Toaster } from "react-hot-toast";

export function ToasterClient() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "var(--color-base-100)",
          color: "var(--color-base-content)",
        },
        success: {
          icon: <CheckCircle className="text-base-content w-5 h-5" />,
        },
        error: {
          icon: <XCircle className="text-error w-5 h-5" />,
        },
      }}
    />
  );
}
