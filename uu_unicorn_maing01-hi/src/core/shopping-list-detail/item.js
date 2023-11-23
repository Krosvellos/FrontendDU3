//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "../config/config.js";
import TextInput from "./text-input";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  check: () => Config.Css.css({ marginRight: 16 }),
};
//@@viewOff:css

const Item = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Item",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { id, name, checked, onCheck, onNameChange, onDelete } = props;

    //@@viewOn:render
    return (
      <Uu5Elements.ListItem
        significance="subdued"
        actionList={id && onDelete ? [{ icon: "uugds-close", onClick: onDelete }] : undefined}
      >
        <Uu5Forms.Checkbox.Input
          icon={checked ? "uugds-check" : undefined}
          onClick={onCheck}
          className={Css.check()}
          disabled={!id}
        />
        <TextInput id={id} value={name} onChange={onNameChange} readOnly={checked} />
      </Uu5Elements.ListItem>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Item };
export default Item;
//@@viewOff:exports