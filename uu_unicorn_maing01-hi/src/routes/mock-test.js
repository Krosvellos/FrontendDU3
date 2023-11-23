//@@viewOn:imports
import { createVisualComponent, useState } from "uu5g05";

import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let MockTest = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "MockTest",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [result, setResult] = useState({ state: "ready" });
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <Uu5Elements.Button onClick={() => handleLoad(setResult)} disabled={result.state === "pending"}>
          Load
        </Uu5Elements.Button>
        {result.state === "pending" && <Uu5Elements.Pending />}
        {result.state === "ready" && <>{"Vygenerováno číslo " + (result.data || 0) + "!"}</>}
        {result.state === "error" && (
          <Uu5Elements.HighlightedBox colorScheme="negative">{result.data}</Uu5Elements.HighlightedBox>
        )}
      </div>
    );
    //@@viewOff:render
  },
});

function handleLoad(setResult) {
  new Promise((resolve, reject) => {
    setResult((currentState) => {
      return {
        state: "pending",
        data: currentState.data,
      };
    });
    setTimeout(() => {
      const randN = Math.random();
      if (randN < 0.7) resolve({ key: randN });
      else reject("chybička se vloudil");
    }, 3000);
  })
    .then((result) => {
      setResult({ state: "ready", data: result });
    })
    .catch((error) => {
      setResult({ state: "error", data: error });
    });
}

//@@viewOn:exports
export { MockTest };
export default MockTest;
//@@viewOff:exports