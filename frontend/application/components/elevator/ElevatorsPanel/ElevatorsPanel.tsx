import * as React from "react";
import ElevatorsItem from "../ElevatorsItem/ElevatorsItem";

interface IProperties {
  elevators: [];
}
class ElevatorsPanel extends React.Component<IProperties> {
  public render() {
    console.log(this.props.elevators);
    return (
      <>
        {this.props.elevators.map((item, index) => (
          <ElevatorsItem
            key={index}
            currentFloor={item.floor}
            name={item.name}
          />
        ))}
      </>
    );
  }
}

export default ElevatorsPanel;
