type Grid = string[][];

console.log("Lets play Rush Hour! \n");

// Lets define our current game state as a grid where each car is a different letter.
// Our special car is a marked with the specific letter T
// The boarder is a * and the gloal point on the edge is an @.
// You use a . to mark an empty space

// Grand Master
const startingGrid: Grid = [
  ["*", "*", "*", "*", "*", "*", "*", "*"],
  ["*", ".", ".", "A", "O", "O", "O", "*"],
  ["*", ".", ".", "A", ".", "B", ".", "*"],
  ["*", ".", "T", "T", "C", "B", ".", "@"],
  ["*", "D", "D", "E", "C", ".", "P", "*"],
  ["*", ".", "F", "E", "G", "G", "P", "*"],
  ["*", ".", "F", "Q", "Q", "Q", "P", "*"],
  ["*", "*", "*", "*", "*", "*", "*", "*"],
];

// Now lets print out our grid board so we can see what it looks like.

console.log("Here is your board.\n");
printGrid(startingGrid);

// All the cars in the grid, with the orientations and grid positions
type CarData = { orientation: "|" | "-"; locations: string[] };
const cars = new Map<string, CarData>();

/** Checks if string only contains letters */
const isPartOfCar = (char: string) => new RegExp(/[A-Z]/).test(char);

/** Set or update a car in the map */
const updateCar = (
  carKey: string,
  {
    orientation,
    location,
  }: { orientation: CarData["orientation"]; location: string }
) => {
  if (cars.has(carKey)) {
    const currentCar = cars.get(carKey)!;
    cars.set(carKey, {
      ...currentCar,
      locations: [...currentCar.locations, location],
    });
  } else {
    cars.set(carKey, { orientation, locations: [location] });
  }
};

// Lets find the cars on the board and the direction they are sitting
startingGrid.forEach((row, rowIndex) =>
  row.forEach((column, columnIndex) => {
    //  If the splot is a non-character we will ignore it cars are only characters
    if (isPartOfCar(column)) {
      const carKey = column;

      const location = `${rowIndex}-${columnIndex}`;
      if (
        column === startingGrid[rowIndex - 1][columnIndex] ||
        column === startingGrid[rowIndex + 1][columnIndex]
      ) {
        updateCar(carKey, { orientation: "|", location });
      } else {
        updateCar(carKey, { orientation: "-", location });
      }
    }
  })
);

// Okay we should have printed our grid and worked out the unique cars
// Lets print out our list of cars in order

console.log(
  "\nI have determined that you have used the following cars on your grid board.\n"
);
console.log(
  [...cars.entries()]
    .map(([carKey, { orientation }]) => `${carKey}${orientation}`)
    .join(" ")
);

function tryMoves() {
  /**
   Okay, this is the hard work. Take the grid we have been given. For each car see what moves are possible and try each in turn on a new grid. We will do a shallow breadth first search (BFS) rather than depth first. The BFS is achieved by throwing new sequences onto the end of a stack. You then keep pulling sequences from the front of the stack. Each time you get a new item of the stack you have to rebuild the grid to what it looks like at that point based on the previous moves, this takes more CPU but does not consume as much memory as saving all of the grid representations.
  **/
  // todo
}

function isItSolved(grid: Grid) {
  // We know we have solve the grid lock when the T is next to the @, because that means the taxi is at the door
  for (const row of grid) {
    if (row.join("").includes("T@")) return true;
  }
  return false;
}

function printGrid(myGrid: Grid) {
  myGrid.forEach((row) => {
    console.log(row.join(" "));
  });
}
