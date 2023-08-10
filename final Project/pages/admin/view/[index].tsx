import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";

const View = () => {
  const router = useRouter();
  const [predictdata, setPredictdata] = useState();
  const [renderApp, setRenderApp] = useState(false);

  const generatePDF = () => {
    const input = document.getElementById("pdf-content");

    const opt = {
      margin: 10,
      filename: "example.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(input).set(opt).outputPdf();
  };

  const loadData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/predict/${id}`
      );
      console.log(response.data.data);
      setPredictdata(response.data.data);

      setRenderApp(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      loadData(router.query.index);
    }
  }, [router.isReady, router.query.index]);

  return (
    <>
      {renderApp && (
        <div className="grid grid-cols-12 gap-4">
          <div
            id="pdf-content"
            className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 bg-white rounded-lg shadow-md p-6"
          >
            <div className="text-xl font-bold text-center">
              Prediction Result
            </div>
            <div className="flex gap-2">
              <h2>
                Name:
                <span className="text-lg font-bold mb-4 ml-2">
                  {predictdata.firstName}
                  <span className="ml-2">{predictdata.lastName}</span>
                </span>
              </h2>
            </div>
            <p className="mb-2">Education: {predictdata.Education}</p>
            <p className="mb-2">Self Employed: {predictdata.Self_Employed}</p>
            <p className="mb-2">Married: {predictdata.Married}</p>
            <p className="mb-2">Gender: {predictdata.Gender}</p>
            <p className="mb-2">
              Applicant Income: {predictdata.ApplicantIncome}
            </p>
            <p className="mb-2">
              Coapplicant Income: {predictdata.CoapplicantIncome}
            </p>
            <p className="mb-2">Dependents: {predictdata.Dependents}</p>
            <p className="mb-2">Credit History: {predictdata.Credit_History}</p>
            <p className="mb-2">
              Loan Amount Term: {predictdata.Loan_Amount_Term}
            </p>
            <p className="mb-2">Loan Amount: {predictdata.LoanAmount}</p>
            <p className="mb-2">Property Area: {predictdata.Property_Area}</p>
            <p className="mb-2">Result: {predictdata.Result}</p>
          </div>
        </div>
      )}
      <button className="flex pt-3 ml-4" onClick={generatePDF}>
        Download PDF
      </button>
    </>
  );
};

View.requiredAuth = true;
export default View;
