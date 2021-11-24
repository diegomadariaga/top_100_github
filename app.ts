import express from "express";
import csv from "csvtojson";

// Create a new express application instance
const app: express.Application = express();

app.get("/files/:numberOfRows", async (req, res) => {
    const numberOfRows: string = req.params.numberOfRows;
    const numberOfRowsAsNumber: number = parseInt(numberOfRows);
    if (numberOfRows === undefined) {
        res.status(400).send("Please provide a number of rows");
    } else if (isNaN(numberOfRowsAsNumber)) {
        res.status(400).send("Please provide a number of rows");
    } else {
        let data = await readCsv("data.csv", numberOfRowsAsNumber);
        console.log(data);
        res.send(data);
    }
});

// Start the server
const PORT: number = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//function read a cvs file
async function readCsv(filePath: string, numberRows: number): Promise<any> {
    const jsonArray: Array<any> = await csv().fromFile(filePath);
    numberRows = numberRows > jsonArray.length ? jsonArray.length : numberRows;
    return jsonArray.slice(0, numberRows);
}
