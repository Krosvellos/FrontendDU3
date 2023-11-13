"use strict";

const UnicornMainUseCaseError = require("./unicorn-main-use-case-error");
const VideosMainUseCaseError = require("./unicorn-main-use-case-error");

const Create = {
  UC_CODE: `${VideosMainUseCaseError.ERROR_PREFIX}joke/create`,
  invalidDtoIn: class extends UnicornMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}/invalidDtoIn`;
      this.message = "dToIn is not valid";
    }
  },
  JokeDaoCreateFailed: class extends UnicornMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}/jokeDaoCreateFailed`;
      this.message = "Create Joke by Joke dao create failed";
    }
  },
};

module.exports = {
  Create,
};

// const shoppingListsMainObject = {
//   singleShoppingLists: [
//     {
//       creator_id: 1232,
//       id: "list1",
//       name: "honzův list",
//       items: [
//         { id: "xdd", name: "banana" },
//         { id: "xdd", name: "orange" },
//         { id: "xdd", name: "friut" },
//       ],
//       discartedItems: [],
//       authorizedUsers: [
//         { id: "xccsscscs", token: "ssdd" },
//         { id: "xccsscscss", token: "ssdd" },
//         { id: "xccsscscsss", token: "ssdd" },
//         { id: "xccsscscsss", token: "ssdd" },
//       ],
//     },
//     {
//       creator_id: 5678,
//       id: "list2",
//       name: "maria's grocery",
//       items: [
//         { id: "abc", name: "apple" },
//         { id: "abc", name: "pear" },
//         { id: "abc", name: "grapes" },
//       ],
//       discartedItems: [],
//       authorizedUsers: [
//         { id: "xyz", token: "aabb" },
//         { id: "xyz", token: "aabb" },
//         { id: "xyz", token: "aabb" },
//         { id: "xyz", token: "aabb" },
//       ],
//     },
//   ],
//   archivedLists: [
//     {
//       id: "list2",
//       items: {},
//     },
//     {
//       id: "list3",
//       items: {},
//     },
//   ],
// };
