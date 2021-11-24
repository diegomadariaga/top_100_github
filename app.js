"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const csvtojson_1 = __importDefault(require("csvtojson"));
// Create a new express application instance
const app = express_1.default();
app.get("/files/:numberOfRows", async (req, res) => {
    const numberOfRows = req.params.numberOfRows;
    const numberOfRowsAsNumber = parseInt(numberOfRows);
    if (numberOfRows === undefined) {
        res.status(400).send("Please provide a number of rows");
    }
    else if (isNaN(numberOfRowsAsNumber)) {
        res.status(400).send("Please provide a number of rows");
    }
    else {
        let data = await readCsv("data.csv", numberOfRowsAsNumber);
        console.log(data);
        res.send(data);
    }
});
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//function read a cvs file
async function readCsv(filePath, numberRows) {
    const jsonArray = await csvtojson_1.default().fromFile(filePath);
    numberRows = numberRows > jsonArray.length ? jsonArray.length : numberRows;
    return jsonArray.slice(0, numberRows);
}
