//@@viewOn:imports
import { createVisualComponent, useScreenSize, useRoute, useMemo } from "uu5g05";
import { Grid, PlaceholderBox } from "uu5g05-elements";

import { useShoppingListListContext } from "../shopping-list-list/shopping-list-list-context.js";
import { useUserContext } from "../user-list/user-context.js";

import ItemList from "./item-list.js";

import Config from "./config/config.js";
import MemberList from "./member-list.js";
//@@viewOff:imports

//@@viewOn:constants
// TODO work 1h 45min
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const View = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "View",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: { data: {} },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [screenSize] = useScreenSize();
    const [route] = useRoute();
    const detailId = route.params.id;
    const { shoppingListList, handleUpdate, handleToggleState, handleDelete } = useShoppingListListContext();
    const { loggedUser } = useUserContext();

    const shoppingListDetail = useMemo(() => {
      return shoppingListList.find((shoppingList) => {
        return shoppingList.id === detailId;
      });
    }, [shoppingListList, detailId]);

    const isOwner = loggedUser.id === shoppingListDetail?.owner;
    const isMember =
      loggedUser.id === shoppingListDetail?.owner || shoppingListDetail?.memberList?.includes(loggedUser.id);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <>
        {!shoppingListDetail && (
          <PlaceholderBox code={"forbidden"}> <div style={{color:"white", fontSize: "30px"}}>Shopping List with this ID doesn't exist!</div> </PlaceholderBox>
        )}
        {shoppingListDetail && !isMember && (
          <PlaceholderBox code={"permission"}> <div style={{color:"white", fontSize: "30px"}}>You are not a member of this list</div> </PlaceholderBox>
        )}
        {shoppingListDetail && isMember && (
          <Grid templateColumns={["xs", "s"].includes(screenSize) ? "100%" : "60% 40%"}>
            <ItemList 
              {...{
                loggedUser,
                isOwner,
                shoppingListDetail,
                handleUpdate,
                handleToggleState,
                handleDelete,
              }}
            />
            <MemberList {...{ loggedUser, isOwner, shoppingListDetail, handleUpdate }} />
          </Grid>
        )}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports