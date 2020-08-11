import * as React from "react";
import FloorButton from "../FloorButton/FloorButton";

interface IProperties {
  floors: [];
  clickHandler: any;
}
class ButtonPanel extends React.Component<IProperties> {
  public render() {
    const { floors, clickHandler } = this.props;

    return (
      <>
        {floors.map(item => (
          <FloorButton
            key={item.floor}
            floor={item.floor}
            clickHandler={clickHandler}
          />
        ))}
      </>
    );
  }
}

export default ButtonPanel;
