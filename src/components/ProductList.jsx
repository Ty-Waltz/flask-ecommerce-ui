import { useEffect, useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import OrderForm from './OrderForm';  

const ProductList = ({ orderId }) => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);

  useEffect(() => {
    if (orderId) {
      axios
        .get(`http://127.0.0.1:5000/products?orderId=${orderId}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }
  }, [orderId]);

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setShowOrderForm(true);
  };

  const handleOrderSubmit = () => {
    setShowOrderForm(false);
  };

  return (
    <div>
      <h3>Products</h3>
      <ListGroup>
        {products.map((product) => (
          <ListGroup.Item key={product.id} className="d-flex justify-content-between">
            <span>{product.name}</span>
            <Button variant="info" size="sm" onClick={() => handleProductClick(product.id)}>
              View Details
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {showOrderForm && selectedProductId && (
        <OrderForm
          selectedProductId={selectedProductId}
          onSubmit={handleOrderSubmit}
        />
      )}
    </div>
  );
};

ProductList.propTypes = {
  orderId: PropTypes.number.isRequired,
  onProductSelect: PropTypes.func.isRequired,
};

export default ProductList;


