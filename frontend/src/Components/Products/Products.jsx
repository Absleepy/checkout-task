import React from "react";
import styles from "./Products.module.css";
const Products = ({ data }) => {
  const [total, setTotal] = React.useState("");

  React.useEffect(() => {
    const total = data.reduce((acc, curr) => {
      let priceOne = acc;
      let priceTwo = curr.price;

      return priceOne + priceTwo;
    }, 0);
    setTotal(total);
  }, []);
  return (
    <div className={styles.container}>
      {data?.map((item) => (
        <div key={item?.name} className={styles.card}>
          <img src={item.imageUrl} width="80px" alt="" />
          <h4>{item.name}</h4>

          <span>${item.price}</span>
        </div>
      ))}
      <h5>Total: ${total && total}</h5>
    </div>
  );
};

export default Products;
