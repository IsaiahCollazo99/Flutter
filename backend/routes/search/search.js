const search = require("express").Router();
const { 
    tagSearch,
    userSearch
} = require("../../queries/search/search");

search.get("/tags", tagSearch);
search.get("/users", userSearch);

module.exports = search;