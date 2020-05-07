function authorizeRole(roles) {
    return [
        (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return res
                    .status(403)
                    .send('You have no permission to access this data');
            }
            next();
        },
    ];
}

module.exports = authorizeRole;
