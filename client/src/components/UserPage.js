import React, { Component } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import { MyContext } from "../context";
import Moment from "react-moment";
import "moment/locale/es";

export default class UserPage extends Component {
  componentDidMount() {
    if (!document.cookie) {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <MyContext.Consumer>
        {(context) => (
          <div className="mt-4" style={{ marginBottom: "150px" }}>
            {context.loggedUser && context.user.purchases.length === 0 && (
              <div style={{ textAlign: "center" }}>
                <h2>
                  {context.user.name}, por el momento no has realizado ninguna
                  compra
                </h2>
                <img
                  src="/lostcart.png"
                  alt=""
                  className="img-fluid"
                  id="lostcart"
                />
              </div>
            )}
            {context.loggedUser && context.user.purchases.length > 0 && (
              <div>
                <h2>Estas son tus compras: </h2>
                {context.user.purchases.map((article) => (
                  <Accordion key={article._id}>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="0"
                        >
                          Fecha de compra:{" "}
                          <Moment format="D MMM YYYY" withTitle>
                            {article.date}
                          </Moment>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <h5>Id de tu compra: {article._id}</h5>
                          <p>Artículos:</p>
                          <ul>
                            {article.items.map((data) => (
                              <li key={data}> {data}</li>
                            ))}
                          </ul>
                          <h4>
                            Total:{" "}
                            <CurrencyFormat
                              value={article.total}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                              fixedDecimalScale={true}
                              decimalScale={2}
                            />
                          </h4>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                ))}
              </div>
            )}
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}

UserPage.contextType = MyContext;
