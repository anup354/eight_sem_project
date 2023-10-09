import React from "react";
import Bankcard from "./bankcard";

const Bank = () => {
  const faqsList = [
    {
      q: "What is a personal loan?",
      a: "A personal loan is an unsecured loan provided by financial institutions, such as banks or credit unions, to individuals for various personal expenses, like debt consolidation, home improvement, or medical bills.",
    },
    {
      q: "How does a personal loan work?",
      a: "Personal loans are typically repaid in fixed monthly installments over a specified loan term. Borrowers receive a lump sum upfront and repay the loan, including interest, over time.",
    },
    {
      q: "How do lenders determine eligibility for a personal loan?",
      a: "Lenders assess eligibility based on factors like credit score, income, employment history, and debt-to-income ratio. A higher credit score often leads to better loan terms.",
    },
    {
      q: " Can I use a personal loan for any purpose?",
      a: "Yes, personal loans are versatile and can be used for various purposes, including debt consolidation, home repairs, medical expenses, education costs, and more.",
    },
    {
      q: "What is the loan application process like?",
      a: "The The application process typically involves filling out an application form, providing necessary documentation (proof of income, identification), and undergoing a credit check.",
    }
  ];

  return (
    <section className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl text-gray-800 font-semibold">
          Available Banks for providing loan.
        </h1>
      </div>
      <div className="mt-14 max-w-2xl mx-auto">
        {faqsList.map((item, idx) => (
          <div key={idx}>
            <Bankcard idx={idx} faqsList={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Bank;
