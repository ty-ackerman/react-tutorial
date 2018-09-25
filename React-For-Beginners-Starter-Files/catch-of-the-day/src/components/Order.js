import React from "react";
import { formatPrice } from "../helpers";

class Order extends React.Component {
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";
    if (!fish) return null;
    if (!isAvailable) {
      return (
        <li key={`unavailable-${key}`}>{`Sorry, ${
          fish ? fish.name : "fish"
        } is unavailable`}</li>
      );
    } else {
      return (
        <li key={`available-${key}`}>
          {count} lbs {fish.name}
          {formatPrice(count * fish.price)}
        </li>
        //The code below was right btw...
        // <React.Fragment>
        //   <li key={`name-${key}`}>{this.props.fishes[key].name}</li>
        //   <li key={`price-${key}`}>
        //     {formatPrice(this.props.fishes[key].price * this.props.order[key])}
        //   </li>
        // </React.Fragment>
      );
    }
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, current) => {
      const fish = this.props.fishes[current];
      const count = this.props.order[current];
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return prevTotal + fish.price * count;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">{orderIds.map(this.renderOrder)}</ul>

        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
