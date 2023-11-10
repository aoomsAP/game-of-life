import { useEffect, useRef, useState } from 'react'
import './App.css'
import { birdPattern, smallPattern, loopPattern } from "./patterns.tsx";

function LifeGameBoard() {

  // board setup: either empty or random
  const newGrid = (rows: number, columns: number, type: string) => {
    return [...Array(columns)].map(() => [...Array(rows)].map(() => {
      return type === "random" ? Math.floor(Math.random() * 2) : 0;
    }));
  }

  // initial values
  const initialSize = 50;
  const initialBoardShadow = "0px 0px 5px 3px lightgrey";
  const initialTempo = 500;

  // useStates

  // setting: type of board - empty or random
  const [type, setType] = useState<string>("clear"); 

  // setting: size of board
  const [board, setBoard] = useState<number[][]>(newGrid(initialSize, initialSize, type)); 

  // setting: tempo of interval
  const [tempo, setTempo] = useState<number>(initialTempo);

  // count of intervals - possible without state?
  const [iteration, setIteration] = useState<number>(0);

  // setting: run & pause game
  const [gameRunning, setGameRunning] = useState<boolean>(false); 

  // shadow color to indicate game is running/paused - possible without state?
  const [boardShadow, setBoardShadow] = useState<string>(initialBoardShadow);

  // setting: alive/dead when dragging cursor over board
  const [boardPaint, setBoardPaint] = useState<string>("alive");

  const identifyNeighbors = (board: number[][], rowIndex: number, columnIndex: number) => {
    return [
      (rowIndex != 0 && columnIndex != 0) ? board[rowIndex - 1][columnIndex - 1] : 0,
      (rowIndex != 0) ? board[rowIndex - 1][columnIndex] : 0,
      (rowIndex != 0 && columnIndex + 1 != board[0].length) ? board[rowIndex - 1][columnIndex + 1] : 0,
      (columnIndex != 0) ? board[rowIndex][columnIndex - 1] : 0,
      (columnIndex != board[0].length) ? board[rowIndex][columnIndex + 1] : 0,
      (rowIndex + 1 != board.length && columnIndex != 0) ? board[rowIndex + 1][columnIndex - 1] : 0,
      (rowIndex + 1 != board.length) ? board[rowIndex + 1][columnIndex] : 0,
      (rowIndex + 1 != board.length && columnIndex + 1 != board[0].length) ? board[rowIndex + 1][columnIndex + 1] : 0,
    ];
  };

  // useRef necessary to reset interval? somehow?
  const intervalId = useRef(0);

  useEffect(() => {
    // one round
    const gameOfLife = (board: number[][]) => {
      const newBoard = board.map((row, rowIndex) => {
        const newRow = row.map((square, columnIndex) => {
          const neighbors = identifyNeighbors(board, rowIndex, columnIndex);
          const aliveNeighbors = neighbors.reduce((prev, curr) => prev + curr, 0);
          let newStatus: number = 0;
          if ((square === 1 && aliveNeighbors === 2)
            || (square === 1 && aliveNeighbors === 3)
            || (square === 0 && aliveNeighbors === 3)) {
            newStatus = 1;
          }
          return newStatus;
        });
        return newRow;
      });
      setIteration(iteration => iteration + 1);
      setBoard(newBoard);
    }

    // interval loop
    if (gameRunning) {
      intervalId.current = setInterval(() => {
        gameOfLife(board);
      }, tempo);
    }

    // cleanup code: stop interval
    return () => {
      clearInterval(intervalId.current);
    }

    // dependencies
  }, [board, tempo, gameRunning]);


  const updateSize = () => {
    console.log(type);
    const rows: number = parseInt((document.getElementById("rows") as HTMLInputElement).value);
    const columns: number = parseInt((document.getElementById("columns") as HTMLInputElement).value);
    if (rows > 0 && columns > 0) {
      setBoard(newGrid(rows, columns, type));
    }
  }

  const deadOrAlive = (life: number) => {
    // black = alive = 1
    // white = death = 0
    return life === 0 ? "white" : "black";
  }

  const flipElement = (x: number, y: number) => {
    const newBoard = [...board];
    newBoard[x][y] === 1 ? newBoard[x][y] = 0 : newBoard[x][y] = 1;
    setBoard(newBoard);
  }

  const paintBoard = (x: number, y: number, boardPaint: string) => {
    const newBoard = [...board];
    boardPaint === "alive" ? newBoard[x][y] = 1 : newBoard[x][y] = 0;
    setBoard(newBoard);
  }

  const restartSettings = () => {
    setIteration(0);
    setBoardShadow(initialBoardShadow);
    setGameRunning(false);
  }

  const boardStyle = {
    border: "1px grey solid",
    display: "grid",
    gridTemplateColumns: `repeat(${board.length},10px`,
    marginTop: "2rem",
    boxShadow: boardShadow,
  }

  return (
    <>
      <div className='settings'>

      <div className='configurePaint'>
          <p style={{fontStyle: "italic", marginTop: "0"}}>Click a cell to toggle from alive (black) to dead (white).</p>
          <label style={{ margin: "1rem"}}>Paint by dragging over board:</label>
          <input type="radio" value="alive" name='alive'
            checked={boardPaint === "alive"}
            onChange={e => setBoardPaint(e.target.value)} />Alive
          <input type="radio" value="dead" name='dead' style={{ marginLeft: "1rem" }}
            checked={boardPaint === "dead"}
            onChange={e => setBoardPaint(e.target.value)} />Dead
        </div>

        <div className='configureBoard'>
          <label style={{ margin: "1rem"}}>Board: </label>
          <input type="radio" name="clear"
            onChange={() => setType("clear")}
            checked={type === "clear"} />Clear
          <input type="radio" name="random" style={{ marginLeft: ".5rem" }}
            onChange={() => setType("random")}
            checked={type === "random"} />Random
          <button type='submit'style={{ marginLeft: ".5rem" }}
            onClick={e => {
              e.preventDefault();
              console.log(type);
              restartSettings();
              setBoard(newGrid(board[0].length, board.length, type));
            }
            }>Reset</button>
          <label htmlFor="patterns" style={{ marginLeft: "1rem" }}>Patterns:&nbsp;</label>
          <select name="patterns" id="patterns">
            <option value="bird">Bird</option>
            <option value="small">Small</option>
            <option value="loop">Loop</option>
          </select>
          <button onClick={() => {
            restartSettings();
            const pattern = (document.getElementById("patterns") as HTMLSelectElement).value;
            switch (pattern) {
              case "bird": setBoard(birdPattern(initialSize, initialSize)); setTempo(100); break;
              case "small": setBoard(smallPattern(initialSize, initialSize)); break;
              case "loop": setBoard(loopPattern(initialSize, initialSize)); break;
            }
          }}>Set</button>
        </div>

        <div className='configureSize'>
          <label style={{ margin: "1rem"}}>Size:</label>
          <input type="number" name="rows" id="rows" defaultValue={initialSize} size={6} />
          <input type="number" name="columns" id="columns" defaultValue={initialSize} size={6} />
          <button onClick={() => {
            restartSettings();
            updateSize();
          }}>
            Set
          </button>
          <button onClick={() => {
            restartSettings();
            setBoard(newGrid(initialSize, initialSize, type));
          }}>
            Reset to {initialSize}x{initialSize}
          </button>
        </div>

        <hr style={{ border: "1px solid lightgrey",marginTop: "2rem" }} />

        <div className='runGame'>
          <button onClick={() => {
            setBoardShadow("0px 0px 5px 3px rgba(0,0,255,.3)");
            setGameRunning(true);
          }}>
            Run
          </button>
          <span>Iterations: {iteration}</span>
          <button onClick={() => {
            setBoardShadow("0px 0px 5px 3px rgba(255,160,122,.3)")
            setGameRunning(false);
          }}>
            Pause
          </button>
        </div>
      </div>

      <div className='configureTempo'>
        <label style={{ margin: "1rem" }}>Tempo (ms):</label>
        <input type="number" name="tempo" id="tempo" value={tempo} size={10} step="100"
          onChange={e => setTempo(parseInt(e.target.value))} />
      </div>

      <div className="board" style={boardStyle}>
        {board.map((row, rowIndex) => {
          return <div key={rowIndex}>
            {row.map((square, columnIndex) => {
              return <div key={columnIndex}
                style={{
                  width: "10px", height: "10px",
                  backgroundColor: deadOrAlive(square),
                  cursor: "crosshair",
                }}
                onClick={() => flipElement(rowIndex, columnIndex)}
                draggable
                onDragOver={(e) => {
                  e.preventDefault();
                  if (e.target instanceof HTMLElement) {
                    e.target.style.cursor = "crosshair";
                  }
                  paintBoard(rowIndex, columnIndex, boardPaint);
                }
                }>
              </div>
            })}
          </div>
        })}
      </div>
    </>
  )
}

function App() {

  return (
    <>
      <h1>Conway's Game Of Life</h1>

      <div className="intro">
        <p>
          <a href="https://simple.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game Of Life</a> rules:
        </p>
        <ul>
          <li>Any alive cell that is touching less than two alive neighbours dies.</li>
          <li>Any alive cell touching four or more alive neighbours dies.</li>
          <li>Any alive cell touching two or three alive neighbours does nothing.</li>
          <li>Any dead cell touching exactly three alive neighbours becomes alive.</li>
        </ul>
      </div>

      <div className='boardContainer'>
        <LifeGameBoard />
      </div>
    </>
  )
}

export default App