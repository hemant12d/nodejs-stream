const fs = require("fs");
const { Transform } = require("stream");

class CSVtoJSONTransformer extends Transform {
  constructor() {
    super({ readableObjectMode: true }); // output objects, not buffers
    this.headers = null;
  }

  _transform(chunk, encoding, callback) {
    console.log('chunk: ', chunk.toString());
    const lines = chunk.toString().split("\n").filter(Boolean);

    for (const line of lines) {
      const values = line.split(",");

      if (!this.headers) {
        // first line defines headers
        this.headers = values;
      } else {
        const obj = {};
        this.headers.forEach((column, i) => {
          obj[column.trim()] = values[i]?.trim();
        });
        this.push(JSON.stringify(obj) + "\n");
      }
    }

    callback();
  }
}

const readStream = fs.createReadStream(
  "business-operations-survey-price-wage.csv"
);
const writeStream = fs.createWriteStream("data.json");
const csvToJson = new CSVtoJSONTransformer();

readStream
  .pipe(csvToJson)
  .pipe(writeStream)
  .on("finish", () => console.log("✅ CSV converted to JSON!"));
