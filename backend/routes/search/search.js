const search = require("express").Router();
const { 
    tagSearch,
    userSearch,
    searchAll
} = require("../../queries/search/search");

search.get("/tags", tagSearch);
search.get("/users", userSearch);
search.get("/all", searchAll);

module.exports = search;