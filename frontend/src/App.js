import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./Components/CheckoutForm/CheckoutForm";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
function App() {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default App;
