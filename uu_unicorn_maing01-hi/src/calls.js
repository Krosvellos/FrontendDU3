import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

// NOTE During frontend development it's possible to redirect uuApp command calls elsewhere, e.g. to production/staging
// backend, by configuring it in *-hi/env/development.json:
//   "uu5Environment": {
//     "callsBaseUri": "https://uuapp-dev.plus4u.net/vnd-app/awid"
//   }

const Calls = {
  async call(method, url, dtoIn, clientOptions) {
    const response = await Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
    return response.data;
  },

  // // example for mock calls
  // loadDemoContent(dtoIn) {
  //   const commandUri = Calls.getCommandUri("loadDemoContent");
  //   return Calls.call("get", commandUri, dtoIn);
  // },
  
  loadIdentityProfiles() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("get", commandUri);
  },

  initWorkspace(dtoInData) {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("post", commandUri, dtoInData);
  },

  getWorkspace() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("get", commandUri);
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  ShoppingList: {
    list(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/list");
      return Calls.call("get", commandUri, dtoIn);
    },
  
    create(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/create");
      return Calls.call("post", commandUri, dtoIn);
    },
  
    update(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/update");
      return Calls.call("post", commandUri, dtoIn);
    },
  
    delete(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/delete");
      return Calls.call("post", commandUri, dtoIn);
    },
  },

  getShoppingList() {
    const commandUri = Calls.getCommandUri("getShoppingList");
    return Calls.call("get", commandUri);
  },

  getUserList() {
    const commandUri = Calls.getCommandUri("getUserList");
    return Calls.call("get", commandUri);
  },

  getCommandUri(useCase, baseUri = Environment.appBaseUri) {
    return (!baseUri.endsWith("/") ? baseUri + "/" : baseUri) + (useCase.startsWith("/") ? useCase.slice(1) : useCase);
  },
};

export default Calls;
