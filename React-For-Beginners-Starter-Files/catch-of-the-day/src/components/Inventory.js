import React from "react";
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  state = {
    uid: null,
    owner: null
  };

  authHandler = async authData => {
    console.log(authData);
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    //THE CODE BELOW WILL BE REALLY IMPORTANT FOR THE BEER-FRIDGE APP
    // const dbRef = firebase.database().ref();
    // console.log(dbRef);
    // dbRef.on("value", data => {
    //   // console.log(Object.keys(data.val()));
    //   let store = data.val();
    //   console.log(store);
    //   Object.keys(store).map(index => {
    //     if (store[index].owner) {
    //       console.log(store[index]);
    //     }
    //   });
    // });
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({
      uid: null
    });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  render() {
    const logout = <button onClick={this.logout}>Logout</button>;
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    } else if (this.state.uid !== this.state.owner) {
      return (
        <div>
          {logout}
          <p>You are NOT THE OWNER</p>
        </div>
      );
    } else {
      return (
        <div className="inventory">
          <h2>Inventory</h2>
          {Object.keys(this.props.fishes).map(key => {
            return (
              <EditFishForm
                key={key}
                fish={this.props.fishes[key]}
                updateFish={this.props.updateFish}
                thisFish={key}
                deleteFish={this.props.deleteFish}
              />
            );
          })}
          <AddFishForm addFish={this.props.addFish} />
          <button onClick={this.props.loadSampleFishes}>
            Load Sample Fishes
          </button>
          {logout}
        </div>
      );
    }
  }
}

export default Inventory;
