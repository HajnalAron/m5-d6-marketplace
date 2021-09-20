import express from "express";
import fs from "fs-extra";
import multer from "multer";
import { join } from "path";
import { updateProduct } from "../products/productsUtilities.js";
import { port } from "../../server.js";
import { publicFolderPath } from "../tools/fileUtilites.js";

const filesRouter = express.Router();

filesRouter.post(
  "/:productId/upload",
  multer().single("productPicutre"),
  async (req, res, next) => {
    try {
      const { mimetype } = req.file;
      const extension = mimetype.split("/")[1];
      const newFileName = req.params.productId + "." + extension;
      const filePath = join(
        publicFolderPath,
        `/img/productPictures/${newFileName}`
      );
      const url = `${req.protocol}://${req.hostname}:${port}/img/productPictures/${newFileName}`;
      updateProduct(req.params.productId, { imgUrl: url });
      await fs.writeFile(filePath, req.file.buffer);
      res.status(200).send("Success");
    } catch (error) {}
  }
);

export default filesRouter;
