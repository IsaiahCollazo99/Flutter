const app = require("express")();
const cors = require("cors");
const bodyParser = requrie("body-parser");

const port = 3001;
const path = require("path");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use((error, req, res, next) => {
    if(error.status) {
        res.status(error.status).json(error);
    } else {
        res.json(error);
    }
});

app.get("*", (req, res, next) => {
    res.status(404).json({
        status: 404,
        error: "No route found."
    });
});

app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`)
})