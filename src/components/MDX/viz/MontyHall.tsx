import * as React from "react"
import * as parseUtils from "@/utils/parse-utils"
import { cn } from "@/utils/styles"

// https://publicdomainvectors.org/en/free-clipart/Blue-car/84272.html
// import montyHallCar from "src/assets/images/montyHallCar.jpeg"
import montyHallCar from "../../../assets/posts/montyHallCar.jpeg"
// https://statisticsblog.com/2011/11/23/monte-hall-revisited/
// import montyHallGoat from "src/assets/images/montyHallGoat.gif"
import montyHallGoat from "../../../assets/posts/montyHallGoat.gif"

type Choice = "switch" | "stay"
type GameState = "pick" | "option" | "results"
type ResultsStats = {
  car: number
  goat: number
  attempts: number
}

const MontyHallContainer: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <div className={cn("min-h-screen h-full", "flex flex-col", "bg-light", "max-w-screen-100%", "py-12")}>{children}</div>
)

const StyledTable: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <table className={cn("elevate-1", "w-full mt-12", "rounded-md bg-white")}>{children}</table>
)
const StyledTableD: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <td className={cn("p-2", "text-center", "bg-white text-dark", "border border-neutral-200")}>{children}</td>
)

type MontyHallResultsTableProps = {
  switchedStats: ResultsStats
  stayedStats: ResultsStats
}
function MontyHallResultsTable({ switchedStats, stayedStats }: MontyHallResultsTableProps) {
  return (
    <div className={cn("flex-1 min-w-64", "xs:min-w-op-15")}>
      <StyledTable>
        <thead>
          <tr>
            <StyledTableD></StyledTableD>
            <StyledTableD>Switched </StyledTableD>
            <StyledTableD>Stayed</StyledTableD>
          </tr>
        </thead>
        <tbody>
          <tr>
            <StyledTableD>Attempts</StyledTableD>
            <StyledTableD>{switchedStats.attempts || 0}</StyledTableD>
            <StyledTableD>{stayedStats.attempts || 0}</StyledTableD>
          </tr>
          <tr>
            <StyledTableD>Goats</StyledTableD>
            <StyledTableD>{switchedStats.goat || 0}</StyledTableD>
            <StyledTableD>{stayedStats.goat || 0}</StyledTableD>
          </tr>
          <tr>
            <StyledTableD>Cars</StyledTableD>
            <StyledTableD>{switchedStats.car || 0}</StyledTableD>
            <StyledTableD>{stayedStats.car || 0}</StyledTableD>
          </tr>
          <tr>
            <StyledTableD>Won %</StyledTableD>
            <StyledTableD>{Number((switchedStats.car / switchedStats.attempts) * 100 || 0).toFixed(1)}</StyledTableD>
            <StyledTableD>{Number((stayedStats.car / stayedStats.attempts) * 100 || 0).toFixed(1)}</StyledTableD>
          </tr>
        </tbody>
      </StyledTable>
    </div>
  )
}

const MontyHallDataContainer: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <div className={cn("mx-4 p-4", "flex flex-col items-center", "max-w-screen-100%")}>{children}</div>
)

type MontyHallControlsProps = {
  gameState: GameState
  selectDoor: (door: number) => void
  randomlyPickDoorNum: () => number
  montyOpens: number
  selectedDoor: number
  carDoor: number
  onConfirmSwitch: (selectedDoor: number, montyOpens: number, carDoor: number) => void
  onConfirmStay: (selectedDoor: number, carDoor: number) => void
  newGame: () => void
  clearResults: () => void
  simulateGames: (numGames: number, choice: Choice) => void
}
function MontyHallControls({
  gameState,
  selectDoor,
  selectedDoor,
  randomlyPickDoorNum,
  onConfirmSwitch,
  onConfirmStay,
  montyOpens,
  carDoor,
  newGame,
  clearResults,
  simulateGames,
}: MontyHallControlsProps) {
  return (
    <div className={cn("flex flex-col justify-center", "mb-4", "max-w-screen-100%")}>
      <div className={cn("flex justify-center", "max-w-screen-100%")}>
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
      </div>
      <p className={cn("mt-4 mb-2", "flex justify-center", "max-w-screen-100%")}>
        Play the game here or simulate below.
      </p>
      <div className="flex justify-center max-w-screen-100%">
        <Button onClick={() => simulateGames(1000, "switch")}>Switch 1000 times</Button>
        <Button onClick={() => simulateGames(1000, "stay")}>Stay 1000 times</Button>
        <Button onClick={() => clearResults()}>Clear</Button>
      </div>
    </div>
  )
}

const Button: React.FC<Omit<React.AllHTMLAttributes<HTMLButtonElement>, "type">> = ({
  children,
  disabled,
  className = "",
  ...props
}) => (
  <button
    className={cn(
      "elevate-1-to-0",
      "py-2 px-3",
      "text-sm",
      "cursor-pointer",
      "m-1.5",
      "rounded-md",
      "bg-white text-dark",
      "border border-neutral-300",
      "disabled:text-neutral-200 disabled:cursor-not-allowed",
      className
    )}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
)
const SelectButton: React.FC<React.AllHTMLAttributes<HTMLButtonElement>> = ({ children, disabled, ...props }) => (
  <Button disabled={disabled} className={cn("w-48 text-xl")} {...props}>
    {children}
  </Button>
)

type DoorProps = {
  selectedDoor?: number
  containsCar?: boolean
  onSelect: (d: number) => void
  doorNum: number
  isOpen?: boolean
}
const Door = ({ selectedDoor, containsCar, onSelect, doorNum, isOpen }: DoorProps) => {
  const style = isOpen
    ? {
        //
        backgroundImage: containsCar ? `url(${montyHallCar?.src})` : `url(${montyHallGoat?.src})`,
      }
    : undefined

  // console.log({ style, montyHallCar, montyHallGoat })

  return (
    <div
      onClick={() => onSelect(doorNum)}
      className={cn(
        "relative",
        "h-[200px] w-[100px] mobile:h-[300px] mobile:w-[150px]",
        "flex flex-col items-center",
        "pt-7",
        "m-2.5 mobile:my-0 mobile:mx-7",
        "cursor-pointer",
        "text-dark text-[22px]",
        "duration-200 ease-op-ease-5",
        "hover:-translate-y-1 hover:scale-105",
        "border-[3px]",
        selectedDoor === doorNum ? "border-red-500" : "border-blue-500",
        isOpen ? "bg-white monty-hall-door-open" : "monty-hall-door-closed bg-cyan-400",
        isOpen && containsCar ? "contains-car" : "",
        ""
      )}
      style={style}
    >
      {doorNum}
      <div className="door-know" />
    </div>
  )
}

type MontyHallDoorsProps = {
  gameState: GameState
  selectDoor: (door: number) => void
  montyOpens: number
  selectedDoor: number
  carDoor: number
  finalChoice: number
}
const MontyHallDoors = ({
  gameState,
  selectDoor,
  selectedDoor,
  // montyOpens,
  carDoor,
  finalChoice,
}: MontyHallDoorsProps) => (
  <div className={cn("h-24 max-w-screen-100%", "flex justify-center items-center", "text-3xl")}>
    {[1, 2, 3].map((n) => (
      <Door
        key={n}
        doorNum={n}
        onSelect={(n) => gameState === "pick" && selectDoor(n)}
        selectedDoor={gameState === "results" ? finalChoice : selectedDoor}
        containsCar={carDoor === n}
        // open={gameState === "results" || montyOpens === n}
        isOpen={gameState === "results"}
      />
    ))}
  </div>
)

const useMontyHallSimulation = () => {
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
    if (gameState !== "pick") return
    if (!parseUtils.isDefined(selectedDoor)) return
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
   * Simulates running one monty hall round
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
    newGame()
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

  return {
    selectedDoor,
    gameState,
    carDoor,
    montyOpens,
    finalChoice,
    stayedStats,
    switchedStats,
    newGame,
    selectDoor,
    randomlyPickDoorNum,
    onConfirmSelect,
    onConfirmSwitch,
    onConfirmStay,
    runGame,
    simulateRound,
    simulateGames,
    clearResults,
  }
}

export const MontyHall = () => {
  const data = useMontyHallSimulation()
  const {
    selectedDoor,
    gameState,
    carDoor,
    montyOpens,
    finalChoice,
    stayedStats,
    switchedStats,
    newGame,
    selectDoor,
    randomlyPickDoorNum,
    onConfirmSelect,
    onConfirmSwitch,
    onConfirmStay,
    simulateGames,
    clearResults,
  } = data

  return (
    <MontyHallContainer>
      <div className={cn("flex flex-col items-center", "p-4 mx-4", "max-w-screen-100%")}>
        <div className={cn("flex flex-1 max-w-screen-100%", "font-heading text-3xl lowercase", "min-h-40")}>
          {gameState === "pick" && <p>Pick a door</p>}
          {gameState === "option" && <p>Stay or Switch?</p>}
          {gameState === "results" && <p>{finalChoice === carDoor ? "You won!" : "You got a goat..."}</p>}
        </div>
        <MontyHallDoors
          gameState={gameState}
          selectDoor={selectDoor}
          finalChoice={finalChoice}
          selectedDoor={selectedDoor}
          montyOpens={montyOpens}
          carDoor={carDoor}
        />
      </div>
      <div className={cn("flex flex-col flex-1 items-center", "p-4 mt-20 mb-2 mx-4", "max-w-screen-100%")}>
        <SelectButton onClick={() => onConfirmSelect()} disabled={gameState !== "pick" || selectedDoor <= 0}>
          Select
        </SelectButton>
      </div>

      <MontyHallDataContainer>
        <MontyHallControls
          gameState={gameState}
          newGame={newGame}
          selectDoor={selectDoor}
          selectedDoor={selectedDoor}
          randomlyPickDoorNum={randomlyPickDoorNum}
          onConfirmSwitch={onConfirmSwitch}
          onConfirmStay={onConfirmStay}
          montyOpens={montyOpens}
          carDoor={carDoor}
          clearResults={clearResults}
          simulateGames={simulateGames}
        />
        <MontyHallResultsTable switchedStats={switchedStats} stayedStats={stayedStats} />
      </MontyHallDataContainer>
    </MontyHallContainer>
  )
}

export default MontyHall
