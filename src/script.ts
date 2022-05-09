import app from "./app";
const calculate = require("../build/Release/calculate");
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server runs on Port: ${PORT}`);
});
