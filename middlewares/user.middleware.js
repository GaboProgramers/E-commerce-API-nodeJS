const User = require("../models/user.model");

exports.validUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({
            where: {
                id,
                status: true
            }
        })

        if (!user) {
            return res.status(404).json({
                status: 'error',
                messaje: 'Product not fount'
            })
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
        });
    }
}

// ? next =  sirve para decirle que siga ah la siguiente funcion.