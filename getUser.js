let connection = require('./config');
module.exports.getUser = function (req, res) {
    let id = req.params.id;
    connection.query(`SELECT * FROM users WHERE userId=${id}`, function (error, results, fields) {
        if (error) {
            res.status(401);
        } else {
            res.json({
                status: 200,
                data: results
            })
        }
    });
};