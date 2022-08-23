require('dotenv').config();
const port = process.env.PORT || 5200;
const { app } = require('./server');


app.listen(port, () => {
    console.log(`Server listing on port http://localhost:${port}`)
});



