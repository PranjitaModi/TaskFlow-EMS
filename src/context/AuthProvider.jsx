import React, { createContext, useEffect, useState } from 'react'
import { fetchEmployees } from '../utils/api'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)

    const loadEmployees = async () => {
        const employees = await fetchEmployees()
        setUserData(employees)
    }

    useEffect(() => {
        loadEmployees()
    }, [])

    return (
        <AuthContext.Provider value={[userData, setUserData, loadEmployees]}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider