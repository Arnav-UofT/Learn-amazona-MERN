import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET || 'securitysecret',
        {
            expiresIn: '30d',
        })
}

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization
    if (authorization) {
        const token = authorization.slice(7, authorization.length) // [Bearer xxxxxx]

        jwt.verify(token,
            process.env.jwt.JWT_SECRET || 'securitysecret',
            (err, decode) => {
                if (err) {
                    res.status(401).send({ message: 'Invalid Token' })
                } else {
                    req.user = decode
                    next()  // next middleware gets this user property by calling here
                }
            })
    } else {
        res.status(401).send({ message: 'No Token Found' })
    }
}