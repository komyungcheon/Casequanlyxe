import fs from "fs";
import qs from "qs";
import {BaseController} from "./baseController.js";


class HomeController {
    showHome(req, res) {
        fs.readFile('view/product/home.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }


    showErr(req, res) {
        fs.readFile('view/product/err.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }
}

export default new HomeController();
