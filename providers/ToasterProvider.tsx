"use client"
import {Toaster} from "react-hot-toast";

const ToasterProvider = () => {
    return (
        <Toaster
        toastOptions={{
            style: {
                borderRadius: '8px',
                background: '#333',
                color: '#fff',
            },
        }}
        />
    )
}
export default ToasterProvider