let express = require("express");
let bodyParser = require('body-parser');
let connection = require('./config');
let app = express();
let multer = require('multer');
let jwt = require('jsonwebtoken');
let authenticateController = require('./login');
let registerController = require('./register');
let uploadItemImageController = require('./uploadItemImage');
let getUserController = require('./getUser');
let deleteItemController = require('./delete');
let getItemController = require('./getItem');
let insertItemController = require('./insertItem');
let updateItemController = require('./updateItem');
let getItemsListController = require('./getItemsList');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
let upload = multer({dest: 'uploads/'});

function checkAuthorization(req, res, next) {
    let token;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
        let decodeToken = jwt.verify(token, 'secret');
        if (decodeToken.data && decodeToken.data.id) {
            return next();
        } else {
            res.status(401);
            res.end("not authorised");
        }
    }
}

app.get('/api/items', getItemsListController.getItemsListItems, checkAuthorization);
app.get('/api/items/:id', getItemController.getItem, checkAuthorization);
app.get('/api/:id', getUserController.getUser, checkAuthorization);
app.post('/api/items/:id/images', upload.single('itemImage'), uploadItemImageController.uploadItemImage, checkAuthorization);
app.post('/api/register', registerController.register);
app.post('/api/login', authenticateController.authenticate);
app.delete('/api/items/:id', deleteItemController.deleteItem, checkAuthorization);
app.post('/api/items', insertItemController.insertItems, checkAuthorization);
app.put('/api/items/:id', updateItemController.updateItems, checkAuthorization);
app.listen(3000);