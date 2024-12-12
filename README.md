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
### OrderHistory  
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
-Each order is mapped to a ListGroup.Item, which displays the order's:  
  ID: The unique identifier for the order.  
  Date: Converted to a readable format using toLocaleDateString().  
  Total: The total cost of the order, formatted as a dollar amount.  
-A "View Order" button links to the order's detail page using the href attribute and the order's ID.  


