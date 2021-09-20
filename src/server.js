import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import reviewsRouter from "./services/reviews/index.js";
import productsRouter from "./services/products/index.js";
import filesRouter from "./services/filesUpload/index.js";
import { publicFolderPath } from "./services/tools/fileUtilites.js";

const server = express();
export const port = 3001;

server.use(cors());
server.use(express.json());
server.use(express.static(publicFolderPath));

server.use("/products", productsRouter);
server.use("/reviews", reviewsRouter);
server.use("/files", filesRouter);

server.listen(port, () => {
  console.log("Server is running on port:" + port);
});

console.table(listEndpoints(server));
