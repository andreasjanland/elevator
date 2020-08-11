import * as cors from "kcors";
import * as Koa from "koa";
import * as bodyparser from "koa-bodyparser";
import * as Router from "koa-router";

const app = new Koa();
const router = new Router();
const elevators = [
  { name: "A", direction: "idle", destination: null, floor: 2 },
  { name: "B", direction: "idle", destination: null, floor: 4 },
  { name: "C", direction: "idle", destination: null, floor: 11 },
  { name: "D", direction: "idle", destination: null, floor: 19 },
  { name: "E", direction: "idle", destination: null, floor: 12 }
];
const floors = [
  { floor: 0, requesting: false },
  { floor: 1, requesting: false },
  { floor: 2, requesting: false },
  { floor: 3, requesting: false },
  { floor: 4, requesting: false },
  { floor: 5, requesting: false },
  { floor: 6, requesting: false },
  { floor: 7, requesting: false },
  { floor: 8, requesting: false },
  { floor: 9, requesting: false },
  { floor: 10, requesting: false },
  { floor: 11, requesting: false },
  { floor: 12, requesting: false },
  { floor: 13, requesting: false },
  { floor: 14, requesting: false },
  { floor: 15, requesting: false },
  { floor: 16, requesting: false },
  { floor: 17, requesting: false },
  { floor: 18, requesting: false },
  { floor: 19, requesting: false },
  { floor: 20, requesting: false }
];

const getMostSutitableElevator = floor =>
  // Sort elevators by closest floors
  // Then filter idle elevators and elevators that is approaching the requested floor
  elevators
    .sort((a, b) => Math.abs(a.floor - floor) - Math.abs(b.floor - floor))
    .filter(
      elevator => elevator.destination >= floor || elevator.direction === "idle"
    )[0];

const getFloor = floor => floors.find(f => f.floor === floor);

const startElevator = (elevator, requestedFloor) => {
  const destination = requestedFloor.floor;

  elevator.destination = destination;
  elevator.direction = elevator.floor > destination ? "down" : "up";

  const moveElevator = setInterval(() => {
    // Move elevator 1 floor every 2 seconds
    elevator.floor += elevator.floor > destination ? -1 : 1;

    if (elevator.floor === destination) {
      // Make elevator idle when destination is reached
      elevator.direction = "idle";
      elevator.destination = null;

      requestedFloor.requesting = false;
      clearInterval(moveElevator);
    }
  }, 2000);
};

// Routes
router.get("/elevators", context => {
  context.response.body = {
    elevators
  };
  context.response.status = 200;
});

router.get("/floors", context => {
  context.response.body = {
    floors
  };
  context.response.status = 200;
});

router.post("/request", context => {
  const requestedFloor = getFloor(context.request.body.floor);
  const closestElevator = getMostSutitableElevator(requestedFloor.floor);

  if (!requestedFloor.requesting) {
    requestedFloor.requesting = true;
    startElevator(closestElevator, requestedFloor);
    context.response.status = 200;
  }
});

app.use(
  bodyparser({
    enableTypes: ["json"]
  })
);
app.use(cors());

app.use(router.routes());

app.listen(3000);
