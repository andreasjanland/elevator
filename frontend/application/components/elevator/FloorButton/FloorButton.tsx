import * as React from "react";

interface IProperties {
  floor: number;
  clickHandler: any;
}

const FloorButton: React.SFC<IProperties> = ({ floor, clickHandler }) => {
  return <button onClick={() => clickHandler(floor)}>{floor}</button>;
};

export default FloorButton;
