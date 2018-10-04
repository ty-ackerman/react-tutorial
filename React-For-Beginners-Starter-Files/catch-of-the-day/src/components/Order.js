import React from "react";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";
    const transitionOptions = {
      classNames: "order",
      key: { key },
      timeout: { enter: 500, exit: 500 }
    };

    if (!fish) return null;
    if (!isAvailable) {
      return (
        <div>
          <CSSTransition {...transitionOptions}>
            <li key={`unavailable-${key}`}>{`Sorry, ${
              fish ? fish.name : "fish"
            } is unavailable`}</li>
          </CSSTransition>
        </div>
      );
    } else {
      return (
        <CSSTransition
          classNames="order"
          key={key}
          timeout={{ enter: 500, exit: 500 }}
        >
          <li key={`available-${key}`}>
            <span>
              <TransitionGroup component="span" className="count">
                <CSSTransition
                  key={count}
                  classNames="count"
                  timeout={{ enter: 500, exit: 500 }}
                >
                  <span>{count}</span>
                </CSSTransition>
              </TransitionGroup>
              lbs {fish.name}
              {formatPrice(count * fish.price)}
              <button onClick={() => this.props.removeFromOrder(key)}>
                &times;
              </button>
            </span>
          </li>
        </CSSTransition>

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
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>

        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
