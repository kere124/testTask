let connection = require('./config');
module.exports.insertItems = function (req, res) {
    let title = req.body.title;
    let price = req.body.price;
    let userid = req.body.userid;
    connection.query(`INSERT INTO items (title,price,userid) VALUES ('${title}',${price},${userid})`, function (err, result) {
        if (err) {
            res.status(404);
            res.send({err});
        } else {

            res.status(200).send('OK');
        }
    });
}