import React from 'react'

const Login = () => {
    return (
        <div className='flex items-center justify-center flex-col p-50 text-white'>
            <h3 className='text-3xl mb-5'>Login Your Account</h3>
            <form action="" className='bg-white p-10 rounded-lg'>
                <div className='flex items-center justify-center flex-col gap-5'>
                    <input type="email" placeholder='Enter Your Email' name='email' className='px-5 py-3 w-[200px] lg:w-[400px] outline-none border-2 border-zinc-800 rounded-md bg-zinc-700'/>
                    <input type="password" placeholder='Enter Password' name='password' className='px-5 py-3 w-[200px] lg:w-[400px] outline-none border-2 border-zinc-800 rounded-md bg-zinc-700'/>
                    <input type="submit" value='Login' className='px-5 py-3 cursor-pointer bg-blue-500 rounded-md w-[200px] lg:w-[400px]'/>
                </div>

            </form>
        </div>
    )
}

export default Login
