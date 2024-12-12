import { useState, useEffect } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

const ProductForm = ({ productId, onProductSaved }) => {
  const [product, setProduct] = useState({ name: '', price: '', description: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (productId) {
      axios
        .get(`http://127.0.0.1:5000/products/${productId}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((err) => {
          setErrorMessage('Failed to load product data.');
          console.error(err);
        });
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!product.name) errors.name = 'Product name is required.';
    if (!product.price) errors.price = 'Product price is required.';
    if (!product.description) errors.description = 'Product description is required.';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      setErrorMessage(null);

      const apiUrl = productId
        ? `http://127.0.0.1:5000/products/${productId}`
        : 'http://127.0.0.1:5000/products';
      const httpMethod = productId ? axios.put : axios.post;

      httpMethod(apiUrl, product)
        .then(() => {
          setLoading(false);
          onProductSaved();
        })
        .catch((err) => {
          setLoading(false);
          setErrorMessage('Failed to save product data.');
          console.error(err);
        });
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <Container>
      <h3>{productId ? 'Edit Product' : 'Add New Product'}</h3>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formGroupName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formGroupPrice" className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            isInvalid={!!errors.price}
          />
          <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formGroupDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={product.description}
            onChange={handleChange}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </Form>
    </Container>
  );
};

ProductForm.propTypes = {
  productId: PropTypes.number,
  onProductSaved: PropTypes.func
};

export default ProductForm;
