//@@viewOn:imports
import { createComponent, useState, Utils, useDataList } from "uu5g05";
import UserContext from "./user-context";
import Config from "./config/config";
import Calls from "calls";

//@@viewOff:imports

const userList = [
  {
    id: "60639c3e",
    name: "Whitemane",
    img: "./assets/whitemane.jpeg",
  },
  {
    id: "60639f0e",
    name: "Jaina",
    img: "./assets/jaina.jpeg",
  },
  {
    id: "6063a47c",
    name: "Cairne",
    img: "./assets/Cairne.jpeg",
  },
  {
    id: "6063a5d0",
    name: "Tirion",
    img: "./assets/tirion.jpeg",
  },
  {
    id: "8ef9a304",
    name: "Sylvanas",
    img: "./assets/Sylvanas.jpeg",
  },
  {
    id: "8ef9a700",
    name: "Herod",
    img: "./assets/herod.jpeg",
  },
  {
    id: "8ef9a8e0",
    name: "Grom",
    img: "./assets/grom.jpeg",
  },
  {
    id: "8ef9aa98",
    name: "Maiev",
    img: "./assets/maiev.jpeg",
  },
  {
    id: "ebd191c2",
    name: "Hogger",
    img: "./assets/hogger.jpeg",
  },
];

const UserProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UserProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [loggedUser, setLoggedUser] = useState(userList[0]);

    const value = {
      loggedUser,
      userList,
      setLoggedUser,
    };
    //@@viewOff:private

    //@@viewOn:render
    return (
      <UserContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </UserContext.Provider>
    );
    //@@viewOff:render
  },
});

export default UserProvider;