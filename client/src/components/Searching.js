import React, { Component } from "react";

export default class Searching extends Component {
  componentDidMount() {
    const item = this.props.match.params.item;
    this.props.history.push(`/search/${item}`);
  }
  render() {
    return <div>
        <br/>
    </div>;
  }
}
