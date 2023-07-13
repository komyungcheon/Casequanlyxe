import connection from "../connection.js";


class ProductService {
    constructor() {
        connection.connecting();
    }

    findAll(searchValue) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from car WHERE name like '%${searchValue}%' order by id`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })
        })
    }

    save(car) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`INSERT INTO car(name,bienso,phanphoiweb) VALUES ('${car.name}','${car.bienso}','${car.phanphoiweb}')`, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }


    findById(id) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from car where id = ${id}`, (err, products) => {
                if (err) {
                    reject(err)
                } else {

                    resolve(products[0])
                }
            })
        })
    }
    delete(idDelete) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`DELETE FROM car WHERE id = ${idDelete}`, (err, delProduct) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(delProduct);
                }
            });


        });
    }


    update(car) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(

                `update car
                        set     
                        id  = ${car.id},
                        name = '${car.name}', 
                 
                        bienso = '${car.bienso}',
                        phanphoiweb = '${car.phanphoiweb}'
                        
                       
                  
                    where id = ${car.id}`, (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)

                    }
                })
        })

    }
}

export default new ProductService();