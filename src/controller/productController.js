import fs from "fs";

import qs from "qs";
import url from "url";

import productService from "../service/productService.js";

class ProductController {


    showAll(req, res) {
        if (req.method === "GET") {
            let urlObject = url.parse(req.url, true);
            if (!urlObject.query.search) {
                showList(req, res, '');
            } else {
                showList(req, res, urlObject.query.search);
            }
        }

    }

    edit(req, res) {
        let data = '';
        req.on('data', dataRaw => {

            data += dataRaw;
        })
        req.on('end', () => {
            let urlObject = url.parse(req.url, true)
            if (req.method === 'GET') {
                fs.readFile('view/product/edit.html', 'utf-8', (err, stringHTML) => {
                    productService.findById(urlObject.query.idEdit).then((car) => {
                        stringHTML = stringHTML.replace('{id}', car.id);
                        stringHTML = stringHTML.replace('{name}', car.name);
                        stringHTML = stringHTML.replace('{bienso}', car.bienso);
                        stringHTML = stringHTML.replace('{phanphoiweb}', car.phanphoiweb);

                        res.write(stringHTML);
                        res.end();
                    });
                })
            } else {
                data = qs.parse(data);
                productService.update(data).then(() => {
                    res.writeHead(301, {'location': '/product'})
                    res.end()
                });
            }
        })
    }

    delete(req, res) {
        if (req.method === 'GET') {
            let urlObject = url.parse(req.url, true);
            productService.delete(urlObject.query.idDelete).then(() => {
                res.writeHead(301, {'location': '/product'})
                res.end()
            })
        }
    }

    add(req, res) {
        if (req.method === 'GET') {
            fs.readFile('view/product/add.html', 'utf-8', (err, stringHTML) => {
                res.write(stringHTML);
                res.end();
            })
        } else {
            let data = '';
            req.on('data', dataRaw => {
                data += dataRaw;
            })
            req.on('end', () => {
                data = qs.parse(data);
               productService.save(data).then(() => {
                    res.writeHead(301, {'location': '/product'})
                    res.end()
                });
            })
        }
    }
}

function showList(req, res, searchValue) {
    fs.readFile('view/product/list.html', 'utf-8', (err, stringHTML) => {
        let str = '<table class="table table-hover table-striped align-middle text-center">';
        productService.findAll(searchValue).then((cars)=> {
            str += `<tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Biển số xe</th>
                    <th>Nhà phân phối</th>
                   
                 
                </tr>`
            for (const car of cars) {
                str += `
                     <tr>
                    <td>${car.id}</td>
                    <td><a class="text-decoration-none" href="/index">${car.name}</a></td>
                   <td>${car.bienso}</td>
                   <td>${car.phanphoiweb}</td>
                   
                 
                   <td><a href="/edit-product?idEdit=${car.id}" class="btn btn-primary"><i class="fa-solid fa-pencil"></i></a>
                    <a onclick="return confirm('Bạn có chắc chắn muốn xóa không?')" 
                     class="btn btn-danger" href="/delete-product?idDelete=${car.id}"><i class="fa-solid fa-trash-can"></i>
                     </a>
                    </td>
                   
                    </tr>
                        `
            }
            str += `</table>`
            stringHTML = stringHTML.replace('{listProduct}',str);

            res.write(stringHTML);
            res.end();
        })
    })
}

export default new ProductController();
