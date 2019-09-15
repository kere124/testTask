const multer = require('multer');
let connection = require('./config');
module.exports.uploadItemImage = function (req, res) {
    let storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, `${__dirname}/uploads`);
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname);
        }
    });
    if (!req.file) {
        res.status(400);
        return res.end("file is not provided")
    }
    const filePath = "http://localhost:3000/" + req.file.destination + req.file.filename;
    connection.query(`UPDATE items SET image='${filePath}' WHERE id_item=${req.params.id}`, function (err, result) {
        if (err) {
            res.send({err});
        } else {
            res.status(200).send('OK');
        }
    });

}