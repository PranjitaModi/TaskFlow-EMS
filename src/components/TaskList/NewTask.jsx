import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { updateTaskStatus } from '../../utils/api'

const NewTask = ({ data, employeeEmail }) => {
    const [userData, setUserData, loadEmployees] = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const acceptHandler = async () => {
        setLoading(true)
        try {
            let emailToUse = employeeEmail
            if (!emailToUse) {
                const loggedIn = JSON.parse(sessionStorage.getItem('loggedInUser') || localStorage.getItem('loggedInUser') || '{}')
                if (loggedIn && loggedIn.data) {
                    emailToUse = loggedIn.data.email
                }
            }

            const res = await updateTaskStatus({
                employeeEmail: emailToUse,
                taskTitle: data.taskTitle,
                taskDate: data.taskDate,
                action: 'accept'
            })

            if (res.allEmployees) {
                setUserData(res.allEmployees)
            } else if (loadEmployees) {
                await loadEmployees()
            }
        } catch (err) {
            alert(err.message || 'Failed to claim task')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex-shrink-0 w-[310px] p-6 bg-slate-900/60 backdrop-blur-md border border-indigo-500/25 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden group'>
            <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-300"></div>
            <div>
                <div className='flex justify-between items-center'>
                    <span className='bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg'>
                        {data.category}
                    </span>
                    <span className='text-xs font-semibold text-slate-500'>{data.taskDate}</span>
                </div>
                <h2 className='mt-4 text-lg font-bold text-slate-200 leading-snug'>{data.taskTitle}</h2>
                <p className='text-xs text-slate-400 mt-2 leading-relaxed max-h-[90px] overflow-y-auto pr-1'>
                    {data.taskDescription}
                </p>
            </div>
            <div className='mt-6 pt-4 border-t border-slate-800/60'>
                <button 
                    disabled={loading}
                    onClick={acceptHandler} 
                    className='w-full bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 border border-indigo-500/20 rounded-xl py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-200 outline-none disabled:opacity-50'
                >
                    {loading ? 'Claiming...' : 'Claim Sync'}
                </button>
            </div>
        </div>
    )
}

export default NewTask