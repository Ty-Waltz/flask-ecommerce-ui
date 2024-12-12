
import { useEffect, useState } from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productId) {
      axios
        .get(`http://127.0.0.1:5000/products/${productId}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          setError('Failed to fetch product details.');
          console.error(error);
        });
    }
  }, [productId]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h3>Product Details</h3>
      <div><strong>Name:</strong> {product.name}</div>
      <div><strong>Price:</strong> ${product.price}</div>
      <div><strong>Description:</strong> {product.description}</div>
      <Button variant="primary" href={`/edit-product/${product.id}`}>Edit Product</Button>
    </Container>
  );
};

ProductDetails.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default ProductDetails;


