//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import { useAlertBus } from "uu5g05-elements";
import ListsTile from "./lists-tile.js";
import { useJokes } from "../list-context.js";
import { useState } from "uu5g05";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css`
    padding: 16px;
    width: 600px;
    margin: auto;
    border: 4px solid #ccc;
    background: rgba(0,0,0,0.1);
    
    box-shadow: 0 6px 9px rgba(0,0,0,0.4);

    .toggle-button {
      
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 16px;
    }

    .list-tile {
      margin-bottom: 10px;
      
      wifth: 300px;
      padding: 10px;
      border: 0px solid #eee;
      border-radius: 2px;
    }
  `,
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ListsView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListsView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { lists, currentListId, selectList, create, remove, getArchivedLists, getActiveLists } = useJokes();
    const { addAlert } = useAlertBus();
    const activeList = getActiveLists();
    const archivedList = getArchivedLists();
    const [showArchived, setShowArchived] = useState(false);

    function showError(error, header = "") {
      addAlert({
        header,
        message: error.message,
        priority: "error",
      });
    }

    function handleDelete(event) {
      const list = event.data.id;
      console.log(list);
      try {
        props.onDelete(list);
        addAlert({
          message: `Shopping list ${list} has been deleted.`,
          priority: "success",
          durationMs: 2000,
        });
      } catch (error) {
        ListsView.logger.error("Error deleting list", error);
        showError(error, "List delete failed!");
      }
    }
    

    function handleUpdate(event) {
      const id = event.data;

      try {
        props.onUpdate(id.id);
        addAlert({
          message: `Shopping list ${id.id} has been resolved.`,
          priority: "success",
          durationMs: 2000,
        });
      } catch (error) {
        ListView.logger.error("Error resolving item", error);
        showError(error, "Shopping list resolve failed!");
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const listsToDisplay = showArchived ? archivedList : activeList;
    return (
      <div {...attrs}>
        {/* Button to toggle between archived and active lists */}
        <button
  style={{
    backgroundColor: showArchived ? "#00ff00" : "#ff0000",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "16px",
    color: "#ffffff", // Set text color to white for better visibility
  }}
  onClick={() => setShowArchived(!showArchived)}
>
  {showArchived ? "Current" : "Archived"}
</button>

        {/* Render either archived or active lists based on the state */}
        {listsToDisplay.map((list) => (
          <div className="list-tile">
            <ListsTile
              key={list.id}
              list={list}
              selectList={selectList}
              onUpdate={handleUpdate}
              selected={list.id === currentListId}
              onDelete={handleDelete}
              isArchived={showArchived}
            />
          </div>
        ))}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListsView };
export default ListsView;
//@@viewOff:exports