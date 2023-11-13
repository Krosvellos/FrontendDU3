const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;

const Errors = require("../api/errors/joke-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
};

class JokeAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("joke");
  }

  async create(awid, dToIn) {
    let validationResult = this.validator.validate("jokeCreateDtoInType", dToIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dToIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.invalidDtoIn
    );

    dToIn.awid = awid;
    let dtoOut;
    try {
      dtoOut = await this.dao.create(dToIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.JokeDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    dtoOut.uuAppErrorMap = uuAppErrorMap;

    // let dtoOut = {
    //     ...dToIn,
    //     awid,
    //     uuAppErrorMap
    // }

    return dtoOut;
  }
}

module.exports = new JokeAbl();
