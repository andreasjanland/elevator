import * as React from "react";
import axios from "axios";
import ButtonPanel from "../../components/elevator/ButtonPanel/ButtonPanel";
import ElevatorsPanel from "../../components/elevator/ElevatorsPanel/ElevatorsPanel";

const API_URL = "http://localhost:3000";

class ImplementationPage extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      floors: [],
      elevators: [],
      loading: true
    };
  }

  public getFloors() {
    return new Promise((resolve, reject) => {
      axios
        .get(API_URL + "/floors")
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  public getElevators() {
    return new Promise((resolve, reject) => {
      axios
        .get(API_URL + "/elevators")
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  public componentDidMount() {
    this.getFloors().then(floors => {
      this.setState({
        floors: floors.data.floors,
        loading: false
      });
    });

    setInterval(() => {
      this.getElevators().then(elevators => {
        this.setState({
          elevators: elevators.data.elevators.sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
          loading: false
        });
      });
    }, 2000);
  }

  public requestElevator(floor) {
    axios
      .post(API_URL + "/request", { floor: floor })
      .then(data => {
        //console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  public render() {
    return (
      <>
        {!this.state.loading && (
          <div>
            <ElevatorsPanel elevators={this.state.elevators} />
            <ButtonPanel
              floors={this.state.floors}
              clickHandler={this.requestElevator}
            />
          </div>
        )}
      </>
    );
  }
}

export default ImplementationPage;
