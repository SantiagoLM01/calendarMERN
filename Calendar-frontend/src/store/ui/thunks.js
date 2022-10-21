import { onCloseDateModal, onOpenDateModal } from "./uiSlice"


export const openModal = () => {
    return( dispatch) => {
        dispatch(onOpenDateModal())
    }
}

export const closeModal = () => {
    return( dispatch) => {
        dispatch(onCloseDateModal())
    }
}