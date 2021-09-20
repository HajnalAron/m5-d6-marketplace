import express from "express";
import fs from "fs-extra";
import multer from "multer";
import { join } from "path";
import { updateProduct } from "../products/productsUtilities.js";
import { port } from "../../server.js";
import { publicFolderPath } from "../tools/fileUtilites.js";
import createHttpErrors from "http-errors"

const filesRouter = express.Router();

filesRouter.post(
  "/:productId/upload",
  multer().single("productPicutre"),
  async (req, res, next) => {
    try {
      const { mimetype } = req.file;
      console.log(req.file)
      const type = mimetype.split("/")[0]
      console.log(type)
      if (type === "image"){
      const extension = mimetype.split("/")[1];
      const newFileName = req.params.productId + "." + extension;
      const filePath = join(publicFolderPath,`/img/productPictures/${newFileName}`)
      const url = `${req.protocol}://${req.hostname}:${port}/img/productPictures/${newFileName}`;
      updateProduct(req.params.productId, { imgUrl: url });
      console.log(filePath, url)
      await fs.writeFile(filePath, req.file.buffer);
      res.status(200).send("Success");
    }
    else next(createHttpErrors(400, `Please upload an image`))
    } catch (error) {
      next(error)
    }
  }
);

export default filesRouter;
