//@@viewOn:imports
import { createComponent, useState, useMemo } from "uu5g05";

import ShoppingListListContext from "./shopping-list-list-context";
import { useUserContext } from "../user-list/user-context";

import Config from "./config/config";
//@@viewOff:imports

const INITIAL_VALUE = [
  {
    id: "cd8f0b48",
    name: "Westfall Stew",
    memberList: ["60639f0e", "8ef9a8e0"],
    itemList: [
      { id: "d1bce180", name: "2x Okra" },
      { id: "d1bce181", name: "6x Dráp kondora" },
      { id: "d1bce48c", name: "5x Murločí vejce" },
      { id: "d1bce182", name: "8x Gnollí tlapa" },
      { id: "d1bce5d6", name: "3x Kančí rypák", checked: true },
    ],
    owner: "60639c3e",
  },
  {
    id: "f4adaae0",
    name: "Gingerbread Cookies",
    memberList: ["6063a47c", "8ef9aa98"],
    itemList: [
      { id: "d1bce70c", name: "2x Malé vejce" },
      { id: "d1bce82e", name: "Vánoční koření" },
      { id: "d1bce946", name: "Forma na sušenky" },
    ],
    owner: "60639c3e",
  },
  {
    id: "f4adae28",
    name: "Conjured Mana Buns",
    memberList: ["6063a47c", "8ef9a304", "8ef9a700"],
    itemList: [
      { id: "d1bcee1e", name: "1x Mléko" },
      { id: "d1bcef68", name: "2x Skořice" },
      { id: "d1bcf080", name: "1x Vejce" },
      { id: "fb1495d2", name: "1x Máslo", checked: true },
      { id: "fb149c76", name: "46x Mana", checked: true },
    ],
    owner: "60639f0e",
  },
  {
    id: "f4adb08a",
    name: "Kungaloosh",
    memberList: ["ebd191c2","8ef9a700"],
    itemList: [
      { id: "d1bcf193", name: "40x Borůvky" },
      { id: "fb149282", name: "2x Jablko", checked: true },
    
    ],
    owner: "8ef9a8e0",
  },
  {
    id: "f4adb09b",
    name: "Crab Cake",
    memberList: ["ebd191c2"],
    itemList: [
      { id: "d1bcf198", name: "2x Krabí maso" },
      { id: "fb149276", name: "1x Dort", checked: true },
    
    ],
    owner: "6063a5d0",
  },
];

export const ShoppingListListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [shoppingListList, setShoppingListList] = useState(INITIAL_VALUE);

    const { loggedUser } = useUserContext();

    const userShoppingList = useMemo(() => {
      return shoppingListList.filter((shoppingList) => {
        return shoppingList.owner === loggedUser.id || shoppingList.memberList.includes(loggedUser.id);
      });
    }, [loggedUser, shoppingListList]);

    const value = {
      shoppingListList,
      userShoppingList,
      handleCreate: (dtoIn) => handleCreate(dtoIn, setShoppingListList),
      handleUpdate: (dtoIn) => handleUpdate(dtoIn, setShoppingListList),
      handleToggleState: (dtoIn) => handleToggleState(dtoIn, setShoppingListList),
      handleDelete: (dtoIn) => handleDelete(dtoIn, setShoppingListList),
    };
    //@@viewOff:private

    //@@viewOn:render
    return (
      <ShoppingListListContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </ShoppingListListContext.Provider>
    );
    //@@viewOff:render
  },
});

function handleCreate(dtoIn, setShoppingListList) {
  setShoppingListList((current) => {
    const newSchoppingListList = current.slice();
    newSchoppingListList.push(dtoIn);
    return newSchoppingListList;
  });
}

function handleUpdate(dtoIn, setShoppingListList) {
  setShoppingListList((current) => {
    const newSchoppingListList = current.slice();
    const shoppingListIndex = newSchoppingListList.findIndex((item) => item.id === dtoIn.id);
    newSchoppingListList[shoppingListIndex] = dtoIn;
    return newSchoppingListList;
  });
}

function handleToggleState(dtoIn, setShoppingListList) {
  setShoppingListList((current) => {
    const newSchoppingListList = current.slice();
    const shoppingListIndex = newSchoppingListList.find((item) => item.id === dtoIn.id);
    dtoIn.archived = !dtoIn.archived;
    newSchoppingListList[shoppingListIndex] = dtoIn;
    return newSchoppingListList;
  });
}

function handleDelete(dtoIn, setShoppingListList) {
  setShoppingListList((current) => {
    const newSchoppingListList = current.slice();
    const index = newSchoppingListList.findIndex((item) => item.id === dtoIn.id);
    if (index >= 0) newSchoppingListList.splice(index, 1);
    return newSchoppingListList;
  });
}

export default ShoppingListListProvider;