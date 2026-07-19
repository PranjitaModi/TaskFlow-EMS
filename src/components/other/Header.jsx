import React from 'react'

const Header = (props) => {
  const username = props.data ? props.data.firstName : 'Director'

  const logOutUser = () => {
    sessionStorage.removeItem('loggedInUser')
    localStorage.removeItem('loggedInUser')
    props.changeUser('')
  }

  return (
    <div className='flex items-center justify-between pb-5 border-b border-slate-800/80 mb-6'>
      <div>
        <span className='text-xs font-semibold uppercase tracking-widest text-slate-500'>Dashboard Sync</span>
        <h1 className='text-xl font-medium text-slate-300 mt-0.5'>
          Welcome back,{' '}
          <span className='text-2xl font-bold bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-300 bg-clip-text text-transparent block md:inline'>
            {username} 👋
          </span>
        </h1>
      </div>
      <button 
        onClick={logOutUser} 
        className='bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs md:text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-rose-950/20 active:scale-95 outline-none'
      >
        Terminate Sync
      </button>
    </div>
  )
}

export default Header