import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import {db,checkDbConnection} from "./config/db.js";
import { createTablesIfNotExist } from "./config/setUpDb.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/categories",categoryRoutes);
app.use("/api/v1/products",productRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server after checking database and tables
async function startServer() {
  try {
    await checkDbConnection();
    await createTablesIfNotExist(); 

    app.listen(process.env.PORT, () => {
      console.log(colors.green(`Server is running on port ${process.env.PORT}`.bgCyan.white));
    });
  } catch (error) {
    console.error(colors.red("Failed to start server due to database setup error:"), error.message);
    process.exit(1); // Exit the application if there’s a database setup error
  }
}

startServer();



