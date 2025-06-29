import { useRef, useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import coffee from "../../assets/healthy.png";
import { useCustomer } from "../../Contexts/CustomerContext";
import { toast } from "react-toastify";
import APIService from "../../utils/api";

export default function QRDialog({ open, setOpen }) {
  const [scanning, setScanning] = useState(false);
  const html5QrCodeRef = useRef(null);
  const isRunning = useRef(false);
  const { setRole } = useCustomer();

  useEffect(() => {
    if (!open && html5QrCodeRef.current && isRunning.current) {
      html5QrCodeRef.current.stop().catch(() => {});
      isRunning.current = false;
      setScanning(false);
    }
  }, [open]);

  const hasScanned = useRef(false);

  const startScan = () => {
    if (isRunning.current) return;
    hasScanned.current = false;
    const html5QrCode = new Html5Qrcode("reader");
    html5QrCodeRef.current = html5QrCode;
    setScanning(true);

    html5QrCode
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        async (decodedText) => {
          if (hasScanned.current) return;
          hasScanned.current = true;
          try {
            const response = await APIService.post("/table/booktable", {
              tableId: decodedText.trim(),
            });

            const token = response.data?.TABLE_ACCESS_TOKEN;

            localStorage.setItem("role", "customer");
            localStorage.setItem("TABLE_ACCESS_TOKEN", token);
            localStorage.setItem("orderItems", "[]");
            setRole("customer");

            toast.success("Table booked successfully!");

            if (html5QrCodeRef.current && isRunning.current) {
              await html5QrCodeRef.current.stop();
              isRunning.current = false;
            }

            setScanning(false);
            setOpen(false);
          } catch (error) {
            console.error("Booking error:", error);
            toast.error("Failed to book table.");
            hasScanned.current = false;
          }
        },
        (errorMessage) => {
          console.warn("QR scan warning:", errorMessage);
        }
      )
      .then(() => {
        isRunning.current = true;
      })
      .catch((error) => {
        console.error("Camera start error:", error);
        toast.error("Error accessing camera.");
        setScanning(false);
        isRunning.current = false;
      });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 px-4">
      <div className="bg-primary p-6 rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center gap-4">
        <img src={coffee} alt="coffee Logo" className="w-20" />
        {!scanning && (
          <button
            className="bg-secondary txt1 px-5 py-2 rounded-lg text-lg hover:opacity-90"
            onClick={startScan}
          >
            Click To Scan QR code
          </button>
        )}
        <div id="reader" className="w-full max-w-[350px]"></div>
        <p>Scan Here To Make Your Order Ready!</p>
        <button onClick={() => setOpen(false)} className="mt-4 txt4 underline">
          Cancel
        </button>
      </div>
    </div>
  );
}
