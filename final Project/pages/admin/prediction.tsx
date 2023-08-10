import React from 'react'
import AdminPrediction from '../../components/admin/prediction'

const Prediction = () => {
  return (
    <AdminPrediction/>
  )
}
Prediction.requiredAuth = true;

export default Prediction