const validUser = require('../../validation/userRegistration/authValidation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config()

const db = require('../../constant/db')
// api for register user
module.exports.register = async (request, response) => {
    const connection = await db.conn();
    const validateUser = await validUser.registerUser(request)

    validateUser.check().then((matched) => {
        if (!matched) {
            return response.status(400).
                json({ errors: validateUser.errors })
        }

        //password encryption using bcrypt
        bcrypt.hash(request.body.password, 10, function (error, hash_password) {
            if (error) {
                return response.status(400).json({
                    message: "Some problem occured" + error,
                    success: false,
                })
            }
            const data = request.body
            data.password = hash_password
            data.created_at = new Date()
            delete data.confirmpassword

            connection.query('insert into registration SET ?', data, (error, results) => {
                connection.release();

                if (error) {
                    return response.status(400).json({
                        message: "Some problem occured" + error,
                        success: false,
                    })
                }
                else {
                    return response.status(200).json({
                        message: "success",
                        success: true,
                    })
                }
            });
        });
    });
};

// user login

module.exports.login = async (request, response) => {
    const connection = await db.conn();
    const validateLogin = await validUser.loginUser(request)
    validateLogin.check().then((matched) => {
        if (!matched) {
            return response.status(400).
                json({ errors: validateLogin.errors })
        }
        const loginData = request.body
        const query = 'SELECT * FROM registration WHERE email = ?'
        connection.query(query, [loginData.email], async (error, result) => {
            connection.release();
            if (error) {
                return response.status(400).json({
                    message: "Some problem occured" + error,
                    success: false,
                })
            }
            if (!result.length) {
                return response.status(400).json({
                    message: "Email not found",
                    success: false,
                })
            }
            const isPasswordValid = await bcrypt.compare(loginData.password, result[0].password);
            if (isPasswordValid) {
                const token = jwt.sign({ id: result[0].registration_id, }, process.env.SECRET_KEY);
                return response.status(200).json({
                    message: "Login success",
                    success: true,
                    token: token,
                    role: result[0].role,
                    firstname: result[0].firstName,
                    lastname: result[0].lastName,

                })
            } else {
                return response.status(400).json({
                    message: "Invalid Email/Password",
                    success: false,

                })

            }
        })
    })
}
