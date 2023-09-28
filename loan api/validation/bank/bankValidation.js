const { Validator } = require('node-input-validator');
const db = require('../../constant/db')

module.exports.registerBank = async (request) => {
    const connection = await db.conn();
    const validateBank = await new Validator(request.body, {
        bank_name: 'required',
        shortform: 'required',
    });
    // Custom validation
    validateBank.addPostRule(async (provider) => {
        const checkBank = await uniquebank(provider.inputs.bank_name, connection)
        if (checkBank) {
            provider.error('Bank', 'custom', "Bank name already exist");
        }

    });
    return validateBank;
};
//check unique bank
function uniquebank(bank_name, connection) {
    return new Promise((resolve, reject) => {
        const query = `SELECT bank_name FROM bank WHERE bank_name = '${bank_name}'`;

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

//category
module.exports.addBlog= async (request) => {
    const connection = await db.conn();
    const validateCategory = await new Validator(request.body, {
        blog_name: 'required',
        description: 'required',
    });
    // Custom validation
    // validateCategory.addPostRule(async (provider) => {
    //     const checkBank = await uniqueCategory(provider.inputs.blog_name, connection)
    //     if (checkBank) {
    //         provider.error('Blog Name', 'custom', "Blog Name already exist");
    //     }

    // });
    return validateCategory;
};
//check unique category
// function uniqueCategory(category_name, connection) {
//     return new Promise((resolve, reject) => {
//         const query = `SELECT category_name FROM category WHERE category_name = '${category_name}'`;

//         connection.query(query, (error, results) => {
//             connection.release();
//             if (error) {
//                 resolve("some problem occur")
//             }
//             if (results.length > 0) {
//                 resolve(true)
//             } else {
//                 resolve(false)
//             }
//         })
//     })
// }


