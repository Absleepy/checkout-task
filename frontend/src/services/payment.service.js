import axios from "axios";

export const createChare = (source, amount, email) => {
  return axios.post("http://localhost:3060/payment/create-charge", {
    source,
    amount,
    receipt_email: email,
  });
};
