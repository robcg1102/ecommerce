import { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { MyContext } from "../context";

export default class Login extends Component {
  componentDidMount() {
    if (document.cookie) {
      return this.props.history.push("/");
    }
  }

  render() {
    return (
      <MyContext.Consumer>
        {(context) => (
          <div className="mt-5 mb-5 pb-5">
            <h2>Ingresar</h2>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@mail.com"
                  name="email"
                  value={context.loginForm.email}
                  onChange={(e) => context.handleInput(e, "loginForm")}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={context.loginForm.password}
                  onChange={(e) => context.handleInput(e, "loginForm")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      context.handleLogin(e, () => {
                        this.props.history.push("/");
                      });
                    }
                  }}
                />
              </Form.Group>
              <Button
                onClick={(e) => {
                  context.handleLogin(e, () => {
                    this.props.history.push("/");
                  });
                }}
              >
                Ingresar
              </Button>
            </Form>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}

Login.contextType = MyContext;
