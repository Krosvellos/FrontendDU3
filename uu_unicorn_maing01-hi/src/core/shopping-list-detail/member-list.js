//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { Block, Button, Grid, Line } from "uu5g05-elements";
import { TextSelect } from "uu5g05-forms";

import User from "../../bricks/user.js";
import { useUserContext } from "../user-list/user-context.js";

import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
// TODO work 1h 45min
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const MemberList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "MemberList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: { data: {} },
  //@@viewOff:defaultProps

  render({ loggedUser, isOwner, shoppingListDetail, handleUpdate }) {
    //@@viewOn:private
    const { userList } = useUserContext();
    const owner = userList.find((item) => item.id === shoppingListDetail.owner);
    const isEditable = isOwner && !shoppingListDetail.archived;
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Block card={"full"} header={"Member List"} headerType={"title"} headerSeparator>
        <Grid rowGap={"10px"}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <User img={owner.img} name={owner.name} />
            <div style={{ fontStyle: "italic", color: "grey", marginLeft: "8px" }}>(owner)</div>
            {loggedUser.id === owner.id && <div style={{ color: "green", marginLeft: "8px" }}>*</div>}
          </div>
          <Line size={"s"} style={{ margin: "4px 0" }} significance={"subdued"} />
          {getUserList({ loggedUser, userList, isOwner, shoppingListDetail, handleUpdate, isEditable })}
          {isEditable && (
            <>
              <Line size={"s"} style={{ margin: "4px 0" }} significance={"subdued"} />
        
              <TextSelect
                label={"Add a Member"}
                itemList={getNewMemberItemList({ shoppingListDetail, userList, handleUpdate })}
                onChange={(e) => {
                  handleAddMember({ userId: e.data.value, shoppingListDetail, handleUpdate });
                }}
              />
            </>
          )}
        </Grid>
      </Block>
    );
    //@@viewOff:render
  },
});

function getUserList({ loggedUser, userList, isOwner, shoppingListDetail, handleUpdate, isEditable }) {
  return shoppingListDetail.memberList?.map((memberId) => {
    const user = userList.find((item) => item.id === memberId);
    return (
      <Grid key={user.id} templateColumns={isEditable ? "auto max-content" : "100%"}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <User img={user.img} name={user.name} />
          {loggedUser.id === user.id && <div style={{ color: "red", marginLeft: "8px" }}>*</div>}
        </div>
        {isEditable && (
          <Button
            icon={"uugds-delete"}
            colorScheme={"negative"}
            size={"xs"}
            significance={"subdued"}
            onClick={() => handleDeleteMember({ userId: user.id, shoppingListDetail, handleUpdate })}
          />
        )}
      </Grid>
    );
  });
}

function getNewMemberItemList({ shoppingListDetail, userList, handleUpdate }) {
  const newMemberList = [];
  userList.forEach((user) => {
    if (user.id !== shoppingListDetail.owner && !shoppingListDetail.memberList?.includes(user.id)) {
      newMemberList.push({ value: user.id, children: <User img={user.img} name={user.name} /> });
    }
  });
  return newMemberList;
}

function handleAddMember({ userId, shoppingListDetail, handleUpdate }) {
  const memberIndex = shoppingListDetail.memberList?.indexOf(userId);
  if (memberIndex === -1) shoppingListDetail.memberList.push(userId);
  handleUpdate(shoppingListDetail);
}

function handleDeleteMember({ userId, shoppingListDetail, handleUpdate }) {
  const memberIndex = shoppingListDetail.memberList?.indexOf(userId);
  if (memberIndex || memberIndex === 0) shoppingListDetail.memberList.splice(memberIndex, 1);
  handleUpdate(shoppingListDetail);
}

//@@viewOn:exports
export { MemberList };
export default MemberList;
//@@viewOff:exports