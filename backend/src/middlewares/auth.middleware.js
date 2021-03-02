const {verify} = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const {authorization} = req.headers;

    try {
        if (!authorization) {
            throw new Error('Authorization not exists');
        }

        const [_, token] = authorization.split(' ');
        const payload = verify(token, process.env.JWT_SECRET_KEY);

        req.headers.loggedUser = payload;

        next();
    } catch (error) {
        res.status(401).send({message: error.message});
    }
};

module.exports = authMiddleware;