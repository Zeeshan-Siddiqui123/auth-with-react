
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'




const Login = () => {

  const [data, setData] = useState({ email: "", password: "" })
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = data
    if (!email || !password) {
      setError("All Fields Are Required")
      setTimeout(() => {
        setError("")
      }, 2000)
      setMessage("")
      return
    }
    try {
      const res = await axios.post("http://localhost:3000/login", data)
      setMessage(res.data.message)
      setError("")
      setData({
        email: "",
        password: ""
      });
      setTimeout(() => {
        setMessage("")
        navigate('/')
        
      }, 2000)
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong")
      setTimeout(() => {
        setError("")
      }, 2000)
      setData({
        email: "",
        password: ""
      });
      setMessage("")
      
    }
  }

  return (
    <div className='flex items-center justify-center flex-col p-50 text-white'>
      <h3 className='text-3xl mb-5'>Login Your Account</h3>
      <form action="" className='bg-white p-10 rounded-lg' onSubmit={handleLogin}>
        <div className='flex items-center justify-center flex-col gap-5'>

          <input type="email" placeholder='Enter Your Email' onChange={handleChange} value={data.email} name='email' className='px-5 py-3 w-[200px] lg:w-[400px] outline-none border-2 border-zinc-800 rounded-md bg-zinc-700' />
          <input type="password" placeholder='Enter Password' onChange={handleChange} name='password' value={data.password} className='px-5 py-3 w-[200px] lg:w-[400px] outline-none border-2 border-zinc-800 rounded-md bg-zinc-700' />
          <input type="submit" value='Login' className='px-5 py-3 cursor-pointer bg-blue-500 rounded-md w-[200px] lg:w-[400px]' />
          {message && <p className='text-green-600 font-semibold'>{message}</p>}
          {error && <p className='text-red-600 font-semibold'>{error}</p>}
          <h5 className='text-black'>Don't have an account <Link className='text-blue-500 underline' to="/">Create Account</Link></h5>
        </div>

      </form>
    </div>
  )
}

export default Login
