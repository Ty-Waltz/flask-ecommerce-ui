# Flask Ecommerce Ui  
## A basic rundown on how the application works  
This application is a UI for an ecommerce platform that can handle tasks like:  
Adding customers  
Editing/deleting customers    
Viewing customer orders and order history  
Adding products  
Viewing products  
### CustomerForm.jsx  
-This file begins with a consructor for name, email, and phone to capture customer details. This is also used for error handling, loading status, and success messages.  
-Then there is the componentDidUpdate function that monitors changes in the customerId and will change the data based on the info provided for that id using axios.get to update. If the field is null, the form will reset.  
-handleChange will update user input dynamically using target.name and target.event to update the field state.  
-validateForm is pretty straight forward, this checks to make sure every field is filled out.  
-handleSubmit will submit the form via POST or PUT to the backend. It will prevent default submission, calls validate form for errors, determines wether to use POST or PUT based on customerId and will send the request using axios. Finally, it will display a success message and call onUpdateCustomerList to refresh the page(I will go over this function later).  
-closeModal shows a confirmation modal on success, then sets showSuccessModal to false when closed.  
-render uses React Bootstrap Forms for name, email, and phone and a validation feedback that is shown using Form.Control.Feedback. Then a submit button is used and once complete it will display a success message using modal.  
### CustomerList.jsx  
-The file starts with a constructor that initializes the state with customers, selectedCustomerId, and error.  
The componentDidMount function triggers when the component is first loaded. It calls fetchCustomers, which uses axios.get to fetch the list of customers from the backend and updates the state. If there's an error during the fetch, it updates the error state with a message.  
-fetchCustomers method sends a GET request to retrieve the list of customers. It will then store the fetched data in the customers state. On failure, it updates the error state to display an error message.  
-componentDidUpdate function monitors changes to the selectedCustomerId state. When the id changes, it logs the new selection to the console for debugging purposes. This makes sure the UI reflects the current customer.  
-componentWillUnmount function logs a message when the component is being removed from the DOM.  
-selectCustomer method updates the selectedCustomerId in the state when a customer is clicked. If the parent component provides an onCustomerSelect callback, it calls that function with the selected id to notify the parent of the selection.  
-deleteCustomer method sends a DELETE request using axios to remove a customer by their id. It calls fetchCustomers to refresh the list. If the request fails, it updates the error state with a failure message.  
-render method builds the UI displaying an error message using a React-Bootstrap Alert if the error state is set. it renders a ListGroup containing the list of customers. Each customer shows their name as a clickable Link that navigates to the edit form (/edit-customer/:id). Includes a "Delete" button that calls deleteCustomer to remove the customer.  
### NavigationBar.jsx  
-This provides a navigation bar for the application using React Bootstrap and React Router.  
-It creates a responsive navigation bar that adapts to different screen sizes. It includes a brand label, toggle functionality, and collapsible links.
-Navbar.Brand serves as the main title of the application.
-Clicking the "E-Commerce App" link redirects users to the home page (/) using the href="/".
-Navbar.Toggle and Navbar.Collapse enable a responsive, collapsible menu.
-When the screen size is small, the navigation links collapse into a toggleable dropdown menu.
-Nav component contains individual navigation links for the apps routes.
-Each Nav.Link wraps around a NavLink component from React Router.
-The to attribute specifies the route path for navigation (e.g., /add-customer or /customers).
-The activeclassname="active" ensures the active route link is styled differently, signifying the current page.
### OrderForm.jsx  
-This file defines a functional component, OrderForm, to handle the placement of product orders.  
-It uses React's useState for form field states and useEffect to fetch the list of available products from the backend.  
-The state hooks manage form data and fetched products. customerName, selectedProductId, orderDate, and quantity store the respective input field values.
products stores the list of available products fetched from the API.  
-useEffect fetches products on component load.  
-fetchProducts function calls the backend API to retrieve product data. On success, the product list is stored in the products state. If an error occurs, it is logged in the console.
-handleSubmit processes the form submission and prevents the default form behavior using e.preventDefault(). it then validates that all required fields are filled, and the quantity is at least 1. If validation fails, an alert notifies the user. It will then create a new order object (newOrder) and send it to the backend API using the POST method with a JSON payload.  
-If the API call is successful it will display a success alert, reset the form fields to their initial values, invoke the onSubmit callback prop, if provided, to allow the parent component to handle updates, if the API call fails, logs an error message and displays an alert to the user.  
-The form fields capture input from the user.  
-Customer Name: Captures the name of the customer using a text input.  
-Select Product: A dropdown is populated with the product names and prices fetched from the backend.  
-Quantity: Captures the order quantity with a number input. The minimum value is restricted to 1.  
-Order Date: Uses a date picker to capture the order date.  
-A button at the bottom submits the form, triggering handleSubmit.  
### OrderHistory.jsx  
-This file defines the OrderHistory component, which displays a customer's past orders.  
-State management is handled by two hooks:  
  orders stores the list of orders retrieved from the API.  
  error stores any error messages encountered during the data-fetching process.  
-useEffect hook fetches the customer's order history when customerId changes.  
-It sends a GET request to the API with the customerId as a query parameter. The response data is stored in the orders state using setOrders().  
-If an error occurs during the fetch, the error state is updated with an appropriate message, and the error is logged to the console.  
-Conditional rendering is used to handle different states:  
  If an error exists, an Alert with a "danger" is displayed, showing the error message.  
  If the orders array is empty, a fallback message is displayed.  
  If there are no errors, the list of orders is rendered.  
-The order list is displayed using a ListGroup from React Bootstrap.  
-Each order is mapped to a ListGroup.Item, which displays the orders:  
  ID: The unique identifier for the order.  
  Date: Converted to a readable format using toLocaleDateString().  
  Total: The total cost of the order, formatted as a dollar amount.  
-A "View Order" button links to the order's detail page using the href attribute and the order's id.  
### ProductDetails.jsx  
-This file defines the ProductDetails component, which displays detailed information about a specific product.  
=State management is handled by two hooks:  
  product: Stores the product details retrieved from the API.  
  error: Stores any error messages that may occur while fetching the product details.  
-useEffect hook fetches product details when the productId prop changes. If productId is provided, an API request is made using axios.get() to fetch product details from the endpoint http://127.0.0.1:5000/products/${productId}.  
On success, the product data is saved to the product state using setProduct().  
On failure, the error state is updated with an appropriate error message, and the error is logged to the console.  
Conditional rendering handles different states:  
  If an error exists, an Alert with a "danger" is displayed, showing the error message.  
  If product is null, a simple "Loading..." message is displayed.  
-Once the product details are successfully fetched, they are displayed in the main content area.  
-The component renders the product attributes:  
  Name: Displayed as a bold label followed by the product's name.  
  Price: Displayed in dollars, formatted as ${product.price}.  
  Description: Shown under a bold "Description" label.  
-A "Edit Product" button is provided, which links to the product editing page. The href is dynamically generated using the product ID.  
### ProductForm.jsx  
-This file defines the ProductForm component, which is used for adding or editing a product.  
-It handles both form validation and submission using React hooks and integrates with a backend API through axios.  
-State management is handled using React's useState hook:  
  product: Holds the values for the product being added or edited (name, price, and description).  
  errors: Stores any validation errors for the form fields (name, price, description).  
  loading: Shows the loading state while the form is being submitted.  
  errorMessage: Holds a general error message if something goes wrong during form submission.
-useEffect hook fetches product data if productId is provided. When productId changes, an API call is made to fetch the product data from the backend using axios.get(). If the data is fetched successfully, it updates the product state. If there’s an error, an error message is set in the errorMessage state.
-handleChange function updates the product state when a form field is modified. It uses the name and value properties from the event to dynamically update the appropriate field in the product object.  
-validateForm function checks if all required fields are filled out correctly.  
handleSubmit function handles form submission. It validates the form by calling validateForm(). If there are no validation errors, the form proceeds to submission. It determines whether to make a POST or PUT request based on whether a productId exists.  
-The API request is made using axios.post() or axios.put(), and upon successful submission, the onProductSaved callback is called.  
-Conditional rendering is used to handle different states:
  If there’s an error message, it is displayed as an alert at the top of the form.
  If the form is being submitted, the "Save" button displays a "Saving..." text and is disabled to prevent multiple submissions.
-The form fields are rendered using Form.Control from React Bootstrap. If a field has an error, the input is marked as invalid, and the error message is displayed below the field using Form.Control.Feedback.
-onProductSaved: A callback function that is called when the product is successfully saved.
### ProductList.jsx  
-This file is used to display a list of products associated with a specific order.  
-It retrieves the products from a backend API based on the provided orderId and allows users to select a product to view more details.  
State management is handled using React's useState hook:  
  products: Stores the list of products that belong to the order identified by the orderId. Initially, it’s set to an empty array.  
-useEffect hook fetches products when the orderId changes. It makes an API call using axios.get() to fetch the products related to the orderId. If the request is successful, it updates the products state with the fetched data. If there’s an error fetching the products, it logs the error in the console.  
-handleProductClick function is triggered when a user clicks the "View Details" button for a product. This function calls the onProductSelect prop, passing the selected products ID. The parent component can use this to handle the product selection.  
-Rendering the products list renders a list of products inside a ListGroup. Each item in the list displays the product's name and a "View Details" button.  
The button, when clicked, triggers the handleProductClick function, passing the product's ID for further processing.  
### App.jsx  
-State management uses this.state to store:  
  selectedCustomerId: The ID of the currently selected customer.  
  selectedOrderId: The ID of the currently selected order.  
  selectedProductId: The ID of the currently selected product.  
-These states track user selections, which influence what data is displayed or available for interaction.  
-Event handler methods:  
  handleCustomerSelect(customerId): Sets the selectedCustomerId when a customer is selected from the CustomerList.  
  handleOrderSelect(orderId): Sets the selectedOrderId when an order is selected from the OrderForm or ProductList.  
  handleProductSelect(productId): Sets the selectedProductId when a product is selected from the ProductList.  
  handleProductSaved(): Logs a message when a product is saved, typically used to refresh the product list or notify the user.  
-Conditional rendering depends on the current state. If a selectedCustomerId exists, the OrderForm is displayed for the selected customer.  
If a selectedOrderId exists, the ProductList is rendered, showing products associated with that order.  
-The OrderHistory is displayed for the selected customer.
-If a selectedProductId exists, the ProductDetails component is rendered, showing details of the selected product.
-The app uses React Router to handle navigation between different pages. The routes define paths for displaying CustomerList, CustomerForm, ProductForm , and ProductDetails.  
-The element prop in the Route component defines which component should be rendered when the corresponding route is matched.
-The NavigationBar component is displayed at the top of the app and provides links for users to navigate between pages.  





