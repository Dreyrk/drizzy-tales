"use client"

import { useSession } from "next-auth/react";
import { useRef, useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./Loader";
import LoginError from "./LoginError";
import Header from "./Header";
import MessageForm from "./MessageForm";
import postMessage from "@/app/serverActions/postMessage"
import MessageDisplay from "./MessageDisplay";

export default function Chat({ data }) {
    const { status, data: session } = useSession();
    const [edit, setEdit] = useState(false);
    const formRef = useRef(null);

    const post = async (formData) => {
        const text = formData.get("messageText");
        const user = session?.user;

        if (text.length === 0 || text === "") {
            toast.warn("Please write a message")
        } else {
            const message = {
                user, text
            }
            await postMessage(message)
            formRef.current.reset()
            toast.success("Message sent !")
        }
    }

    if (status === "unauthenticated") {
        return (
            <>
                <Header edit={edit} setEdit={setEdit} />
                <LoginError />
            </>
        )
    } else if (status === "loading") {
        return (
            <div className="grid h-screen place-content-center">
                <Loader />
            </div>
        )
    } else if (status === "authenticated") {
        return (
            <div>
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    pauseOnHover
                    theme="dark"
                />
                <Header edit={edit} setEdit={setEdit} />
                <div>
                    <MessageDisplay data={data} />
                    <MessageForm formRef={formRef} handleAction={post} />
                </div>
            </div>
        )
    }
};
