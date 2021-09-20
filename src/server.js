import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

const server = express();
const port = 3001;

server.use(cors());
server.use(express.json());

server.listen(port, () => {
  console.log("Server is running on port:" + port);
});

console.table(listEndpoints(server));
