import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { useState } from "react"

export default function PaymentForm({ amount }: { amount: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    if (!stripe || !elements) return

    setLoading(true)
    const response = await fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    })
    const { clientSecret } = await response.json()

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    })

    if (result.error) {
      console.error(result.error.message)
    } else if (result.paymentIntent.status === "succeeded") {
      alert("Payment successful!")
    }
    setLoading(false)
  }

  return (
    <div>
      <CardElement className="border p-4 rounded-lg" />
      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white px-4 py-2 mt-4"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  )
}
