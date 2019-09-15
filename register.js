let connection = require('./config');
module.exports.register = function (req, res) {
    let users = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
    }
    connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
        if (error) {
            res.status(422);
            res.json({
                status: false,
                message: 'Wrong current password;',
                error,
            })
        } else {
            res.status(200).send('OK');
        }
    });
};