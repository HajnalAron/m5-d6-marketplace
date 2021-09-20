import express from "express";
import {
  readProductsFile,
  writeProductsFile,
  makeNewProduct,
  updateProduct,
  getProductById,
  filterOutProduct,
  filterOutReviews
} from "./productsUtilities.js";



const productsRouter = express.Router();

//Post new product
productsRouter.post("/", async (req, res, next) => {
  try {
    let products = await readProductsFile();
    let newProduct = makeNewProduct(req.body);
    products.push(newProduct);
    await writeProductsFile(products);
    res
      .status(200)
      .send(
        "Product has been successfully created with the id of:" + newProduct.id
      );
  } catch (error) {
    next(error);
  }
});

//Get every product
productsRouter.get("/", async (req, res, next) => {
  try {
    res.status(200).send(await readProductsFile());
  } catch (error) {
    next(error);
  }
});

//Get product by product id
productsRouter.get("/:productId", async (req, res, next) => {
  try {
    res.status(200).send(await getProductById(req.params.productId));
  } catch (error) {
    next(error);
  }
});

//Update product
productsRouter.put("/:productId", async (req, res, next) => {
  try {
    res.status(200).send(updateProduct(req.params.productId, req.body));
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
      .send(
        "Product has been deleted created with the id of:" +
          req.params.productId
      );
  } catch (error) {
    next(error);
  }
});

//GET Reviews by product id
productsRouter.get("/:productId/reviews", async (req, res, next) => {
  try {
    res.send(await filterOutReviews(req.params.productId))
  } catch (error) {
    
  }
})

export default productsRouter;
