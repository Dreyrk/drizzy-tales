import Link from "next/link"

export default function ProfileLink({ href, logo, text }) {
    return (
        <Link href={href} className="flex items-center w-full gap-2 p-8 font-bold text-white hover:text-purple-400 text-start">
            {logo}
            <span>{text}</span>
        </Link>
    )
}