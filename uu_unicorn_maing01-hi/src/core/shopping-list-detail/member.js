//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
//@@viewOff:imports

//@@viewOn:css
//@@viewOff:css

const Member = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Member",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { id, name, onDelete } = props;

    //@@viewOn:render
    return (
      <Uu5Elements.ListItem
        significance="subdued"
        actionList={onDelete ? [{ icon: "uugds-closed", onClick: onDelete }] : undefined}
      >
        {name} ({id})
      </Uu5Elements.ListItem>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Member };
export default Member;
//@@viewOff:exports