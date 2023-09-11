import SubmitBtn from "./SubmitBtn";

export default function MessageForm({ handleAction, formRef }) {
    return (
        <form ref={formRef} className="relative flex items-center gap-4 pb-[13vh]" action={handleAction}>
            <input
                className="w-full py-3 pl-2 pr-12 mx-4 text-black placeholder-gray-400 rounded-md focus:outline-none focus:ring focus:ring-violet-400"
                placeholder="Type a message..."
                name="messageText"
                type="text"
                autoComplete="off"
            />
            <SubmitBtn />
        </form>
    )
}