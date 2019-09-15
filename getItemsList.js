let connection = require('./config');
module.exports.getItemsListItems = function (req, res) {
    connection.query('SELECT * FROM items', function (error, results, fields) {
        if (error) {
            res.status(404);
        } else {
            res.json({
                status: 200,
                data: results
            })
        }
    });
};