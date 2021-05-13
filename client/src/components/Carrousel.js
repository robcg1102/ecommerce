import React, { Component } from "react";
import { Carousel } from "react-bootstrap";

export default class Carrousel extends Component {
  render() {
    return (
      <div>
        <Carousel className="carousel">
          <Carousel.Item>
            <img
              className="d-block img-fluid"
              src="https://res.cloudinary.com/robcg1102/image/upload/v1619122196/ecommerce/e-commerce_zvfyda.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Pide desde cualquier lugar</h3>
              <p>Realiza tus compras desde tu celular o desde tu computadora</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block img-fluid"
              src="https://res.cloudinary.com/robcg1102/image/upload/v1619122196/ecommerce/delivery_d9pu0f.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Envíos gratis</h3>
              <p>Envíos gratis y con nuestros distintos sistemas de entrega</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block img-fluid"
              src="https://res.cloudinary.com/robcg1102/image/upload/v1619122196/ecommerce/ecommerce-graphic_h85c4u.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Una gran diversidad de artículos</h3>
              <p>La cantidad de artículos a comprar solo tú la determinas</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}
