/* eslint-disable */

// Display all Shopping Lists (GET)
const shoppinglistListListDtoInType = shape({});

// Create a New Shopping List (POST)
const newshoppingListCreateDtoInType = shape({
    name: string(1, 50).isRequired(),
  });

// Delete a specific Shopping List (DELETE)
const shoppingListDeleteDtoInType = shape({
    list_id: id().isRequired(),
  });

// Display Items in a specific Shopping List (GET)
const shoppingListAllItemsListDtoInType = shape({
    list_id: id().isRequired(),
  });

// Modify the Name of a specific Shopping List (PUT)
const shoppingListUpdateNameDtoInType = shape({
    list_id: id().isRequired(),
    newListName: string(1, 50).isRequired(),
  });

  // Archive a Specific Shopping List (PUT)
const shoppingListArchiveDtoInType = shape({
    list_id: id().isRequired(),
  });
  
  // Display a List of All Archived Shopping Lists (GET)
  const archivedShoppingListsListDtoInType = shape({});

  // Display All Authorized Users for a Given List (GET)
const authorizedUsersListDtoInType = shape({
    list_id: id().isRequired(),
  });
  
  // Create an Authorized User (POST)
  const authorizedUserCreateDtoInType = shape({
    list_id: id().isRequired(),
    userId: id().isRequired(),
  });
  
  // Delete an Authorized User (DELETE)
  const authorizedUserDeleteDtoInType = shape({
    list_id: id().isRequired(),
    userId: id().isRequired(),
  });
  
  // Delete myself from Authorized Users (DELETE)
  const DeleteMeFromAuthorizedUsersDtoInType = shape({
    listId: id().isRequired(),
  });


// Add a new Item to the Shopping List (POST)
const shoppingListItemCreateDtoInType = shape({
  list_id: id().isRequired(),
  itemName: string(1, 50).isRequired(),
  itemDesription: string(1, 80).isRequired(),
  
});

// Remove a specific Item from the Shopping List (DELETE)
const shoppingListItemDeleteDtoInType = shape({
  list_id: id().isRequired(),
  item_Id: id().isRequired(),
});

// Update the Status of an Item to "Resolved" (PUT)
const shoppingListItemResolveDtoInType = shape({
  list_id: id().isRequired(),
  item_id: id().isRequired(),
});

// View All Items With "Resolved" Status (GET)
const resolvedShoppingListItemsListDtoInType = shape({
  list_id: id().isRequired(),
});


