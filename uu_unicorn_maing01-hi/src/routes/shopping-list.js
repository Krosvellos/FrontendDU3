//@@viewOn:imports
import { Utils, createVisualComponent, useDataList } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import PositionBar from "../core/position-bar.js";

import TilesExample from "./tiles-example.js";

import Calls from "calls";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let ShoppingList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const shoppingDataList = useDataList({ handlerMap: { load: Calls.getShoppingList } });
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <PositionBar />
        <div className={Config.Css.css({ padding: "16px 32px" })}>
          <TilesExample shoppingDataList={shoppingDataList} />
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

ShoppingList = withRoute(ShoppingList, { authenticated: true });

//@@viewOn:exports
export { ShoppingList };
export default ShoppingList;
//@@viewOff:exports