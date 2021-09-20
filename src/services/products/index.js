import express from "express";
import {
  readProductsFile,
  writeProductsFile,
  makeNewProduct,
  updateProduct,
  getProductById,
  filterOutProduct,
  filterOutReviews,
  filterProductsCategory,
} from "./productsUtilities.js";
import createHttpError from "http-errors";
import { productsValidationMiddleware } from "../../validation.js";
import { validationResult } from "express-validator";

const productsRouter = express.Router();

//Post new product
productsRouter.post(
  "/",
  productsValidationMiddleware,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        next(createHttpError(400, errors));
      } else {
        let products = await readProductsFile();
        let newProduct = makeNewProduct(req.body);
        products.push(newProduct);
        await writeProductsFile(products);
        res
          .status(200)
          .send(
            "Product has been successfully created with the id of:" +
              newProduct.id
          );
      }
    } catch (error) {
      next(error);
    }
  }
);

//Get every product
productsRouter.get("/", async (req, res, next) => {
  try {
    if (req.query.category) {
      res.status(200).send(await filterProductsCategory(req.query.category));
    } else {
      res.status(200).send(await readProductsFile());
    }
  } catch (error) {
    next(error);
  }
});

//Get product by product id
productsRouter.get("/:productId", async (req, res, next) => {
  try {
    const product = await getProductById(req.params.productId);
    if (product) {
      res.status(200).send(product);
    } else
      next(
        createHttpErrors(
          404,
          `Product not found with the id of:` + req.params.productId
        )
      );
  } catch (error) {
    next(error);
  }
});

//Update product
productsRouter.put("/:productId", async (req, res, next) => {
  try {
    res.status(200).send(await updateProduct(req.params.productId, req.body));
  } catch (error) {
    next(error);
  }
});

//Delete product
productsRouter.delete("/:productId", async (req, res, next) => {
  await filterOutProduct(req.params.productId);
  try {
    res
      .status(200)
      .send("Product has been deleted with the id of:" + req.params.productId);
  } catch (error) {
    next(error);
  }
});

//GET Reviews by product id
productsRouter.get("/:productId/reviews", async (req, res, next) => {
  try {
    res.send(await filterOutReviews(req.params.productId));
  } catch (error) {}
});

export default productsRouter;
