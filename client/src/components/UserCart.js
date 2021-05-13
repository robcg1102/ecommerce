import { Component } from "react";
import { Button, Table } from "react-bootstrap";
import { MyContext } from "../context";
import CurrencyFormat from "react-currency-format";

import Swal from "sweetalert2";
import AUTH_SERVICE from "../services/authService";

class UserCart extends Component {
  componentDidMount() {
    if (!document.cookie) {
      this.props.history.push("/login");
    }
  }

  componentWillUnmount() {
    if (this.context.user.cart.length > 0) {
      console.log("hay cosas en el carrito")
      this.context.user.cart.forEach(async (item, index) => {
        await AUTH_SERVICE.updateItem(
          this.context.user._id,
          item._id,
          this.context.user.cart[index].count
        ).then((result) => {
          this.context.updateDataUser();
        });
      });
    }
  }

  payCart = () => {
    const itemsCart = [];
    this.context.user.cart.map((item) => {
      itemsCart.push(item.itemCart.name);

      return null;
    });
    Swal.mixin({
      input: "text",
      confirmButtonText: "Next &rarr;",
      showCancelButton: true,
      progressSteps: ["1", "2", "3"],
    })
      .queue([
        {
          title: "Datos de Tarjeta (Ficticia)",
          html: `<h3>Proporciona los 16 dígitos de tu tarjeta</h3>`,
        },
        {
          title: "Datos de Tarjeta (Ficticia)",
          html: `<h3>Fecha de vencimiento de tu tarjeta</h3>`,
        },
        {
          title: "Datos de Tarjeta (Ficticia)",
          html: `<h3>Código de seguridad de tu tarjeta</h3>`,
        },
      ])
      .then((result) => {
        if (result.value) {
          AUTH_SERVICE.addpurchase(
            this.context.user._id,
            itemsCart,
            this.context.totalCart
          ).then((result) => {
            setTimeout(() => {
              Swal.fire({
                title: "¡Pago realizado!",
                html: `
                Se ha realizado el pago por tus ${this.context.user.cart.length} artículos por un total de: $ ${this.context.totalCart}
              `,
                confirmButtonText: "OK",
              });
              this.context.updateDataUser();
              this.props.history.push("/userpage");
            }, 2000);
          });
        }
      });
  };

  render() {
    return (
      <MyContext.Consumer>
        {(context) => (
          <div className="mt-3 p-3">
            <h3>Tu carrito de compras, {context.user.name}</h3>
            <div className="container">
              {context.user.cart.length > 0 && (
                <div>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {context.user.cart &&
                        context.user.cart.map((item, index) => {
                          return (
                            <tr key={item._id}>
                              <td>{item.itemCart.name}</td>
                              <CurrencyFormat
                                value={item.itemCart.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                                fixedDecimalScale={true}
                                decimalScale={2}
                              />
                              <td>
                                <input
                                  type="number"
                                  name=""
                                  id=""
                                  value={item.count}
                                  onChange={(e) =>
                                    context.handleUpdateCount(e, index)
                                  }
                                />
                              </td>
                              <td>
                                <i
                                  className="ri-delete-bin-6-fill"
                                  style={{ color: "red", fontSize: "30px" }}
                                  onClick={(e) => {
                                    context.deleteitemCart(e, item._id);
                                  }}
                                ></i>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                  <h3>
                    Total:{" "}
                    <CurrencyFormat
                      value={context.totalCart}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                      fixedDecimalScale={true}
                      decimalScale={2}
                    />
                  </h3>
                  <Button variant="primary" onClick={this.payCart}>
                    Pagar
                  </Button>
                </div>
              )}
              {context.user.cart.length === 0 && (
                <div style={{ textAlign: "center" }}>
                  <h5>Por el momento no has agregado nada a tu carrito</h5>
                  <img src="./shopping.png" alt="" className="img-fluid" />
                </div>
              )}
            </div>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}

UserCart.contextType = MyContext;
export default UserCart;
