import {create} from "zustand"

interface Auth {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useAuthModal = create<Auth>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))
export default useAuthModal