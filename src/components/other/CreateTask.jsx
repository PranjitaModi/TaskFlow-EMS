import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { createEmployeeTask } from '../../utils/api'

const CreateTask = () => {

    const [userData, setUserData, loadEmployees] = useContext(AuthContext)

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [asignTo, setAsignTo] = useState('')
    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await createEmployeeTask({
                asignTo,
                taskTitle,
                taskDescription,
                taskDate,
                category
            })

            if (res.allEmployees) {
                setUserData(res.allEmployees)
            } else if (loadEmployees) {
                await loadEmployees()
            }

            setTaskTitle('')
            setCategory('')
            setAsignTo('')
            setTaskDate('')
            setTaskDescription('')
            alert('Task sync initiated and saved to MongoDB!')
        } catch (err) {
            alert(err.message || 'Failed to create task')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='p-6 md:p-8 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 mt-6 rounded-2xl shadow-xl'>
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                Initiate New Workspace Sync
            </h2>
            <form onSubmit={submitHandler} className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                    <div>
                        <label className='block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1'>
                            Objective Title
                        </label>
                        <input
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            required
                            className='w-full bg-slate-950/40 border border-slate-800 rounded-xl py-2.5 px-4 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 text-slate-100 text-sm transition-all duration-200 placeholder:text-slate-600' 
                            type="text" 
                            placeholder='Re-architect Portal Interface'
                        />
                    </div>
                    
                    <div>
                        <label className='block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1'>
                            Target Completion Date
                        </label>
                        <input
                            value={taskDate}
                            onChange={(e) => setTaskDate(e.target.value)}
                            required
                            className='w-full bg-slate-950/40 border border-slate-800 rounded-xl py-2.5 px-4 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 text-slate-100 text-sm transition-all duration-200' 
                            type="date" 
                        />
                    </div>
                    
                    <div>
                        <label className='block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1'>
                            Assignee Teammate (First Name)
                        </label>
                        <input
                            value={asignTo}
                            onChange={(e) => setAsignTo(e.target.value)}
                            required
                            className='w-full bg-slate-950/40 border border-slate-800 rounded-xl py-2.5 px-4 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 text-slate-100 text-sm transition-all duration-200 placeholder:text-slate-600' 
                            type="text" 
                            placeholder='e.g., Alex, Sophia'
                        />
                    </div>
                    
                    <div>
                        <label className='block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1'>
                            Classification / Tag
                        </label>
                        <input
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className='w-full bg-slate-950/40 border border-slate-800 rounded-xl py-2.5 px-4 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 text-slate-100 text-sm transition-all duration-200 placeholder:text-slate-600' 
                            type="text" 
                            placeholder='Interface Design, Core Engineering'
                        />
                    </div>
                </div>

                <div className='flex flex-col h-full justify-between'>
                    <div className="flex-1 flex flex-col">
                        <label className='block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1'>
                            Detailed Directives & Scope
                        </label>
                        <textarea 
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)} 
                            required
                            className='w-full flex-1 min-h-[140px] bg-slate-950/40 border border-slate-800 rounded-xl py-3 px-4 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 text-slate-100 text-sm transition-all duration-200 placeholder:text-slate-600 resize-none' 
                            placeholder='Outline objectives, technical constraints, and telemetry validation targets...'
                        ></textarea>
                    </div>
                    <button 
                        disabled={loading}
                        className='w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/10 active:scale-[0.99] mt-6 text-sm outline-none disabled:opacity-50'
                    >
                        {loading ? 'Initiating Sync...' : 'Initiate Sync'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask