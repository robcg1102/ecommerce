import { Component } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";

export default class ItemCard extends Component {
  render() {
    return (
      <Card
        className="text-center mr-3 mb-3 itemCard"
        to={`/item/${this.props.item._id}`}
      >
        <Card.Header>{this.props.item.name}</Card.Header>
        <Card.Body>
          <img
            src={this.props.item.image}
            alt={this.props.item.name}
            style={{ height: "120px" }}
          />
          <Card.Text>
            Precio:{" "}
            <Badge variant="success">
              <CurrencyFormat
                value={this.props.item.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                fixedDecimalScale={true}
                decimalScale={2}
              />
            </Badge>{" "}
          </Card.Text>
          <Link to={`/item/${this.props.item._id}`}>
            <Button variant="danger">Detalles</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
