import express from "express";
import * as models from "./db/models/index.js";
import cors from "cors";
import { testDB, syncDB } from "./db/index.js";
import reviewsRoute from "./services/reviews/index.js";
import productsRoute from "./services/products/index.js";

const server = express();

server.use(express.json());

server.use(cors());

server.use("/products", productsRoute);
server.use("/reviews", reviewsRoute);

const { PORT = 5001 } = process.env;

const initalize = async () => {
  try {
    server.listen(PORT, async () => {
      await testDB();
      await syncDB();

      console.log("✅ Server is listening on port " + PORT);
    });

    server.on("error", (error) => {
      console.log("❌ Server is not running due to error : " + error);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

initalize();
