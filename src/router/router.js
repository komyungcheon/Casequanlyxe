import fs from 'fs'


import homeController from "../controller/homeController.js";
import productRouter from "./productRouter.js";

let router = {
    '/': homeController.showHome,

    '/err': homeController.showErr,
}
router = {...router, ...productRouter};

export default router;
