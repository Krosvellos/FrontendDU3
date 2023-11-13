//@@viewOn:imports
import { useEffect } from "uu5g05";
import { createComponent, Utils, useState, useSession } from "uu5g05";
import Config from "./config/config";
import Context from "../list-context";
//@@viewOff:imports

const initialLists = [
  {
    id: "1234",
    listName: "Westfall Stew",
    archived: false,
    owner: "3411-9310-4757-0000",
    userList: [
      { id: Utils.String.generateId(), name: "Leeroy" },
      { id: Utils.String.generateId(), name: "Mograine" },
      { id: Utils.String.generateId(), name: "Thrall" },
    ],
    singleShoppingList: [
      {
        id: Utils.String.generateId(),
        name: "2x Dráp kondora",
        resolved: false,
      },
      {
        id: Utils.String.generateId(),
        name: "6x Murločí vejce",
        resolved: false,
      },
      {
        id: Utils.String.generateId(),
        name: "2x Gnollí tlapa",
        resolved: false,
      },
      {
        id: Utils.String.generateId(),
        name: "2x Kančí rypák",
        resolved: true,
      },
      {
        id: Utils.String.generateId(),
        name: "5x Okra",
        resolved: true,
      },
    ],
  },
  {
    id: "12345",
    listName: "Gingerbread Cookie",
    archived: false,
    owner: "3411-9310-4757-0000",
    userList: [
      { id: Utils.String.generateId(), name: "Arthas" },
      { id: Utils.String.generateId(), name: "Jaina" },
      { id: Utils.String.generateId(), name: "Uther" },
    ],
    singleShoppingList: [
      {
        id: Utils.String.generateId(),
        name: "2x malé vejce",
        resolved: false,
      },
      {
        id: Utils.String.generateId(),
        name: "Vánoční koření",
        resolved: false,
      },
      
    ],
  },
  {
    id: "123456",
    listName: "Conjured Mana Buns",
    archived: false,
    owner: "3411-9310-4757-0000",
    userList: [
      { id: Utils.String.generateId(), name: "Antonidas" },
      { id: Utils.String.generateId(), name: "Medivh" },
      { id: Utils.String.generateId(), name: "Khadgar" },
    ],
    singleShoppingList: [
      {
        id: Utils.String.generateId(),
        name: "1x Mléko",
        resolved: false,
      },
      {
        id: Utils.String.generateId(),
        name: "1x Vejce",
        resolved: false,
      },
      {
        id: Utils.String.generateId(),
        name: "Mouka",
        resolved: false,
      },
      {
        id: Utils.String.generateId(),
        name: "2x Skořice",
        resolved: false,
      },
      {
        id: Utils.String.generateId(),
        name: "1x Máslo",
        resolved: true,
      },
    ],
  },
  {
    id: "123457",
    listName: "Crab Cake",
    archived: false,
    owner: "3411-9310-4757-0000",
    userList: [
      { id: Utils.String.generateId(), name: "Lothar" },
      { id: Utils.String.generateId(), name: "Wrynn" },
      { id: Utils.String.generateId(), name: "Orgrim" },
    ],
    singleShoppingList: [
      {
        id: Utils.String.generateId(),
        name: "3x Krabí Maso",
        resolved: false,
      },
      
    ],
  },
  {
    id: "123458",
    listName: "Kungaloosh",
    archived: false,
    owner: "3411-9310-4757-0000",
    userList: [
      { id: Utils.String.generateId(), name: "Valeera" },
      { id: Utils.String.generateId(), name: "Anduin" },
      { id: Utils.String.generateId(), name: "Cairne" },
    ],
    singleShoppingList: [
      {
        id: Utils.String.generateId(),
        name: "40x Borůvky",
        resolved: false,
      },
      {
        id: Utils.String.generateId(),
        name: "2x jablko",
        resolved: false,
      },
      
    ],
  },
];

const ListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [lists, setLists] = useState(initialLists); // State to manage multiple lists
    const [currentListId, setCurrentListId] = useState(initialLists[0]?.id); // Initialize with the ID of the first list
    const [showResolved, setShowResolved] = useState(false);
    // Function to change the currently selected list
    function selectList(listId) {
      setCurrentListId(listId);
    }


        const { identity } = useSession();
    function isUserOwner(listId) {
      const list = lists.find((list) => list.id === listId);
      return identity?.uuIdentity === list?.owner;
    }

    // Function to get all archived lists
    function getArchivedLists() {
      return lists.filter((list) => list.archived === true);
    }

    // Function to get all active (not archived) lists
    function getActiveLists() {
      return lists.filter((list) => list.archived === false);
    }

    function getSelectedListWithUnresolvedItems() {
      const selectedList = lists.find((list) => list.id === currentListId);
      if (!selectedList) return null;

      return {
        ...selectedList,
        singleShoppingList: selectedList.singleShoppingList.filter((item) => !item.resolved),
      };
    }

    function getSelectedListWithResolvedItems() {
      const selectedList = lists.find((list) => list.id === currentListId);
      if (!selectedList) return null;

      return {
        ...selectedList,
        singleShoppingList: selectedList.singleShoppingList.filter((item) => item.resolved),
      };
    }

    // CRUD operations adapted for multiple lists:

    function create(listName, owner, ownerName) {
      const newList = {
        id: Utils.String.generateId(), 
        listName: listName, 
        archived: false, 
        userList: [{ id: owner, name: ownerName }], 
        singleShoppingList: [], 
        owner: owner,
      };

      setLists((prevLists) => [...prevLists, newList]);
    }

    function update(listId) {
      setLists((prevLists) => prevLists.map((list) => (list.id === listId ? { ...list, archived: true } : list)));
      console.log(lists);
    }

    function remove(listId) {
      setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    }

    function createItem(listId, item) {
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === listId
            ? { ...list, singleShoppingList: [...list.singleShoppingList, { ...item, id: Utils.String.generateId() }] }
            : list
        )
      );
    }

    function createUser(userName) {
      setLists((prevLists) =>
        prevLists.map((list) => {
          if (list.id === currentListId) {
            const newUser = { id: Utils.String.generateId(), name: userName.name };
            return { ...list, userList: [...list.userList, newUser] };
          }
          return list;
        })
      );
    }
    function updateItem(listId, itemId) {
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === listId
            ? {
                ...list,
                singleShoppingList: list.singleShoppingList.map((item) =>
                  item.id === itemId ? { ...item, resolved: true } : item
                ),
              }
            : list
        )
      );
    }

    function removeItem(listId, itemId) {
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === listId
            ? {
                ...list,
                singleShoppingList: list.singleShoppingList.filter((item) => item.id !== itemId),
              }
            : list
        )
      );
    }

    // Function to change the name of the current list
    function changeListName(newName) {
      setLists((prevLists) =>
        prevLists.map((list) => (list.id === currentListId ? { ...list, listName: newName } : list))
      );
    }

    // Function to remove a user from the userList of the current list
    function removeUser(userId) {
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === currentListId
            ? { ...list, userList: list.userList.filter((user) => user.id !== userId.id) }
            : list
        )
      );
    }

    //@@viewOff:private

    //@@viewOn:render
    const value = {
      lists,
      currentListId,
      selectList,
      create,
      update,
      remove,
      createItem,
      updateItem,
      removeItem,
      createUser,
      removeUser,
      changeListName,
      showResolved,
      setShowResolved,
      getSelectedListWithUnresolvedItems,
      getSelectedListWithResolvedItems,
      getArchivedLists,
      getActiveLists,
      isUserOwner,
    };

    return (
      <Context.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </Context.Provider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListProvider };
export default ListProvider;
//@@viewOff:exports
