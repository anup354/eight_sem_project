const db = require('../../constant/db')
const slug = require("slug");
const validateBank = require('../../validation/bank/bankValidation');

module.exports.addBank = async (request, response) => {
    const connection = await db.conn();
    const validateUser = await validateBank.registerBank(request)
    validateUser.check().then((matched) => {
        if (!matched) {
            return response.status(400).
                json({ errors: validateUser.errors })
        }
        const data =
        {
            bank_name: request.body.bank_name,
            shortform: request.body.shortform,
            interest_rate: request.body.interest_rate,
            tenure: request.body.tenure,
        }

        connection.query('insert into bank SET ?', data, (error, results) => {
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
}

module.exports.getBank = async (request, response) => {
    const connection = await db.conn();
    const getquery = `select *  from bank `
    // ORDER BY category_order ASC
    connection.query(getquery, (err, result) => {
        connection.release();

        if (err) {
            return response.status(400).json({
                message: "Some problem occured",
                sucess: false,
            })

        }
        else {
            return response.status(200).json({
                message: "Sucess",
                sucess: true,
                data: result

            })
        }
    })
};

module.exports.getByIdBank = async (request, response) => {
    const connection = await db.conn();
    const bankid = request.params.bank_id;
    const getquery = `select * from bank where bank_id=${bankid}`
    // ORDER BY category_order ASC
    connection.query(getquery, (err, result) => {
        connection.release();

        if (err) {
            return response.status(400).json({
                message: "Some problem occured",
                sucess: false,
            })

        }
        else {
            return response.status(200).json({
                message: "Sucess",
                sucess: true,
                data: result[0]

            })
        }
    })

};

module.exports.updateBank = async (request, response) => {
    const connection = await db.conn();
    const bankid = request.params.bank_id;

    const data = request.body;

    connection.query(`update bank SET ? where bank_id=${bankid}`, data, (error, result) => {
        connection.release();

        if (error) {
            return response.status(400).json({
                message: "Some problem occured" + error,
                sucess: false,
            })
        }
        else {
            return response.status(200).json({
                message: "Sucess",
                sucess: true,
                data: result
            })
        }
    })

};

module.exports.deleteBank = async (request, response) => {
    const connection = await db.conn();

    const { bank_id } = request.params

    const deletequery = `DELETE FROM bank WHERE bank_id= ${bank_id}`
    connection.query(deletequery, (error, result) => {
        connection.release();

        if (error) {
            response.status(400).json({
                message: "Data not deleted" + err,
                success: false
            })
        }
        else {

            response.status(200).json({
                message: "Data deleted",
                success: true
            })
        }
    });


}