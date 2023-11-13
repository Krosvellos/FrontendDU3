//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Form, FormText, SubmitButton, CancelButton } from "uu5g05-forms";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "uu5g05";
import { Box, Text, Line, DateTime } from "uu5g05-elements";


import Config from "./config/config.js";


const CreateFormList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CreateFormList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onSubmit: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    return (
      <Box style={{width: "300px", margin: "auto", border: "6px", padding: "20px"}}>
      <Form {...elementProps} onSubmit={props.onSubmit}>
        <FormText name="name" label="Name of shopping list" required />
        <FormText name="owner" label="Owner uuId" required />
        <FormText name="ownerName" label="Owner Name" required />
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", paddingTop: 8 }}>
          <CancelButton onClick={props.onCancel}>Abort</CancelButton>
          <SubmitButton colorScheme="orange">Create List</SubmitButton>
        </div>
      </Form>
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CreateFormList };
export default CreateFormList;
//@@viewOff:exports
