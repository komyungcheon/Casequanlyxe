import fs from 'fs'
import qs from "qs";
import productController from "../controller/productController.js";


let productRouter = {
    '/product': productController.showAll,
    '/add-product': productController.add,
    '/edit-product':productController.edit,
    '/delete-product':productController.delete,

}

export default productRouter;
