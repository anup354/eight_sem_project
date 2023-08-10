import React from 'react'
import AdminDashboard from '../../components/admin/dashboard';

const Dashboard = () => {
  return (
    <AdminDashboard/>
  )
}
Dashboard.requiredAuth = true;

export default Dashboard