import { create } from 'zustand';

interface AuthModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

// create return a Zustand store (a state management hook)
// Zustand is a light-weight state-management library.
const useAuthModal = create<AuthModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export default useAuthModal;