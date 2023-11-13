//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import { Button } from "uu5g05-elements";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import ListView from "../bricks/singlelist/list-view.js";
import CreateView from "../bricks/singlelist/create-view.js";
import CreateUserView from "../bricks/singlelist/create-user-view.js";
import NewTitleView from "../bricks/singlelist/new-title-view.js";
import UserListView from "../bricks/singlelist/user-list-view.js";
import { useJokes } from "../bricks/list-context.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css

const Css = {
  icon: () =>
  Config.Css.css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0,
  }),
  screen: () =>
  Config.Css.css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Change to column for smaller screens
    justifyContent: "center",
    
    "@media (min-width: 768px)": {
      flexDirection: "row", // Change back to row for larger screens
      marginRight: "20",
      marginTop: 20,
      marginLeft: "20"
    },
  }),
  userListContainer: () =>
  Config.Css.css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 60, // Remove right margin for smaller screens
    marginLeft: 60,
    marginTop: 0,
    gap: 10,
  }),
  ListButtons: () =>
  Config.Css.css({
    display: "flex",
    flexDirection: "column", // Change to column for smaller screens
    gap: 5,
    "@media (min-width: 768px)": {
      flexDirection: "row", // Change back to row for larger screens
      gap: 50,
    },
    "@media (min-width: 1000px)": {
      flexDirection: "row", // Change back to row for larger screens
      gap: 100,
    },
  }),
};

//@@viewOff:cs
let List = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "List",
  //@@viewOff:statics

  render() {
    const {
      lists,
      currentListId,
      createUser,
      selectList,
      create,
      update,
      remove,
      createItem,
      updateItem,
      removeItem,
      changeListName,
      removeUser,
      showResolved,
      setShowResolved,
      getSelectedListWithUnresolvedItems,
      getSelectedListWithResolvedItems,
      isUserOwner,
    } = useJokes();
    const unresolvedItemsList = getSelectedListWithUnresolvedItems();
    const resolvedItemsList = getSelectedListWithResolvedItems();
     const isOwner = isUserOwner(currentListId); 
    const currentList = lists.find((list) => list.id === currentListId) || {};
    //@@viewOn:render
    return (
      <>
        <RouteBar />
        <div className={Css.screen()}>
          <div className={Css.userListContainer()}>
            <h1>Members</h1>
            {isOwner && <CreateUserView onCreate={createUser} style={{ maxWidth: 400, display: "block" }} />}
            <UserListView shoppingList={currentList} onDelete={removeUser} />
          </div>
          <div className={Css.icon()}>
            <h1>{currentList.listName}</h1>
            <div className={Css.ListButtons()}>
              <NewTitleView changeListName={changeListName} style={{ maxWidth: 400, display: "block" }} />
              <CreateView currentID={currentListId} onCreate={createItem} style={{ maxWidth: 400, display: "block" }} />
              <Button onClick={() => setShowResolved(!showResolved)}>
                {showResolved ? "Unresolved" : "Resolved"}
              </Button>
            </div>
            <ListView
              id={currentListId}
              shoppingList={unresolvedItemsList || {}}
              showResolved={showResolved}
              resolvedItems={resolvedItemsList || []}
              onDelete={removeItem}
              onUpdate={updateItem}
              
            />
          </div>
        </div>
      </>
    );
    //@@viewOff:render
  },
});

List = withRoute(List, { authenticated: true });

//@@viewOn:exports
export { List };
export default List;
//@@viewOff:exports
