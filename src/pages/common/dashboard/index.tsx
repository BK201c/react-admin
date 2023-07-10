import React from "react";
import SeatLayoutComp from "./components/SeatLayoutComp";
import getBinSet from "./getBinSet.json";

class App extends React.Component {
  seatData = getBinSet.data;

  render() {
    return <SeatLayoutComp seatData={this.seatData} />;
  }
}

export default App;
