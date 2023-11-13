//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useState } from "uu5g05";
import { Button, useAlertBus } from "uu5g05-elements";
import NewTitleForm from "./new-title-form.js";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
const Mode = {
  BUTTON: "BUTTON",
  FORM: "FORM",
};
//@@viewOff:constants

//@@viewOn:helpers
function NewTitleButton(props) {
  return (
    <Button {...props} colorScheme="orange" significance="highlighted">
      Change Name
    </Button>
  );
}
//@@viewOff:helpers

const NewTitleView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CreateUserView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onCreate: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onCreate: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { addAlert } = useAlertBus();
    const [mode, setMode] = useState(Mode.BUTTON);

    function handleSubmit(event) {
      console.log("Event object:", event);

      try {
        const newName = event.data.value.name;
        props.changeListName(newName);
        addAlert({
          message: `List title has been updated to ${newName}.`,
          priority: "success",
          durationMs: 2000,
        });
      } catch (error) {
        console.error(error);
        throw new Utils.Error.Message("Title update failed!", error);
      }
      setMode(Mode.BUTTON);
    }

    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    switch (mode) {
      case Mode.BUTTON:
        return <NewTitleButton {...elementProps} onClick={() => setMode(Mode.FORM)} />;
      default:
        return <NewTitleForm {...elementProps} onSubmit={handleSubmit} onCancel={() => setMode(Mode.BUTTON)} />;
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { NewTitleView };
export default NewTitleView;
//@@viewOff:exports
