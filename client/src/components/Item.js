import { Component } from "react";
import { Card, Button, Row, Col, Image } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import { MyContext } from "../context";
import ITEM_SERVICE from "../services/itemService";

class DetailItem extends Component {
  state = {
    item: {},
    onCart: false,
  };

  componentDidMount() {
    ITEM_SERVICE.getitem(this.props.match.params.id)
      .then((result) => {
        this.setState({
          item: result.data.item,
        });
        this.context.user.cart.forEach((elem) => {
          if (elem.itemCart._id === this.state.item._id) {
            this.setState({ onCart: true });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <MyContext.Consumer>
        {(context) => (
          <div
            className="mt-5 text-center mb-5"
            style={{ textAlign: "center" }}
          >
            <Card>
              <Card.Header>{this.state.item.name}</Card.Header>
              <Card.Body style={{ textAlign: "center" }}>
                <Row className="align-items-center">
                  <Col sm={8}>
                    <Image
                      variant="top"
                      src={this.state.item.image}
                      alt={this.state.item.name}
                      className="img-fluid"
                      rounded
                    />
                  </Col>
                  <Col sm={4} className="align-middle">
                    <div>
                      <Card.Title>
                        Precio:{" "}
                        <CurrencyFormat
                          value={this.state.item.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                          fixedDecimalScale={true}
                          decimalScale={2}
                        />
                      </Card.Title>
                      <Card.Text>{this.state.item.description}</Card.Text>
                      <div className="d-flex align-items-center justify-content-around">
                        <i
                          className="ri-arrow-left-circle-fill"
                          style={{ fontSize: "35px", color: "#007BFF" }}
                          onClick={() => this.props.history.push("/")}
                        ></i>
                        {!this.state.onCart && (
                          <Button
                            variant="primary"
                            onClick={(e) => {
                              if (context.loggedUser) {
                                context.addItem(e, this.state.item._id);
                                this.setState({ onCart: true });
                              } else {
                                this.props.history.push("/login");
                              }
                            }}
                          >
                            Agregar al carrito
                          </Button>
                        )}
                        {this.state.onCart && (
                          <Button variant="secondary" disabled>
                            Ya está en el carrito
                          </Button>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
DetailItem.contextType = MyContext;
export default DetailItem;
