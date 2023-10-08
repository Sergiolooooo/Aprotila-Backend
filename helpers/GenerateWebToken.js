const jwt = require('jsonwebtoken');
require('dotenv').config();


//Va a generar el token con la identificacion y el rol
const GenerateJWT = async (_id='', name='', identification = '', rol = '') => {
    const options = {
        expiresIn: '5d' // Esta es la duracion del token, se puede cambiar
    }
    // '6h'
    return new Promise((resolve, reject) => {
        const payload = { _id, name, identification, rol };
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY, options, (err, token) => {
                if (err) {
                    reject('No se pudo generar el token')
                } else {
                    resolve(token)
                }
            }
        )

    })
}

module.exports = GenerateJWT
