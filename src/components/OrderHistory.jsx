import { useEffect, useState } from 'react';
import { ListGroup, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

const OrderHistory = ({ customerId }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (customerId) {
      axios
        .get(`http://127.0.0.1:5000/orders?customerId=${customerId}`)
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          setError('Failed to fetch order history.');
          console.error(error);
        });
    }
  }, [customerId]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!orders.length) {
    return <div>No orders found for this customer.</div>;
  }

  return (
    <div>
      <h3>Order History</h3>
      <ListGroup>
        {orders.map((order) => (
          <ListGroup.Item key={order.id}>
            <div>Order ID: {order.id}</div>
            <div>Date: {new Date(order.date).toLocaleDateString()}</div>
            <div>Total: ${order.total}</div>
            <Button variant="info" size="sm" href={`/order-details/${order.id}`}>View Order</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

OrderHistory.propTypes = {
  customerId: PropTypes.number.isRequired,
};

export default OrderHistory;


