"use strict";

const JokeAbl = require("../../abl/joke-abl.js");

class JokeController {
  helloWorld() {
    return {
      text: "hello world",
      uuAppErrorMap: {},
    };
  }

  create(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();

    // let dtoOut = {
    //     awid,
    //     joke: dtoIn.joke,
    //     uuAppErrorMap: {

    //     }
    // }
    // return dtoOut
    return JokeAbl.create(awid, dtoIn);
  }
}

module.exports = new JokeController();
