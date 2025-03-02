import React, { useState } from "react";
import "./Calculator.css"; // Import CSS for styling

const Calculator = () => {
  const [display, setDisplay] = useState("0"); // State to manage display value

  // Function to handle button clicks
  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        // Evaluate the expression
        const result = eval(display);
        setDisplay(result.toString());
      } catch (error) {
        setDisplay("Error");
      }
    } else if (value === "C") {
      // Clear the display
      setDisplay("0");
    } else if (value === "sin") {
      // Calculate sine function
      const result = Math.sin(parseFloat(display));
      setDisplay(result.toString());
    } else if (value === "cos") {
      // Calculate cosine function
      const result = Math.cos(parseFloat(display));
      setDisplay(result.toString());
    } else if (value === "tan") {
      // Calculate tangent function
      const result = Math.tan(parseFloat(display));
      setDisplay(result.toString());
    } else {
      // Append the clicked button value to the display
      setDisplay((prevDisplay) =>
        prevDisplay === "0" ? value : prevDisplay + value
      );
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button onClick={() => handleButtonClick("C")}>C</button>
        <button onClick={() => handleButtonClick("(")}>(</button>
        <button onClick={() => handleButtonClick(")")}>)</button>
        <button onClick={() => handleButtonClick(".")}>.</button>
        <button onClick={() => handleButtonClick("sin")}>sin</button>
        <button onClick={() => handleButtonClick("7")}>7</button>
        <button onClick={() => handleButtonClick("8")}>8</button>
        <button onClick={() => handleButtonClick("9")}>9</button>
        <button onClick={() => handleButtonClick("cos")}>cos</button>
        <button onClick={() => handleButtonClick("4")}>4</button>
        <button onClick={() => handleButtonClick("5")}>5</button>
        <button onClick={() => handleButtonClick("6")}>6</button>
        <button onClick={() => handleButtonClick("tan")}>tan</button>
        <button onClick={() => handleButtonClick("3")}>3</button>
        <button onClick={() => handleButtonClick("2")}>2</button>
        <button onClick={() => handleButtonClick("1")}>1</button>
        <button onClick={() => handleButtonClick("*")}>*</button>

        <button onClick={() => handleButtonClick("-")}>-</button>

        <button onClick={() => handleButtonClick("+")}>+</button>
        <button onClick={() => handleButtonClick("0")}>0</button>

        <button onClick={() => handleButtonClick("/")}>/</button>
        <button onClick={() => handleButtonClick("=")}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
