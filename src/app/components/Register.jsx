"use client"

import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai'
import FormInput from './FormInput'
import { useState } from 'react'
import authFetcher from '../../utils/authFetcher'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader'


export default function Register({ setRegistered }) {
    const [newUser, setNewUser] = useState({
        pseudo: "",
        email: "",
        password: ""
    })
    const [checkedPassword, setCheckedPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const formInputs = [
        {
            id: "pseudo",
            label: "Username",
            value: newUser.pseudo,
            setValue: setNewUser,
            logo: <AiOutlineUser size={30} />,
            type: "text"
        },
        {
            id: "email",
            label: "Email",
            value: newUser.email,
            setValue: setNewUser,
            logo: <AiOutlineMail size={30} />,
            type: "text"
        },
        {
            id: "password",
            label: "Password",
            value: newUser.password,
            setValue: setNewUser,
            logo: <AiOutlineLock size={30} />,
            type: "password"
        },
        {
            id: "confirm-password",
            label: "Confirm Password",
            value: checkedPassword,
            setValue: setCheckedPassword,
            logo: <AiOutlineLock size={30} />,
            type: "password"
        },
    ]

    const register = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (newUser.password !== checkedPassword) {
                toast.warn('Please confirm your password to register')
                return;
            } else {
                const { success, status, message, error } = await authFetcher("register", newUser);
                if (success || status === 201) {
                    setLoading(false)
                    toast.success(message)
                    setTimeout(() => setRegistered(true), "2000")
                } else {
                    setLoading(false)
                    toast.error(message);
                    console.log(error)
                }
            }
        } catch (e) {
            setLoading(false)
            throw new Error(`Failed to register: ${e.message}`)
        }
    }

    return (
        <div className="rounded-lg bg-slate-100 min-h-[250px] min-w-[360px] relative">
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
            {
                !loading ?
                    <form onSubmit={register} className="flex flex-col items-center justify-center gap-12 p-8">
                        <h1 className='m-0 text-2xl font-bold text-black'>Sign Up</h1>
                        {formInputs.map((input) => {
                            return <FormInput key={input.id} id={input.id} label={input.label} value={input.value} setValue={input.setValue} logo={input.logo} type={input.type} />
                        })}
                        <button type='submit' className='px-4 py-1 text-lg font-semibold hover:text-red-600 text-slate-50 bg-gradient-to-br from-violet-500 to-purple-800 rounded-2xl'>
                            Register
                        </button>
                    </form>
                    :
                    <div className='absolute top-[110px] right-[145px]'>
                        <Loader />
                    </div>
            }
        </div>
    )
}