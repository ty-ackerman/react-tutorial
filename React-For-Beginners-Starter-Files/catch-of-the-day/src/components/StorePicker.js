import React from "react";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  myInput = React.createRef();

  goToStore = e => {
    //stop form from submitting
    e.preventDefault();
    //get text from input
    const storeName = this.myInput.current.value;
    // const storeName = this.myInput.value.value;
    //change page to store/whaever-they-entered
    this.props.history.push(`/store/${storeName}`);
  };

  // handleChange = () => {
  //   console.log(this.myInput.value.value);
  // };

  render() {
    return (
      <form action="" className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          required
          ref={this.myInput}
          placeholder="Store Name"
          defaultValue={getFunName()}
          // onChange={this.handleChange}
        />
        <button onClick={this.handleClick} type="submit">
          Visit Store
        </button>
      </form>
    );
  }
}

export default StorePicker;
