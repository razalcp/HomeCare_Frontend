import { useNavigate } from "react-router-dom";

export default function PaymentFailedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-red-600">Payment Failed ❌</h1>
      <p className="mt-4 text-gray-700">Something went wrong. Your payment was not successful.</p>
      <button
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => navigate("/appointment")}
      >
        Try Again
      </button>
    </div>
  );
}
