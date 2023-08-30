"use client"

import { useRouter } from 'next/navigation'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'
import FormInput from './FormInput'
import { useState } from 'react'
import authFetcher from '../../utils/authFetcher'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from 'next-auth/react'

export default function Login() {
    const router = useRouter()
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    })

    const formInputs = [
        {
            id: "email",
            label: "Email",
            value: loginUser.email,
            setValue: setLoginUser,
            logo: <AiOutlineMail size={30} />,
            type: "text"
        },
        {
            id: "password",
            label: "Password",
            value: loginUser.password,
            setValue: setLoginUser,
            logo: <AiOutlineLock size={30} />,
            type: "password"
        },
    ]

    const login = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn("credentials", { ...loginUser, redirect: false })
            if (res.error) {
                toast.error('Invalid credentials...')

            } else {
                toast.success('Login successfully !')
                setTimeout(() => router.refresh(), "2000")
            }
        } catch (e) {
            throw new Error(`Failed to login: ${e.message}`)
        }

    }



    return (
        <div className="rounded-lg bg-slate-100">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="dark"
            />
            <form onSubmit={login} className="flex flex-col items-center justify-center gap-12 p-8">
                <h1 className='m-0 text-2xl font-bold text-black'>Sign In</h1>
                {formInputs.map((input) => {
                    return <FormInput key={input.id} id={input.id} label={input.label} value={input.value} setValue={input.setValue} logo={input.logo} type={input.type} />
                })}
                <button type='submit' className='px-4 py-1 text-lg font-semibold hover:text-red-600 text-slate-50 bg-gradient-to-br from-violet-500 to-purple-800 rounded-2xl'>
                    Login
                </button>
            </form>
        </div>
    )
}