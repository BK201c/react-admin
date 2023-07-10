import * as React from "react";
import { fabric } from "fabric";

class SeatLayoutComponent extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvas = new fabric.Canvas(this.canvasRef.current);

    const seatData = this.props.seatData;
    const seatWidth = 35;
    const seatHeight = 35;
    const seatDist = 3;

    for (const key in seatData) {
      const seatId = seatData[key];
      if (seatId) {
        const [shelf, column, row] = key.split("_").slice(-3).map(Number);
        // debugger;

        const seat = new fabric.Rect({
          width: seatWidth,
          height: seatHeight,
          fill: "blue",
          stroke: "#fff",
          strokeWidth: seatDist,
          left: column * seatWidth,
          top: row * seatHeight,
        });

        const text = new fabric.Text(`${column}-${row}`, {
          fontSize: 16,
          fill: "white",
          left: column * seatWidth + seatWidth / 2,
          top: row * seatHeight + seatHeight / 2,
          originX: "center",
          originY: "center",
        });

        canvas.add(seat, text);
      }
    }

    this.canvas = canvas;
  }

  componentWillUnmount() {
    this.canvas.dispose();
  }

  render() {
    return <canvas ref={this.canvasRef} width={1080} height={920} />;
  }
}

export default SeatLayoutComponent;
