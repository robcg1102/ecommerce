import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import { MyContext } from "../context";
import ITEM_SERVICE from "../services/itemService";
import ItemCard from "./ItemCard";

class SearchItem extends Component {
  state = {
    resultItem: [],
    loading: true,
  };

  componentDidMount() {
    const search = this.props.match.params.item;
    const myRegex = new RegExp(search, "i");
    ITEM_SERVICE.allitems().then((result) => {
      const allitems = result.data.items;

      const searchResult = allitems.filter((item) => myRegex.test(item.name));
      this.setState({
        resultItem: searchResult,
        loading: false,
      });
    });
  }

  render() {
    return (
      <div className="mb-5">
        <div>
          Resultados de tu búsqueda :<h3>{this.props.match.params.item}</h3>
        </div>
        {this.state.loading && <Spinner animation="border" />}
        <div className="itemsHome mt-3">
          {!this.state.loading &&
            this.state.resultItem.length > 0 &&
            this.state.resultItem.map((item) => {
              return <ItemCard item={item} key={item._id} />;
            })}
        </div>
        {!this.state.loading && this.state.resultItem.length === 0 && (
          <div style={{textAlign: "center"}}>
            <h2>No hay artículos con tu búsqueda</h2>
            <img src="/lostcart.png" alt="" className="img-fluid" id="lostcart"/>
          </div>
        )}
      </div>
    );
  }
}

SearchItem.contextType = MyContext;
export default SearchItem;
