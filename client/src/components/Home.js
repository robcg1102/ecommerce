import { Component } from "react";
import { Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MyContext } from "../context";
import ITEM_SERVICE from "../services/itemService";
import Carrousel from "./Carrousel";
import ItemCard from "./ItemCard";

export default class Home extends Component {
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
    let limit = 0;
    return (
      <MyContext.Consumer>
        {(context) => (
          <Container className="mt-3">
            {context.loggedUser && <h1>Hola, {context.user.name}</h1>}
            {!context.loggedUser && <h1>Hola</h1>}
            <div>
              <Carrousel />
            </div>
            <hr />
            <div className="ourWork">
              <div className="workCard">
                <i
                  className="ri-rotate-lock-fill"
                  style={{ fontSize: "150px" }}
                ></i>
                <p>Compras protegidas</p>
              </div>
              <div className="workCard">
                <i
                  className="ri-customer-service-2-fill"
                  style={{ fontSize: "150px" }}
                ></i>
                <p>Servicio a cliente</p>
              </div>
              <div className="workCard">
                <i className="ri-truck-fill" style={{ fontSize: "150px" }}></i>
                <p>Envío gratuito</p>
              </div>
              <div className="workCard">
                <i
                  className="ri-currency-fill"
                  style={{ fontSize: "150px" }}
                ></i>
                <p>Devoluciones sencillas</p>
              </div>
            </div>
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
                <h3>Últimos artículos</h3>
                <hr/>
                <div className="itemsHome mt-3">
                  {this.state.items.map((item) => {
                    if (limit > 8) {
                      return null;
                    }
                    limit = limit + 1;
                    return <ItemCard item={item} key={item._id} />;
                  })}
                </div>
                <Link to="/allarticles">Todos los artículos</Link>
              </div>
            )}
          </Container>
        )}
      </MyContext.Consumer>
    );
  }
}
