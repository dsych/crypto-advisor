import React from "react";
import { render } from "react-dom";

console.log("To the moon!");

const App = () => (
  <div>
    <h1>Houston</h1>
    <h3>Sending your net worth to the Moon since ...</h3>
  </div>
);

render(<App />, document.getElementById("root"));
