import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch()
    
    const navigate = useNavigate();

    const logoutUesr = ()=>{
        navigate('/')
        dispatch(logout())
    }
  return (
    <div className='shadow-bg-white'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-20 py-3.5
        text-slate-800 transition-all bg-gray-100'>
            <Link to='/'>
            <img src="/logo.svg" alt="logo" className='h-11 w-auto' />
            </Link>  
            <div className='flex items-center text-sm gap-4'>
                <p className='max-sm:hidden'>Hi, {user?.name} </p>
                <button onClick={logoutUesr} className='bg-white hover:bg-slate-50 border border-gray-300
                px-7 py-1.5 rounded-full transition-all'>Logout</button>
                </div>     
             </nav>
      
    </div>
  )
}

export default Navbar
