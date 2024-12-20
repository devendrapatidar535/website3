const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser");
const routes = require('./routes');
const connectDB = require('./db');
connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(port, () => console.log(`Server running on port ${port}`));
