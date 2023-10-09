#for numerical and mathematical computations numpy
import numpy as np 
#for saving and loading Python objects, including complex data structures, efficiently->jolib
import joblib 

# Defining a function named 'preprocessdata' that takes several input variables
def preprocessdata(Gender, Married, Education, Self_Employed, ApplicantIncome,
       CoapplicantIncome, LoanAmount, Loan_Amount_Term, Credit_History,
       Property_Area):
# Creating a list called 'test_data' that contains a single list with input values
    test_data = [[Gender, Married, Education, Self_Employed, ApplicantIncome,
       CoapplicantIncome, LoanAmount, Loan_Amount_Term, Credit_History,
       Property_Area] ]  
# Loading a machine learning model from a file named 'model.pkl' using joblib       
    trained_model = joblib.load("model.pkl") 
 # Using the loaded model to make a prediction on the 'test_data'
    prediction = trained_model.predict(test_data) 
 # Returning the prediction result
    return prediction 
