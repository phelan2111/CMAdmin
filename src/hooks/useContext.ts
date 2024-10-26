import { ModalContext } from '@/contexts/modal';
import { ToastContext } from '@/contexts/toast';
import { useContext } from 'react';

export const useModal = () => useContext(ModalContext);
export const useToast = () => useContext(ToastContext);
