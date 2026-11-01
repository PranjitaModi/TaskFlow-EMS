import React, { useState } from 'react'

const Login = ({ handleLogin }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    handleLogin(email, password)
    setEmail("")
    setPassword("")
  }

  return (
    <div className="flex min-h-screen w-screen items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl p-8 md:p-10">
        
        {/* Logo and Brand Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/20 mb-3">
            <span className="text-white text-2xl font-black tracking-tighter">T</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-200 via-slate-100 to-violet-200 bg-clip-text text-transparent">
            TaskFlow EMS
          </h2>
          <p className="text-sm text-slate-400 mt-1.5 font-medium">Employee Management System</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">
              Authorized Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-950/40 border border-slate-800 text-white rounded-xl py-3 px-4 text-base outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-all duration-200 placeholder:text-slate-600"
              type="email"
              placeholder="director@taskflowems.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">
              Access Code
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-slate-950/40 border border-slate-800 text-white rounded-xl py-3 px-4 text-base outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-all duration-200 placeholder:text-slate-600"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-250 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] outline-none">
            Sign In
          </button>
        </form>

        {/* Credentials helper footer */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 text-center">
          <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">Demo Gateways (Pass: 123)</p>
          <div className="flex flex-col gap-1 text-[11px] text-slate-400">
            <p><span className="font-semibold text-indigo-400">Director:</span> director@taskflowems.com</p>
            <p><span className="font-semibold text-violet-400">Associate:</span> e@e.com (Alex) / sophia@taskflowems.com</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login
