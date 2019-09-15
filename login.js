const jwt = require('jsonwebtoken');
let connection = require('./config');
module.exports.authenticate = function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    connection.query(`SELECT * FROM users WHERE email = '${email}'`, function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
            })
        } else {
            let token = jwt.sign({
                data: {id: results[0].id}
            }, 'secret', {expiresIn: '1h'});
            res.send({token});

            res.json({
                status: false,
                message: "Email does not exits"
            });
        }


    })
}

