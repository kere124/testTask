let connection = require('./config');
module.exports.deleteItem = function (req, res) {
    let id_item = req.params.id;
    connection.query(`DELETE FROM items WHERE id_item=${id_item}`, function (error, results, fields) {
        if (error) {
            res.status(404);
        } else {
            res.status(200).send('OK');

        }

    });
}