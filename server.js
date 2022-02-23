const exprssor = require("express");
const logonse = require("morgan");
const mangosse = require("mongoose");
const compressionada = require("compression");

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/budget";

const app = exprssor();

app.use(logonse("dev"));

app.use(compressionada());
app.use(exprssor.urlencoded({ extended: true }));
app.use(exprssor.json());

app.use(exprssor.static("public"));

mangosse.connect(MONGODB_URI || 'mongodb://localhost:3001/budget', {
  useNewUrlParser: true,
  useFindAndModify: false
});


app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});