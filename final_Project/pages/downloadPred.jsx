import React from 'react'
import Download from '../components/Download'
const downloadPred = () => {
    const data = {
        Gender: 'gender',
        Married: 'married',
        Dependents: 'request.body.Dependents',
        Education: 'education',
        Self_Employed: 'self_Employed',
        ApplicantIncome: 'request.body.ApplicantIncome',
        CoapplicantIncome: 'request.body.CoapplicantIncome',
        LoanAmount: 'request.body.LoanAmount',
        Loan_Amount_Term: 'request.body.Loan_Amount_Term',
        Credit_History: 'request.body.Credit_History',
        Property_Area: 'property_Area',
        Result: 'result',
      };
  return (
    <div className="bg-purple-200 text-white min-h-screen py-12">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-semibold text-purple-900 mb-4">
          Loan Application Result
        </h1>
        {Object.keys(data).map((key) => (
          <p key={key} className="text-gray-800">
            {key}: {data[key]}
          </p>
        ))}
      </div>
    </div>
  )
}
downloadPred.noHeader = true; // Do not display the header
downloadPred.noFooter = true; // Do not display the footer
export default downloadPred
