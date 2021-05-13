import { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { MyContext } from "../context";

class FormItem extends Component {
  componentDidMount() {
    if (!document.cookie) {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <MyContext.Consumer>
        {(context) => (
          <div className="mt-3 mb-4">
            <h3>Pon a la venta un producto</h3>
            <Form
              onSubmit={(e) => {
                context.createItem(e, () => {
                  this.props.history.push("/");
                });
              }}
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Nombre del producto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Pantalón de mezclilla"
                  name="name"
                  value={context.itemForm.name}
                  onChange={(e) => context.handleInput(e, "itemForm")}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Precio del producto</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={context.itemForm.price}
                  onChange={(e) => context.handleInput(e, "itemForm")}
                  step="any"
                  min="1"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Descripción del producto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Pantalones talla 32 para caballero"
                  name="description"
                  value={context.itemForm.description}
                  onChange={(e) => context.handleInput(e, "itemForm")}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.File
                  id="exampleFormControlFile1"
                  label="Imagen del producto"
                  name="file"
                  onChange={(e) => context.handleFile(e, "itemForm")}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Crear item
              </Button>
            </Form>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
FormItem.contextType = MyContext;
export default FormItem;
