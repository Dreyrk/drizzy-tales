"use client"

export default function Loader({ size = 64 }) {
    return <div style={{ height: `${size}px`, width: `${size}px` }} className="border-8 rounded-full place-self-center border-light-black border-t-purple-600 animate-spin" />
}