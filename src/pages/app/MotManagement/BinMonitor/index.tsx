import * as React from "react";
import SeatLayoutComp from "./components/SeatLayoutComp";
class App extends React.Component {
  constructor() {
    super();
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <SeatLayoutComp></SeatLayoutComp>
      </div>
    );
  }
}

export default App;
