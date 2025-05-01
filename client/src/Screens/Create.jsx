import React, { useState } from 'react'
import axios from 'axios'

const Create = () => {
    const [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        age: "",
        password: ""
    })
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:3000/create", data, { withCredentials: true })
            console.log(res.data.message)
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='flex items-center justify-center flex-col p-20 text-white'>
            <h3 className='text-3xl mb-5'>Create Your Account</h3>
            <form  method='post' onSubmit={handleSubmit} className='bg-white p-10 rounded-lg'>
                <div className='flex items-center justify-center flex-col gap-5'>
                    <input
                        type="text"
                        placeholder='Enter Your Name'
                        name='name'
                        value={data.name}
                        onChange={handleChange}
                        className='px-5 py-3 w-[200px] lg:w-[400px] outline-none border-2 border-zinc-800 rounded-md bg-zinc-700' />
                    <input
                        type="text"
                        placeholder='Enter Username'
                        name='username'
                        value={data.username}
                        onChange={handleChange}
                        className='px-5 py-3 w-[200px] lg:w-[400px] outline-none border-2 border-zinc-800 rounded-md bg-zinc-700' />
                    <input
                        type="email"
                        placeholder='Enter Your Email'
                        name='email'
                        value={data.email}
                        onChange={handleChange}
                        className='px-5 py-3 w-[200px] lg:w-[400px] outline-none border-2 border-zinc-800 rounded-md bg-zinc-700' />
                    <input
                        type="number"
                        placeholder='Enter Your Age'
                        name='age'
                        value={data.age}
                        onChange={handleChange}
                        className='px-5 py-3 w-[200px] lg:w-[400px] outline-none border-2 border-zinc-800 rounded-md bg-zinc-700' />
                    <input
                        type="password"
                        placeholder='Enter Password'
                        value={data.password}
                        name='password'
                        onChange={handleChange}
                        className='px-5 py-3 w-[200px] lg:w-[400px] outline-none border-2 border-zinc-800 rounded-md bg-zinc-700' />
                    <input
                        type="submit"
                        value='Create Account'
                        className='px-5 w-[200px] lg:w-[400px] py-3 cursor-pointer bg-blue-500 rounded-md' />
                </div>

            </form>
        </div>
    )
}

export default Create
