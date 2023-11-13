//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { useAlertBus } from "uu5g05-elements";
import Config from "./config/config.js";
import UserTile from "./user-tile.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const UserListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UserList",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { addAlert } = useAlertBus();

    function showError(error, header = "") {
      addAlert({
        header,
        message: error.message,
        priority: "error",
      });
    }
    function handleDelete(event) {
      const user = event.data;
      try {
        props.onDelete(user);
        addAlert({
          message: `The user ${user.name} has been deleted.`,
          priority: "success",
          durationMs: 2000,
        });
      } catch (error) {
        ListView.logger.error("Error deleting user", error);
        showError(error, "User delete failed!");
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);

    return (
      <div {...attrs}>
        {props.shoppingList.userList?.map((joke) => (
          <div style={{ display: "flex", flexDirection: "row", gap: 8 }} key={joke.id}>
            <UserTile
              name={joke.name}
              joke={joke}
              onDelete={handleDelete}
              style={{ width: 200, display: "flex", justifyContent: "space-around", alignItems: "center" }}
            />
          </div>
        ))}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { UserListView };
export default UserListView;
//@@viewOff:exports
