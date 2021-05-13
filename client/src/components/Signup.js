import { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { MyContext } from "../context";

export default class Signup extends Component {
  componentDidMount() {
    if (document.cookie) {
      return this.props.history.push("/");
    }
  }

  render() {
    return (
      <MyContext.Consumer>
        {(context) => (
          <div className="mt-4 mb-5">
            <h3>Registro</h3>
            <Form
              onSubmit={(e) => {
                context.handleSignup(e, () => {
                  this.props.history.push("/login");
                });
              }}
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu nombre"
                  name="name"
                  value={context.formSignup.name}
                  onChange={(e) => context.handleInput(e, "formSignup")}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo"
                  name="email"
                  value={context.formSignup.email}
                  onChange={(e) => context.handleInput(e, "formSignup")}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  value={context.formSignup.password}
                  onChange={(e) => context.handleInput(e, "formSignup")}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Registrarme
              </Button>
            </Form>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}

Signup.contextType = MyContext;
