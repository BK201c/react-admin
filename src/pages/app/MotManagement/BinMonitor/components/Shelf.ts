interface Option {
  point: number[];
}
type ActionStatus = "hover" | "selected";
type DeviceStatus = 0 | 1;
class Shelf {
  static fill: string = "#fff";
  static strock: string = "#000";
  private point: number[];
  constructor(opt: Option) {
    this.point = opt.point;
  }

  // setStatus(status: ActionStatus) {}

  // setStatus(status: DeviceStatus) {}
}
