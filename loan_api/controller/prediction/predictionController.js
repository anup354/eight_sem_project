const db = require('../../constant/db')


module.exports.prediction = async (request, response) => {
    const connection = await db.conn();
    // console.log(request.body.Result)
    const gender = request.body.Gender === "1" ? "Male" : "Female";
    const married = request.body.Married === "1" ? "Yes" : "No";
    const education = request.body.Education === "1" ? "Graduated" : "Ungraduated";
    const self_Employed = request.body.Self_Employed === "1" ? "Yes" : "No";
    const property_Area = request.body.Property_Area === "0" ? "Urban" : request.body.Property_Area === "1" ? "SemiUrban" : "Rural";
    const result = request.body.Result === 1 ? "Yes" : "No";
    const data =
    {
        "Gender": gender,
        "Married": married,
        "Dependents": request.body.Dependents,
        "Education": education,
        "Self_Employed": self_Employed,
        "ApplicantIncome": request.body.ApplicantIncome,
        "CoapplicantIncome": request.body.CoapplicantIncome,
        "LoanAmount": request.body.LoanAmount,
        "Loan_Amount_Term": request.body.Loan_Amount_Term,
        "Credit_History": request.body.Credit_History,
        "Property_Area": property_Area,
        "Result": result

    }
    // request.body;
    // Gender,
    // Married,
    // Education,
    // Self_Employed,
    // ApplicantIncome,
    // CoapplicantIncome,
    // LoanAmount,
    // Loan_Amount_Term,
    // Credit_History,
    // Property_Area,
    // Dependents,
    // Result
    const id = request.userId
    data.userid = id
    connection.query('insert into prediction SET ?', data, (error, results) => {
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
}

module.exports.getprediction = async (request, response) => {
    const connection = await db.conn();
    const query = `select * from prediction join registration where registration.registration_id=prediction.userid`;
    connection.query(query, (error, results) => {
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
                data: results
            })
        }
    });
}
module.exports.getbyidprediction = async (request, response) => {
    const connection = await db.conn();
    const id = request.params.id;
    console.log(id)
    const query = `select * from prediction join registration on registration.registration_id=prediction.userid where prediction.predict_id=${id}`;
    connection.query(query, (error, results) => {
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
                data: results[0]
            })
        }
    });
}


//delete herosection
module.exports.deletePrediction = async (request, response) => {
    const connection = await db.conn();

    const id = request.params.id;
    console.log(id)
    const query = `delete from prediction where predict_id=${id}`
    connection.query(query, async (error, result) => {
        connection.release();
        if (error) {
            return response.status(400).json({
                message: "Some problem occurred" + error,
                success: false,
            })
        }
        return response.status(200).json({
            message: "success",
            success: true,
        });
    })

}