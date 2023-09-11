import { IoSend } from "react-icons/io5";

export default function MessageForm({ handleAction, formRef }) {
    return (
        <form ref={formRef} className="relative flex items-center justify-center h-[13vh] gap-4" action={handleAction}>
            <input className="w-full py-3 pl-2 pr-12 mx-4 text-black rounded-md" placeholder="Type a message..." name="messageText" type="text" autoComplete="off" />
            <button className="absolute p-2 rounded-lg bg-gradient-to-br from-purple-400 via-purple-600 to-violet-800 right-6" type="submit">
                <IoSend size={20} />
            </button>
        </form>
    )
}