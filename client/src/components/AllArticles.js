import React, { Component } from "react";
import { Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MyContext } from "../context";
import ITEM_SERVICE from "../services/itemService";
import ItemCard from "./ItemCard";

export default class AllArticles extends Component {
  state = {
    items: [],
    loading: true,
  };

  componentDidMount() {
    ITEM_SERVICE.allitems()
      .then((result) => {
        const myData = result.data.items;
        this.setState({
          items: myData,
          loading: false,
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
          <Container className="mt-3">
            {this.state.loading && (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}
            {!this.state.loading && this.state.items.length === 0 && (
              <h1>Por el momento no hay items</h1>
            )}
            {!this.state.loading && this.state.items.length > 0 && (
              <div>
                <h3>Todos nuestros artículos</h3>
                <hr />
                <div className="itemsHome mt-3">
                  {this.state.items.map((item) => {
                    return <ItemCard item={item} key={item._id} />;
                  })}
                </div>
                <Link to="/">Inicio</Link>
              </div>
            )}
          </Container>
        )}
      </MyContext.Consumer>
    );
  }
}
