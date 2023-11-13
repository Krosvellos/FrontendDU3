//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useState } from "uu5g05";
import { Button, useAlertBus } from "uu5g05-elements";
import CreateListForm from "./create-list-form.js";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
const Mode = {
  BUTTON: "BUTTON",
  FORM: "FORM",
};

const Css = {
  // ... (your existing styles)

  listViewContainer: () =>
  Config.Css.css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    
  }),


  listViewTile: () =>
  Config.Css.css({
    width: 500,
    margin: "12px",
    "@media (max-width: 1000px)": {
      width: 400, // Adjust as needed for smaller screens
    },
    "@media (max-width: 768px)": {
      width: 350, // Adjust as needed for smaller screens
    },
    // Add more media queries for different screen sizes if necessary
  }),
};
//@@viewOff:css
//@@viewOff:constants

//@@viewOn:helpers
function CreateButton(props) {
  return (
    <Button
      {...props}
      colorScheme="orange"
      significance="highlighted"
      style={{
        display: "block",
        margin: "auto",
        
        marginTop: "40px", // Adjust the top margin as needed
      }}
    >
      Create List
    </Button>
  );
}
//@@viewOff:helpers

const CreateListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CreateListView",
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
      try {
        props.onCreate(event.data.value.name, event.data.value.owner, event.data.value.ownerName);
      } catch (error) {
        // We pass Error.Message instance to the Uu5Forms.Form that shows alert
        throw new Utils.Error.Message("list create failed!", error);
      }

      addAlert({
        message: `Shopping list ${event.data.value.name} has been created.`,
        priority: "success",
        durationMs: 2000,
      });

      setMode(Mode.BUTTON);
    }
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    switch (mode) {
      case Mode.BUTTON:
        return <CreateButton {...elementProps} onClick={() => setMode(Mode.FORM)} />;
      default:
        return <CreateListForm className={Css.listViewTile()} {...elementProps} onSubmit={handleSubmit} onCancel={() => setMode(Mode.BUTTON)} />;
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CreateListView  };
export default CreateListView;
//@@viewOff:exports
