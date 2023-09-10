import Link from "next/link";

export default function LoginError() {
    return (
        <div className="content">
            <div className="grid mt-40 gap-14 place-items-center">
                <h1 className="text-4xl font-extrabold text-center text-white">Sign In to access this feature</h1>
                <Link className="px-6 py-1 text-lg max-w-[40%] text-center font-semibold text-white bg-red-600 hover:text-black rounded-xl" href={"/profile"}>Sign in</Link>
            </div>
        </div>
    )
};