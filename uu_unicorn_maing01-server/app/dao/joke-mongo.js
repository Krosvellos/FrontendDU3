"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class JokeMongo extends UuObjectDao {
    async create(joke) {
        return super.insertOne(joke)
    }
}

module.exports = JokeMongo;