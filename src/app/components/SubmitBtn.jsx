import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { IoSend } from "react-icons/io5";
import Loader from './Loader';

export default function SubmitBtn() {
    const { pending } = useFormStatus()
    return (
        <button disabled={pending} className="absolute p-2 rounded-lg bg-gradient-to-br from-purple-400 via-purple-600 to-violet-800 right-6" type="submit">
            {pending ? <Loader size={"full"} /> : <IoSend size={20} />}
        </button>
    )
}