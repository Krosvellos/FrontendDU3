//@@viewOn:imports
import { createVisualComponent, useRef } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
import Member from "../shopping-list-detail/member.js";
import TextInput from "../shopping-list-detail/text-input.js";
//@@viewOff:imports

//@@viewOn:css
//@@viewOff:css

const View = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TextInput",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { data, onChange, isOwner, ...restProps } = props;

    const tempDataRef = useRef({});

    function addMember(key, value) {
      tempDataRef.current[key] = value;
      if (tempDataRef.current.id && tempDataRef.current.name) {
        const newData = [...data];
        newData.push(tempDataRef.current);
        onChange(newData);
        tempDataRef.current = {};
      }
    }

    //@@viewOn:render
    return (
      <Uu5Elements.Modal header="Members" width={600} {...restProps}>
        {data.map((item) => (
          <Member
            key={item.id}
            {...item}
            onDelete={isOwner ? () => onChange(data.filter(({ id }) => id !== item.id)) : undefined}
          />
        ))}
        {isOwner && (
          <Uu5Elements.ListItem significance="subdued" key={data.length}>
            <TextInput placeholder="id" onChange={(id) => addMember("id", id)} />
            <TextInput placeholder="name" onChange={(name) => addMember("name", name)} />
          </Uu5Elements.ListItem>
        )}
      </Uu5Elements.Modal>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports