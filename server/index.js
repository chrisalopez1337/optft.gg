const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const path = require('path');
const userRouter = require('./userRoutes.js');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve react code
app.use('/', express.static(path.join(__dirname, '../client/dist')));

// Routers
app.use('/api/users', userRouter);

app.listen(PORT, () => console.log(`App listening @ localhost:${PORT}`));
