import React from 'react';
import "./CartPage.css";

interface CartTotalProps {
  total: number;
}

const TotalPayment: React.FC<CartTotalProps> = ({ total }) => {
  return (
    <tr className="table-warning">
      <th colSpan={6} className="text-right">
        Total cost:
      </th>
      <th>${total.toFixed(2)}</th>
    </tr>
  );
};

export default TotalPayment;
