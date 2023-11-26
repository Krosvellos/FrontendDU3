//@@viewOn:imports
import { createComponent, useDataList, useEffect, useRef, useState, useMemo } from "uu5g05";

import ShoppingListListContext from "./shopping-list-list-context";
import { useUserContext } from "../user-list/user-context";

import Config from "./config/config";
import Calls from "calls";
//@@viewOff:imports


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
    const [shoppingListList, setShoppingListList] = useState([]);

    const { loggedUser } = useUserContext();

    useEffect(() => {
      // Fetch shopping list data from the API initially
      Calls.ShoppingList.list()
        .then((shoppingLists) => {
          setShoppingListList(shoppingLists.list);
        })
        .catch((error) => {
          console.error("Error fetching shopping list data:", error);
        });
    }, []);
      console.log(shoppingListList)
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


async function handleCreate(dtoIn, setShoppingListList, currentList) {
  try {
    const createdList = await Calls.ShoppingList.create(dtoIn);
    setShoppingListList((prevList) => [...prevList, createdList]);
    return createdList;
  } catch (error) {
    console.error("Error creating shopping list:", error);
    // Handle error scenario
    return null;
  }
}

async function handleUpdate(dtoIn, setShoppingListList, currentList) {
  try {
    const updatedList = await Calls.ShoppingList.update(dtoIn);
    const updatedShoppingListList = currentList.map((list) =>
      list.id === dtoIn.id ? updatedList : list
    );
    setShoppingListList(updatedShoppingListList);
    return updatedList;
  } catch (error) {
    console.error("Error updating shopping list:", error);
    // Handle error scenario
    return null;
  }
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

async function handleDelete(dtoIn, setShoppingListList, currentList) {
  try {
    await Calls.ShoppingList.delete(dtoIn);
    const updatedShoppingListList = currentList.filter((list) => list.id !== dtoIn.id);
    setShoppingListList(updatedShoppingListList);
  } catch (error) {
    console.error("Error deleting shopping list:", error);
    // Handle error scenario
  }
}

export default ShoppingListListProvider;
