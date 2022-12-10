# bodyParser
bodyParser Limit Test increase to 1mb or more. default 100kb size issue

app.use(); // default size is 100 KB

app.use(bodyParser.json({limit: "1mb",})); // increase to 1MB or even more
