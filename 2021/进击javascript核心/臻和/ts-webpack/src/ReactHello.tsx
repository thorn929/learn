import React = require("react");
import ReactDom from "react-dom";

const App: () => JSX.Element = () => {
  return (
    <div>
      <h1>Hellow React</h1>
    </div>
  );
};

ReactDom.render(<App />, document.getElementById("root"));
