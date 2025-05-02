import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Create = () => {
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    age: "",
    password: ""
  })
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    const { name, username, email, age, password } = data
    if (!name || !username || !email || !age || !password) {
      setError("All fields are required")
      setTimeout(() => {
        setError("")
      }, 1000)
      setMessage("")
      return
    }

    try {
      const res = await axios.post("http://localhost:3000/create", data)
      setMessage(res.data.message)
      setError("")
      setData({

      });
      setTimeout(() => {
        setMessage("")
        navigate('/login')
      }, 2000)
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong")
      setTimeout(() => {
        setError("")
      }, 1000)
      setData({
        name: "",
        username: "",
        email: "",
        age: "",
        password: ""
      });
      setMessage("")

    }

  }

  return (
    <div className='flex items-center justify-center flex-col p-20 text-white'>
      <h3 className='text-3xl mb-5'>Create Your Account</h3>
      <form onSubmit={handleSubmit} className='bg-white p-10 rounded-lg'>
        <div className='flex items-center justify-center flex-col gap-5'>

          <input type="text" placeholder='Enter Your Name' name='name' value={data.name} onChange={handleChange}
            className='px-5 py-3 w-[200px] lg:w-[400px] outline-none border-2 border-zinc-800 rounded-md bg-zinc-700' />
          <input type="text" placeholder='Enter Username' name='username' value={data.username} onChange={handleChange}
            className='px-5 py-3 w-[200px] lg:w-[400px] outline-none border-2 border-zinc-800 rounded-md bg-zinc-700' />
          <input type="email" placeholder='Enter Your Email' name='email' value={data.email} onChange={handleChange}
            className='px-5 py-3 w-[200px] lg:w-[400px] outline-none border-2 border-zinc-800 rounded-md bg-zinc-700' />
          <input type="number" placeholder='Enter Your Age' name='age' value={data.age} onChange={handleChange}
            className='px-5 py-3 w-[200px] lg:w-[400px] outline-none border-2 border-zinc-800 rounded-md bg-zinc-700' />
          <input type="password" placeholder='Enter Password' name='password' value={data.password} onChange={handleChange}
            className='px-5 py-3 w-[200px] lg:w-[400px] outline-none border-2 border-zinc-800 rounded-md bg-zinc-700' />
          <input type="submit" value='Create Account'
            className='px-5 w-[200px] lg:w-[400px] py-3 cursor-pointer bg-blue-500 rounded-md' />
          {message && <p className='text-green-600 font-semibold'>{message}</p>}
          {error && <p className='text-red-600 font-semibold'>{error}</p>}
          <h5 className='text-black'>Already have an account <Link className='text-blue-500 underline' to="/login">Login</Link></h5>
        </div>
      </form>
    </div>
  )

}

export default Create
