import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function NavigationBar() {
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem("authToken");

    const handleLogout = () => {
        localStorage.removeItem("authToken"); 
        localStorage.removeItem("userData");  
        navigate("/login"); 
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">E-Commerce App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/" activeclassname="active">
                        Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/add-customer" activeclassname="active">
                        Add Customer
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/customers" activeclassname="active">
                        Customers
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/add-products" activeclassname="active">
                        Add Products
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/products" activeclassname="active">
                        Products
                    </Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                    {isLoggedIn ? (
                        <Nav.Link as="button" onClick={handleLogout} style={{ cursor: "pointer" }}>
                            Logout
                        </Nav.Link>
                    ) : (
                        <Nav.Link as={NavLink} to="/login" activeclassname="active">
                            Login
                        </Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;
