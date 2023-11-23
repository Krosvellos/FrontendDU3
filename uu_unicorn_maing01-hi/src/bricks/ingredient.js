//@@viewOn:imports
import { createVisualComponent, PropTypes } from "uu5g05";

import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Ingredient = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Ingredient",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    left: PropTypes.node,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    left: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        {props.name}
        <Uu5Elements.Button
          icon="mdi-close"
          colorScheme="negative"
          onClick={() =>
            props.setIngredienceList((currentList) => {
              const index = currentList.indexOf(props.id);
              const newValue = currentList.slice(index, 1);
            })
          }
        />
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Ingredient };
export default Ingredient;
//@@viewOff:exports