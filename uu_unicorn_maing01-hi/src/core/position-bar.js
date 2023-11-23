//@@viewOn:imports
import { createVisualComponent, Lsi, useRoute } from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";

import { useUserContext } from "./user-list/user-context.js";
import User from "../bricks/user.js";

import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const PositionBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "PositionBar",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { userList, loggedUser, setLoggedUser } = useUserContext();
    const [, setRoute] = useRoute();
    const backgroundStyle = {
      background: "lightgrey", // Change this to your desired background color
      padding: "1px", // Change the padding as needed
    };

    const actionList = [
      
      {
        children: "Shopping Lists",
        onClick: () => setRoute("shoppingListList"),
        collapsed: false,
        colorScheme: "blue"
      },
      {
        children: <User img={loggedUser.img} name={loggedUser.name} />,
        colorScheme: "grey",
        significance: "subdued",
      
        itemList: getUserItemList({ userList, setLoggedUser }),
        collapsed: false,
      },
      // other example routes
      
    ];
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (<div style={backgroundStyle}>
      <Plus4U5App.PositionBar view={"short"} actionList={actionList} {...props}>
       <div><strong> Domácí Úkol 4 </strong></div>
      </Plus4U5App.PositionBar></div>
    );
     <div style={backgroundStyle}>
      <Plus4U5App.PositionBar view={"short"} actionList={actionList} {...props}>
        Domácí Úkol 4
      </Plus4U5App.PositionBar>
    </div>
    //@@viewOff:render
  },
});

function getUserItemList({ userList, setLoggedUser }) {
  const userItemList = [];
  userList.forEach((user) => {
    userItemList.push({
      children: <User img={user.img} name={user.name} />,
      onClick: () => setLoggedUser(user),
    });
  });
  return userItemList;
}

//@@viewOn:exports
export { PositionBar };
export default PositionBar;
//@@viewOff:exports