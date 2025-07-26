const express = require("express");
const cors = require("cors");
const app = express();
const aiRoutes = require("./routes/aiRoutes");

app.use(cors());
app.use(express.json());

app.use("/api", aiRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
