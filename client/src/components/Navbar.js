import React from "react";
import { Link, useHistory } from "react-router-dom";
import { MyContext } from "../context";
import {
  Navbar,
  Nav,
  NavDropdown,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

function MyNavbar() {
  let history = useHistory();

  return (
    <MyContext.Consumer>
      {(context) => (
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          className="mynavbar"
        >
          <Navbar.Brand as="p">
            <Link to="/">
              <img src="./commerce.png" alt="" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto "></Nav>
            <Nav>
              <InputGroup>
                <FormControl
                  placeholder="Busca un artículo"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={context.searchItem}
                  onChange={(e) => context.handleInput(e, "searchItem")}
                  name="searchItem"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (context.searchItem !== "") {
                        history.push(`/searching/${context.searchItem}`);
                      }
                    }
                  }}
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-secondary"
                    onClick={(e) => {
                      if (context.searchItem !== "") {
                        history.push(`/searching/${context.searchItem}`);
                      }
                    }}
                  >
                    Buscar
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Nav>
            <Nav>
              {!context.loggedUser && (
                <NavDropdown
                  title="Regístrate/Ingresa"
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item as="p">
                    <Link to="/signup">Regístrate</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item >
                    <Link to="/login">Ingresa</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {context.loggedUser && (
                <>
                  <Nav.Link >
                    <Link to="/additem">Vende un producto</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/userpage">
                      <i className="ri-user-fill"></i>
                    </Link>
                  </Nav.Link>
                  {context.user.cart.length > 0 && (
                    <Nav.Link>
                      <Link to="/usercart">
                        <i className="ri-shopping-cart-2-fill">
                          {context.user.cart.length}
                        </i>
                      </Link>
                    </Nav.Link>
                  )}
                  {context.user.cart.length === 0 && (
                    <Nav.Link>
                      <Link to="/usercart">
                        <i className="ri-shopping-cart-2-line">
                          {context.user.cart.length}
                        </i>
                      </Link>
                    </Nav.Link>
                  )}
                  <Nav.Link
                    style={{}}
                    onClick={() =>
                      context.handleLogout(() => {
                        history.push("/login");
                      })
                    }
                  >
                    Salir
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </MyContext.Consumer>
  );
}

export default MyNavbar;
