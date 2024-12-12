import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import OrderForm from './components/OrderForm';
import ProductList from './components/ProductList';
import ProductForm from "./components/ProductForm";
import ProductDetails from "./components/ProductDetails";
import CustomerForm from './components/CustomerForm';
import NavigationBar from "./components/NavigationBar";
import OrderHistory from "./components/OrderHistory";
import './AppStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCustomerId: null,
      selectedOrderId: null,
      selectedProductId: null, 
    };
  }

  handleCustomerSelect = (customerId) => {
    this.setState({ selectedCustomerId: customerId });
  };

  handleOrderSelect = (orderId) => {
    this.setState({ selectedOrderId: orderId });
  };

  handleProductSelect = (productId) => {
    this.setState({ selectedProductId: productId });
  };

  handleProductSaved = () => {
    console.log("Product saved, refresh product list");
  };

  render() {
    const { selectedCustomerId, selectedOrderId, selectedProductId } = this.state;

    return (
      <div className="app-container">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<CustomerList onCustomerSelect={this.handleCustomerSelect} />} />
          <Route path="/add-customer" element={<CustomerForm />} />
          <Route path="/edit-customer/:id" element={<CustomerForm />} />
          <Route path="/customers" element={<CustomerList onCustomerSelect={this.handleCustomerSelect} />} />
          <Route path="/add-products" element={<ProductForm onProductSaved={this.handleProductSaved} />} />
          <Route path="/edit-product/:id" element={<ProductForm onProductSaved={this.handleProductSaved} />} />
        </Routes>

        <h1>Our Customers</h1>
        {selectedCustomerId && (
          <div>
            <OrderForm
              customerId={selectedCustomerId}
              onOrderSelect={this.handleOrderSelect}
            />
            {selectedOrderId && <ProductList orderId={selectedOrderId} onProductSelect={this.handleProductSelect} />}
            <OrderHistory customerId={selectedCustomerId} />
          </div>
        )}

        {selectedProductId && (
          <div>
            <ProductDetails productId={selectedProductId} />
          </div>
        )}
      </div>
    );
  }
}

export default App;





