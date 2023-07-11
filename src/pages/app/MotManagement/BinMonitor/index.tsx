import * as React from "react";
import SeatLayoutComp from "./components/SeatLayoutComp";
import getBinLayout from "./getBinLayout.json";

class App extends React.Component {
  seatData = getBinLayout.data;

  render() {
    return (
      <div>
        <SeatLayoutComp source={this.seatData} />
      </div>
    );
  }
}

export default App;
