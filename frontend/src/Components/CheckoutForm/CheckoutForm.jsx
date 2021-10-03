import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.css";
import AddressForm from "./components/AddressForm/AddressForm";
import Products from "../Products/Products";
import { createChare } from "../../services/payment.service";
const stripe = require("stripe")(
  "sk_test_51JfpPDIrhF0UywCZe4Uct8sRo4KS0lYeNrKCwUgcvW4KUmENkYoVPmKRmT5EoYCllMFgSL39APmN6lobDCkjY3mG0005e4Gw0C"
);

const productsData = [
  {
    name: "Yongqiang Accent Chair",
    price: 50,
    imageUrl: "https://m.media-amazon.com/images/I/71rFOAGdoOS._AC_SX466_.jpg",
  },
  {
    name: "Modern Accent Chair",
    price: 50,
    imageUrl:
      "https://target.scene7.com/is/image/Target/AccentChairs_QUIVER-210420-1618938887124",
  },
];

const CheckoutForm = () => {
  const totalPrice = productsData?.reduce((acc, cur) => {
    return acc + cur.price;
  }, 0);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [showPaymentMethod, setShowpaymentMethod] = useState(false);
  const [address, setAddress] = useState({});
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(cardElement);

    if (error) return alert("[error]");
    setLoading(true);
    try {
      const charge = await createChare(token.id, totalPrice, address.email);
      console.log("[Charge]", charge);
      charge.status === 200 && alert(charge.data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleAddressSubmit = (data) => {
    setShowpaymentMethod(true);
    setAddress(data);
  };

  return (
    <div className={styles.container}>
      <Products data={productsData} />
      <AddressForm handleAddressSubmit={handleAddressSubmit} />
      <h4>Step2: Payment</h4>
      <form
        onSubmit={handleSubmit}
        className={`${styles.form} ${!showPaymentMethod && styles.disable}`}
      >
        <div className={styles.inputContainer}>
          <CardElement />
        </div>

        {showPaymentMethod && (
          <button
            style={{
              pointerEvents: loading && "none",
              background: loading && "#ddd",
            }}
            disable={loading}
            className={styles.btn}
            type="submit"
            disabled={!stripe}
          >
            {loading ? "Loading.." : "Submit"}
          </button>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
