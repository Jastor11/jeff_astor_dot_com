import React from "react"
import media from "src/utils/media"
import styled from "styled-components"
// https://publicdomainvectors.org/en/free-clipart/Blue-car/84272.html
import montyHallCar from "src/assets/images/montyHallCar.jpeg"
// https://statisticsblog.com/2011/11/23/monte-hall-revisited/
import montyHallGoat from "src/assets/images/montyHallGoat.gif"

const MontyHallContainer = styled.div`
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  background: var(--color-light);
  padding-bottom: 50px;
  max-width: 100vw;

  ${media.large`
    /* flex-direction: row; */
  `}

  & table {
    width: 100%;
    margin-top: 50px;
    box-shadow: var(--elevation-1);
    border-radius: 6px;
    background: white;
  }

  & td {
    padding: 0.4em;
    border: solid 1px rgb(222, 222, 222);
    text-align: center;
    background: white;
    color: var(--color-dark);

    & span {
      font-weight: bold;
      background: white;
      color: var(--color-dark);
    }
  }
`
const MontyHallMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1em;
  padding: 1em;
  max-width: 100vw;
`
const MontyHallVizContainer = styled.div`
  display: flex;
  max-width: 100vw;
`
const MontyHallInstructions = styled.div`
  font-size: 28px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100vw;

  & p {
    font-family: var(--font-heading);
    text-transform: lowercase;
  }
`
const MontyHallDataContainer = styled.div`
  margin: 0 1em;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100vw;
`
const MontyHallControls = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1em;
  max-width: 100vw;
`
const MontyHallGameButtons = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100vw;
`
const MontyHallButtonInstructions = styled.p`
  margin-top: 1em;
  margin-bottom: 0.5em;
  display: flex;
  justify-content: center;
  max-width: 100vw;
`
const MontyHallSimButtons = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100vw;
`
const MontyHallResults = styled.div`
  flex: 1;
  min-width: 270px;

  ${media.small`
    min-width: 500px;  
  `}
`
const DoorFrame = styled.div<{ $selected?: boolean; $isOpen?: boolean; $containsCar?: boolean }>`
  height: 300px;
  width: 150px;
  cursor: pointer;
  margin: 0 30px;
  background: skyblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  font-size: 22px;
  color: black;
  position: relative;
  transition: all 0.2s ease;

  ${(props) =>
    props.$selected
      ? `
          border: solid 3px red;
        `
      : `
          border: solid 3px blue;
        `}

  ${(props) =>
    props.$isOpen &&
    `
      background: white;
      background-image: url(${props.$containsCar ? montyHallCar : montyHallGoat});
      background-size: 100% 50%;
      background-position: ${props.$containsCar ? "100% 110%" : "bottom"};
      background-repeat: no-repeat;
    `}

  &:hover {
    transform: translateY(-3px) scale(1.01);
  }

  ${(props) =>
    !props.$isOpen &&
    `
      &::after {
        content: "";
        position: absolute;
        left: 10px;
        top: 50%;
        width: 10px;
        height: 10px;
        background: black;
        z-index: 20;
        border-radius: 50%;
      }
    `}

  ${media.mobileOnly`
    height: 200px;
    width: 100px;
    margin: 10px;
  `}
`

const Button = styled.button`
  padding: 8px 12px;
  font-size: 12px;
  cursor: pointer;
  margin: 5px;
  border-radius: 6px;

  ${(props) =>
    props.disabled &&
    `
    color: light-gray;
    cursor: not-allowed;
  `}
`

const SelectButton = styled(Button)`
  width: 200px;
  font-size: 20px;
`

interface IDoor {
  selectedDoor?: number
  containsCar?: boolean
  onSelect: (d: number) => void
  doorNum: number
  open?: boolean
}
const Door: React.FC<IDoor> = ({ selectedDoor, containsCar, onSelect, doorNum, open }) => (
  <DoorFrame
    $selected={selectedDoor === doorNum}
    $containsCar={containsCar}
    onClick={() => onSelect(doorNum)}
    $isOpen={open}
  >
    {doorNum}
  </DoorFrame>
)

type Choice = "switch" | "stay"
type GameState = "pick" | "option" | "results"

const MontyHall = () => {
  const [selectedDoor, setSelectedDoor] = React.useState(-1)
  const [gameState, setGameState] = React.useState<GameState>("pick")
  const [carDoor, setCarDoor] = React.useState<number>(-1)
  const [montyOpens, setMontyOpens] = React.useState<number>(-1)
  const [finalChoice, setFinalChoice] = React.useState<number>(-1)
  const [stayedStats, setStayedStats] = React.useState({
    car: 0,
    goat: 0,
    attempts: 0,
  })
  const [switchedStats, setSwitchedStats] = React.useState({
    car: 0,
    goat: 0,
    attempts: 0,
  })

  const newGame = () => {
    setSelectedDoor(-1)
    setGameState("pick")
    setCarDoor(-1)
    setMontyOpens(-1)
    setFinalChoice(-1)
  }

  const selectDoor = (n: number) => setSelectedDoor(n)

  const randomlyPickDoorNum = () => Math.floor(Math.random() * 3) + 1

  // run after the user has selected a door
  const onConfirmSelect = () => {
    let montyChoice
    let doors = [1, 2, 3]

    const selectDoor = () => doors[Math.floor(Math.random() * doors.length)]

    // choose car door (technically this should happen b4 user picks but whatever)
    const carDoor = selectDoor()
    // remove users selection from door options
    doors = doors.filter((n) => n !== selectedDoor)

    // monty hall chooses a door to open
    if (carDoor === selectedDoor) {
      // user choice correct, so pick a random door to open
      montyChoice = selectDoor()
    } else {
      // user choice incorrect, so pick open goat
      doors = doors.filter((n) => n !== carDoor)
      montyChoice = selectDoor()
    }

    setGameState("option")
    setMontyOpens(montyChoice)
    setCarDoor(carDoor)
  }

  const onConfirmSwitch = (previousUserDoor: number, doorMontyOpens: number, winningDoor: number) => {
    const doors = [1, 2, 3]
    const userFinal = doors.filter((n) => ![previousUserDoor, doorMontyOpens].includes(n))[0]

    setFinalChoice(userFinal)
    setGameState("results")
    setSwitchedStats((s) => ({
      attempts: s.attempts + 1,
      car: userFinal === winningDoor ? s.car + 1 : s.car,
      goat: userFinal !== winningDoor ? s.goat + 1 : s.goat,
    }))
  }

  const onConfirmStay = (userFinal: number, winningDoor: number) => {
    setFinalChoice(userFinal)
    setGameState("results")
    setStayedStats((s) => ({
      attempts: s.attempts + 1,
      car: userFinal === winningDoor ? s.car + 1 : s.car,
      goat: userFinal !== winningDoor ? s.goat + 1 : s.goat,
    }))
  }

  const runGame = (userDoorDecision: number) => {
    let doorMontyOpens
    let doors = [1, 2, 3]

    const selectDoor = () => doors[Math.floor(Math.random() * doors.length)]

    // choose car door (technically this should happen b4 user picks but whatever)
    const carDoor = selectDoor()
    // remove users selection from door options
    doors = doors.filter((n) => n !== userDoorDecision)

    // monty hall chooses a door to open
    if (carDoor === userDoorDecision) {
      // user choice correct, so pick a random door to open
      doorMontyOpens = selectDoor()
    } else {
      // user choice incorrect, so pick open goat
      doors = doors.filter((n) => n !== carDoor)
      doorMontyOpens = selectDoor()
    }

    return { doorMontyOpens, carDoor, userDoorDecision }
  }

  /**
   * Simulates running one monty hall show
   *
   * @param {String} choice - either switch or stay
   */
  const simulateRound = (choice: Choice) => {
    const userPick = randomlyPickDoorNum()

    const { doorMontyOpens, carDoor } = runGame(userPick)

    // user makes a decision
    if (choice === "switch") {
      onConfirmSwitch(userPick, doorMontyOpens, carDoor)
    } else {
      onConfirmStay(userPick, carDoor)
    }
  }

  const simulateGames = (numTimes: number = 1, choice: Choice = "switch") => {
    for (let i = 0; i < numTimes; i++) {
      simulateRound(choice)
    }
  }

  const clearResults = () => {
    setStayedStats({
      attempts: 0,
      car: 0,
      goat: 0,
    })
    setSwitchedStats({
      attempts: 0,
      car: 0,
      goat: 0,
    })
  }

  return (
    <MontyHallContainer>
      <MontyHallMain>
        <MontyHallInstructions>
          {gameState === "pick" && <p>Pick a door</p>}
          {gameState === "option" && <p>Stay or Switch?</p>}
          {gameState === "results" && <p>{finalChoice === carDoor ? "You won!" : "You got a goat..."}</p>}
        </MontyHallInstructions>
        <MontyHallVizContainer>
          {[1, 2, 3].map((n) => (
            <Door
              key={n}
              doorNum={n}
              onSelect={(n) => gameState === "pick" && selectDoor(n)}
              selectedDoor={gameState === "results" ? finalChoice : selectedDoor}
              containsCar={carDoor === n}
              open={gameState === "results" || montyOpens === n}
            />
          ))}
        </MontyHallVizContainer>
        <SelectButton
          onClick={() => gameState === "pick" && selectedDoor && onConfirmSelect()}
          disabled={gameState !== "pick" || !selectedDoor}
        >
          Select
        </SelectButton>
      </MontyHallMain>
      <MontyHallDataContainer>
        <MontyHallControls>
          <MontyHallGameButtons>
            <Button
              onClick={() => gameState === "pick" && selectDoor(randomlyPickDoorNum())}
              disabled={gameState !== "pick"}
            >
              Randomly Pick Door
            </Button>
            <Button
              onClick={() => gameState === "option" && onConfirmSwitch(selectedDoor, montyOpens, carDoor)}
              disabled={gameState !== "option"}
            >
              Switch
            </Button>
            <Button
              onClick={() => gameState === "option" && onConfirmStay(selectedDoor, carDoor)}
              disabled={gameState !== "option"}
            >
              Stay
            </Button>
            <Button onClick={() => newGame()}>New Game</Button>
          </MontyHallGameButtons>
          <MontyHallButtonInstructions>Play the game here or simulate below.</MontyHallButtonInstructions>
          <MontyHallSimButtons>
            <Button onClick={() => simulateGames(1000, "switch")}>Switch 1000 times</Button>
            <Button onClick={() => simulateGames(1000, "stay")}>Stay 1000 times</Button>
            <Button onClick={() => clearResults()}>Clear</Button>
          </MontyHallSimButtons>
        </MontyHallControls>
        <MontyHallResults>
          <table>
            <thead>
              <tr>
                <td></td>
                <td>Switched </td>
                <td>Stayed</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Attempts</td>
                <td>{switchedStats.attempts || 0}</td>
                <td>{stayedStats.attempts || 0}</td>
              </tr>
              <tr>
                <td>Goats</td>
                <td>{switchedStats.goat || 0}</td>
                <td>{stayedStats.goat || 0}</td>
              </tr>
              <tr>
                <td>Cars</td>
                <td>{switchedStats.car || 0}</td>
                <td>{stayedStats.car || 0}</td>
              </tr>
              <tr>
                <td>Won %</td>
                <td>{Number((switchedStats.car / switchedStats.attempts) * 100 || 0).toFixed(1)}</td>
                <td>{Number((stayedStats.car / stayedStats.attempts) * 100 || 0).toFixed(1)}</td>
              </tr>
            </tbody>
          </table>
        </MontyHallResults>
      </MontyHallDataContainer>
    </MontyHallContainer>
  )
}

// class MontyHall extends React.Component {
//   state = {
//     selectedDoor: null,
//     gameState: "pick", // pick, option, results
//     carDoor: null,
//     montyOpens: null,
//     finalChoice: null,
//     stayed: {
//       car: 0,
//       goat: 0,
//       attempts: 0,
//     },
//     switched: {
//       car: 0,
//       goat: 0,
//       attempts: 0,
//     },
//     // results: [],
//   }

//   newGame = () =>
//     this.setState({
//       selectedDoor: null,
//       gameState: "pick", // pick, option, result
//       carDoor: null,
//       montyOpens: null,
//       userFinal: null,
//     })

//   selectDoor = (n) => this.setState({ selectedDoor: n })

//   randomlyPickDoorNum = () => Math.floor(Math.random() * 3) + 1

//   onConfirmSelect = () => {
//     let montyChoice
//     const { selectedDoor } = this.state
//     const doors = [1, 2, 3]
//     const selectDoor = () => doors[Math.floor(Math.random() * doors.length)]

//     // choose car door
//     const carDoor = selectDoor()
//     // remove the users selection from door options
//     _remove(doors, (n) => n === selectedDoor)

//     // monty hall chooses a door to open
//     if (carDoor === selectedDoor) {
//       // user choice correct, so pick a random door to open
//       montyChoice = selectDoor()
//     } else {
//       // user choice incorrect, so pick open goat
//       _remove(doors, (n) => n === carDoor)
//       montyChoice = selectDoor()
//     }

//     this.setState({
//       gameState: "option",
//       montyOpens: montyChoice,
//       carDoor: carDoor,
//     })
//   }

//   onConfirmSwitch = () => {
//     this.setState((s) => {
//       const finalChoice = [1, 2, 3].filter((n) => n !== s.selectedDoor && n !== s.montyOpens)[0]

//       return {
//         ...s,
//         finalChoice,
//         gameState: "results",
//         switched: {
//           attempts: s.switched.attempts + 1,
//           car: finalChoice === s.carDoor ? s.switched.car + 1 : s.switched.car,
//           goat: finalChoice !== s.carDoor ? s.switched.goat + 1 : s.switched.goat,
//         },
//       }
//     })
//   }

//   onConfirmStay = () => {
//     this.setState((s) => {
//       return {
//         ...s,
//         finalChoice: s.selectedDoor,
//         gameState: "results",
//         stayed: {
//           attempts: s.stayed.attempts + 1,
//           car: s.selectedDoor === s.carDoor ? s.stayed.car + 1 : s.stayed.car,
//           goat: s.selectedDoor !== s.carDoor ? s.stayed.goat + 1 : s.stayed.goat,
//         },
//       }
//     })
//   }

//   /**
//    * Simulates running one monty hall show
//    *
//    * @param {String} choice - either switch or stay
//    */
//   runGame = (choice) => {
//     let montyOpens, userFinal
//     // initialize doors & select one to hold the car
//     const doors = [1, 2, 3]
//     const selectDoor = () => doors[Math.floor(Math.random() * doors.length)]

//     const carDoor = selectDoor()

//     // randomly pick for the user
//     const userPick = selectDoor()

//     // remove that number from montys choices
//     _remove(doors, (n) => n === userPick)

//     // monty reveals a goat
//     if (userPick === carDoor) {
//       // if the contestant picks the car,
//       // monty opens up one of the two at random
//       montyOpens = selectDoor()
//     } else {
//       // if the constestant didn't pick the car
//       // money opens up the one that's not the car
//       _remove(doors, (n) => n === carDoor)
//       montyOpens = selectDoor()
//     }

//     // user makes a decision
//     if (choice === "switch") {
//       userFinal = [1, 2, 3].filter((n) => n !== userPick && n !== montyOpens)[0]

//       this.setState((s) => {
//         return {
//           ...s,
//           switched: {
//             attempts: s.switched.attempts + 1,
//             car: userFinal === carDoor ? s.switched.car + 1 : s.switched.car,
//             goat: userFinal !== carDoor ? s.switched.goat + 1 : s.switched.goat,
//           },
//         }
//       })
//     } else {
//       userFinal = Number(userPick)

//       this.setState((s) => {
//         return {
//           ...s,
//           stayed: {
//             attempts: s.stayed.attempts + 1,
//             car: userFinal === carDoor ? s.stayed.car + 1 : s.stayed.car,
//             goat: userFinal !== carDoor ? s.stayed.goat + 1 : s.stayed.goat,
//           },
//         }
//       })
//     }
//   }

//   simulateGames = (numTimes = 1, choice = "switch") => {
//     for (let i = 0; i < numTimes; i++) {
//       this.runGame(choice)
//     }
//   }

//   clearResults = () =>
//     this.setState((s) => ({
//       ...s,
//       stayed: {
//         attempts: 0,
//         car: 0,
//         goat: 0,
//       },
//       switched: {
//         attempts: 0,
//         car: 0,
//         goat: 0,
//       },
//     }))

//   render() {
//     const { selectedDoor, gameState, montyOpens, carDoor, finalChoice, stayed, switched } = this.state

//     return (
//       <MontyHallContainer>
//         <MontyHallMain>
//           <MontyHallInstructions>
//             {gameState === "pick" && <p>Pick a door</p>}
//             {gameState === "option" && <p>Stay or Switch?</p>}
//             {gameState === "results" && <p>{finalChoice === carDoor ? "You won!" : "You got a goat..."}</p>}
//           </MontyHallInstructions>
//           <MontyHallVizContainer>
//             {[1, 2, 3].map((n) => (
//               <Door
//                 key={n}
//                 doorNum={n}
//                 onSelect={(n) => gameState === "pick" && this.selectDoor(n)}
//                 selectedDoor={gameState === "results" ? finalChoice : selectedDoor}
//                 containsCar={carDoor === n}
//                 open={gameState === "results" || montyOpens === n}
//               />
//             ))}
//           </MontyHallVizContainer>
//           <SelectButton
//             onClick={() => gameState === "pick" && selectedDoor && this.onConfirmSelect()}
//             disabled={gameState !== "pick" || !selectedDoor}
//           >
//             Select
//           </SelectButton>
//         </MontyHallMain>
//         <MontyHallDataContainer>
//           <MontyHallControls>
//             <MontyHallGameButtons>
//               <Button
//                 onClick={() => gameState === "pick" && this.selectDoor(this.randomlyPickDoorNum())}
//                 disabled={gameState !== "pick"}
//               >
//                 Randomly Pick Door
//               </Button>
//               <Button
//                 onClick={() => gameState === "option" && this.onConfirmSwitch()}
//                 disabled={gameState !== "option"}
//               >
//                 Switch
//               </Button>
//               <Button onClick={() => gameState === "option" && this.onConfirmStay()} disabled={gameState !== "option"}>
//                 Stay
//               </Button>
//               <Button onClick={this.newGame}>New Game</Button>
//             </MontyHallGameButtons>
//             <MontyHallButtonInstructions>Play the game here or simulate below.</MontyHallButtonInstructions>
//             <MontyHallSimButtons>
//               <Button onClick={() => this.simulateGames(1000, "switch")}>Switch 1000 times</Button>
//               <Button onClick={() => this.simulateGames(1000, "stay")}>Stay 1000 times</Button>
//               <Button onClick={this.clearResults}>Clear</Button>
//             </MontyHallSimButtons>
//           </MontyHallControls>
//           <MontyHallResults>
//             <table>
//               <thead>
//                 <tr>
//                   <td></td>
//                   <td>Switched </td>
//                   <td>Stayed</td>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>Attempts</td>
//                   <td>{switched.attempts || 0}</td>
//                   <td>{stayed.attempts || 0}</td>
//                 </tr>
//                 <tr>
//                   <td>Goats</td>
//                   <td>{switched.goat || 0}</td>
//                   <td>{stayed.goat || 0}</td>
//                 </tr>
//                 <tr>
//                   <td>Cars</td>
//                   <td>{switched.car || 0}</td>
//                   <td>{stayed.car || 0}</td>
//                 </tr>
//                 <tr>
//                   <td>Won %</td>
//                   <td>{Number((switched.car / switched.attempts) * 100 || 0).toFixed(1)}</td>
//                   <td>{Number((stayed.car / stayed.attempts) * 100 || 0).toFixed(1)}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </MontyHallResults>
//         </MontyHallDataContainer>
//       </MontyHallContainer>
//     )
//   }
// }

export default MontyHall
