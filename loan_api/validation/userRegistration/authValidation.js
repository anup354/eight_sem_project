const { Validator } = require('node-input-validator');
const db = require('../../constant/db')

module.exports.registerUser = async (request) => {
    const connection = await db.conn();
    const validateUser = await new Validator(request.body, {
        firstName: 'required',
        lastName: 'required',
        email: 'required|email',
        password: 'required|minLength:8',
        confirmpassword: 'required|minLength:8|same:password',
        
    });
    // Custom validation
    validateUser.addPostRule(async (provider) => {
        const checkEmail = await email(provider.inputs.email, connection)
      
        if (checkEmail) {
            provider.error('email', 'custom', "Email already exist");
        }
        
    });
    return validateUser;
};
//check unique email
function email(email, connection) {
    return new Promise((resolve, reject) => {
        const query = `SELECT email FROM registration WHERE email = '${email}'`;

        connection.query(query, (error, results) => {
            connection.release();
            if (error) {
                resolve("some problem occur")
            }
            if (results.length > 0) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
}

//Field validation of user login
module.exports.loginUser = (request) => {

    const validateLogin = new Validator(request.body, {
        email: 'required|email',
        password: 'required|minLength:8',
    })
    return validateLogin
};