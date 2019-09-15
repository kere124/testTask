let connection = require('./config');

module.exports.getItem = function (req, res) {

    let id = req.params.id;

    connection.query(`SELECT * FROM items WHERE id_item=${id}`, function (error, results, fields) {

        if (error) {
            res.status(404);
        } else {
                res.json({
                status: 200,
                data: results,
            })
        }
    });

};
//IN (SELECT * FROM users WHERE id_item=${id})
