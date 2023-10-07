import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Link from "next/link";
import Portallayout from "../../../components/portalLayout/portallayout";

const View = () => {
  const router = useRouter();
  const [predictdata, setPredictdata] = useState();
  const [renderApp, setRenderApp] = useState(false);

  const generatePDF = () => {
    const input = document.getElementById("pdf-content");

    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF("p", "pt", "A4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      let pageData = canvas.toDataURL("image/png", 1.0);
      pdf.addImage(pageData, "PNG", 0, 0, pageWidth, pageWidth / ratio);
      pdf.save("predictdata.pdf");
    });
  };

  const loadData = async (id) => {
    console.log("id", id);
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
    <Portallayout>

    <>
      {renderApp && (
        <div className="">
          <Link href="/portal/predictresult">

          <button className=" ml-4 mt-3 bg-purple-800 p-2 text-white rounded-md mb-5">
            Back
          </button>
          </Link>
          
          <div id="pdf-content" className="p-5">
            <div className="">
              <div className="container mx-auto ">
                <h1 className="text-3xl font-semibold text-purple-900 mb-6">
                  Loan Application Result of ({predictdata.firstName}{" "}
                  {predictdata.lastName})
                </h1>
                <p className="mb-2">Education: {predictdata.Education}</p>
                <p className="mb-2">
                  Self Employed: {predictdata.Self_Employed}
                </p>
                <p className="mb-2">Married: {predictdata.Married}</p>
                <p className="mb-2">Gender: {predictdata.Gender}</p>
                <p className="mb-2">
                  Applicant Income: {predictdata.ApplicantIncome}
                </p>
                <p className="mb-2">
                  Coapplicant Income: {predictdata.CoapplicantIncome}
                </p>
                <p className="mb-2">Dependents: {predictdata.Dependents}</p>
                <p className="mb-2">
                  Credit History: {predictdata.Credit_History}
                </p>
                <p className="mb-2">
                  Loan Amount Term: {predictdata.Loan_Amount_Term}
                </p>
                <p className="mb-2">Loan Amount: {predictdata.LoanAmount}</p>
                <p className="mb-2">
                  Property Area: {predictdata.Property_Area}
                </p>
                <p className="mb-2">
                  Predict Date : {predictdata.date}
                </p>
                <p className="mb-2">
                  Result:{" "}
                  {predictdata.Result == "Yes" ? "Approved" : "Not Approved"}
                </p>
              </div>
            </div>
          </div>
          <button
            className=" ml-4 bg-purple-800 p-2 text-white rounded-md mb-5"
            onClick={generatePDF}
          >
            Download PDF
          </button>
        </div>
      )}
    </>
    </Portallayout>
  );
};


export default View;
