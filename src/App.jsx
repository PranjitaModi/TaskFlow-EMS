import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'
import { loginUser } from './utils/api'

const App = () => {

  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData, setUserData, loadEmployees] = useContext(AuthContext)

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser') || localStorage.getItem('loggedInUser')
    
    if (loggedInUser) {
      try {
        const parsedData = JSON.parse(loggedInUser)
        setUser(parsedData.role)
        if (parsedData.role === 'employee') {
          setLoggedInUserData(parsedData.data)
        }
      } catch (err) {
        console.error("Error parsing loggedInUser session:", err)
      }
    }
  }, [])

  // Keep loggedInUserData in sync with latest userData from MongoDB
  useEffect(() => {
    if (user === 'employee' && loggedInUserData && userData) {
      const updatedEmp = userData.find(e => e.email === loggedInUserData.email)
      if (updatedEmp) {
        setLoggedInUserData(updatedEmp)
      }
    }
  }, [userData, user])


  const handleLogin = async (email, password) => {
    try {
      const res = await loginUser(email, password)
      if (res.role === 'admin') {
        setUser('admin')
        sessionStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
      } else if (res.role === 'employee') {
        setUser('employee')
        setLoggedInUserData(res.data)
        sessionStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: res.data }))
      }
    } catch (err) {
      alert(err.message || "Invalid Credentials")
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser')
    localStorage.removeItem('loggedInUser')
    setUser(null)
    setLoggedInUserData(null)
  }

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ''}
      {user === 'admin' ? (
        <AdminDashboard changeUser={handleLogout} />
      ) : user === 'employee' ? (
        <EmployeeDashboard changeUser={handleLogout} data={loggedInUserData} />
      ) : null}
    </>
  )
}

export default App