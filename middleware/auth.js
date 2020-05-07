const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const authorization = req.header('Authorization');
    if (!authorization)
        return res.status(401).send('Access denied: Invalid token.');
    const token = authorization.split(' ')[1];
    try {
        const payload = jwt.verify(token, 'CRpr4mgr5BqpXV');
        req.user = payload;
        next();
    } catch (e) {
        res.status(401).send('Access denied: Invalid token.');
    }
}
module.exports = auth;
