"use strict";
const UnicornMainAbl = require("../../abl/unicorn-main-abl.js");

class UnicornMainController {
  init(ucEnv) {
    return UnicornMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return UnicornMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return UnicornMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new UnicornMainController();
