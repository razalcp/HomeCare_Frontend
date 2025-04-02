import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe("pk_test_51R6U86C1BfcS3nBmDJiOxmtM6gwBJYviOXEOrJ3lnThYcAwwNmvrmJxcF9TjgrbxbrTFPKaiqnakdMzdfSphOWzz00JaLI2atu")

export default function StripeProvider({ children }: { children: React.ReactNode }) {
    return <Elements stripe={stripePromise}>{children}</Elements>
}
