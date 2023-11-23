//@@viewOn:imports
import { createVisualComponent } from "uu5g05";

import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const User = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "User",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ img, name }) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={img} style={{ borderRadius: "8px", marginRight: "8px" }} width={"24px"} height={"24px"} />
        {name}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { User };
export default User;
//@@viewOff:exports