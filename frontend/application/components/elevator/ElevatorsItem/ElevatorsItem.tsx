import * as React from "react";

interface IProperties {
  currentFloor: number;
  name: string;
}

const FloorButton: React.SFC<IProperties> = ({ currentFloor, name }) => {
  return (
    <div>
      <span className="name">{name}</span>
      <span className="floor">{currentFloor}</span>
    </div>
  );
};

export default FloorButton;
