import { useState } from "react";
import "./styles/App.css"
function App() {
  const keys = [
    {
      keyCode: 55,
      label: "7",
    },
    {
      keyCode: 56,
      label: "8",
    },
    {
      keyCode: 57,
      label: "9",
    },
    {
      keyCode: 52,
      label: "4",
    },
    {
      keyCode: 53,
      label: "5",
    },
    {
      keyCode: 54,
      label: "6",
    },
    {
      keyCode: 49,
      label: "1",
    },
    {
      keyCode: 50,
      label: "2",
    },
    {
      keyCode: 51,
      label: "3",
    },
    {
      keyCode: 48,
      label: "0",
    },
    {
      keyCode: 190,
      label: ".",
    },
    {
      keyCode: 13,
      label: "=",
    },
  ];

  const symbols = [
    {
      label: "⌫",
      keyCode: 8,
      value: "backspace",
    },
    {
      label: "÷",
      keyCode: 111,
      value: "/",
    },
    {
      label: "×",
      keyCode: 56,
      value: "*",
    },
    {
      label: "﹣",
      keyCode: 109,
      value: "-",
    },
    {
      label: "+",
      keyCode: 107,
      value: "+",
    },
  ];
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const operators = ['+', '-', '/', '*']
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const createInput = (i) => {
    if (numbers.includes(i)) {
      calculateOutput(input + i)
      setInput(input + i)
    } else if (operators.includes(i)) {
      if (input.length === 0) return;
      const lastInput = input.slice(-1)
      if (operators.includes(lastInput)) return;
      if (lastInput === '.') return;
      setInput(input + i)
    } else if (i === ".") {
      if (input.length === 0) return
      if (input.slice(-1) === ".") return
      if (operators.includes(input.slice(-1))) return
      setInput(input + i)
    } else if (i == "backspace") {
      if (input.length === 0) return
      setInput(input.slice(0, -1))

      calculateOutput(input.slice(0, - 1))
      if (input.length === 1) {
        setResult('')
      }

    } else if (i === "=") {
      if (input.length === 0) return
      calculateOutput(input)
    }

  }
  const calculateOutput = (input) => {
    if (input.length === 0) return
    if (operators.includes(input.slice(-1))) {
      input = input.slice(0, -1)
    }
    try {
      const output = eval(input).toFixed(2) + '';
      setResult(eval(output))
    } catch (error) {
      console.log(error);
    }
   
  }
  return (
    <div className="app">
      <div className="app_cal">
        <div className="app_cal_display">
          <div className="app_cal_display_user_input">
            <p>{input}</p>
          </div>
          <div className="app_cal_display_result">{result}</div>
        </div>
        <div className="app_cal_keypad">
          <div className="app_cal_keypad_numbers">
            {
              keys.map((key, index) => (
                <p key={index} onClick={() => createInput(key.label)}>{key.label}</p>
              ))
            }
          </div>
          <div className="app_cal_keypad_symbols">
            {
              symbols.map((symbol, index) => (
                <p key={index} onClick={() => { createInput(symbol.value) }}>{symbol.label}</p>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
