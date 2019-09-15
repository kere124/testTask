let connection = require('./config');
module.exports.updateItems = function (req, res) {
    connection.query(`UPDATE items SET title='${req.body.title}',price=${req.body.price} WHERE id_item=${req.params.id}`, function (error, results, fields) {
        if (error) {
            res.status(404);
            res.send({error});
        } else {
            res.status(200).send('OK');
        }
    });
}