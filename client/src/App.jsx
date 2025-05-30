import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Create from './Screens/Create'
import Login from './Screens/Login'
import VerifyOtp from './Screens/VerifyOtp'

const App = () => {
    return (
        <div className='w-full min-h-screen bg-zinc-900'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Create/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path="/verify" element={<VerifyOtp />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
