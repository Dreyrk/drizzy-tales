"use client"

export default function Loader({ size = 16 }) {
    return <div className={`w-${size} h-${size} border-8 border-t-8 rounded-full place-self-center border-light-black border-t-purple-600 animate-spin`}></div>
}