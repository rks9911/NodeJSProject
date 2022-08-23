const mongoose = require("mongoose");
const { DB_URL } = process.env;
const createConnection = async () => {
    try {
        const connection = await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });

        if (connection) {
            console.log("Connection Success !!");
        }
    } catch (err) {
        console.log("Error : " + err);
        process.exit();
    }
}

module.exports = createConnection;