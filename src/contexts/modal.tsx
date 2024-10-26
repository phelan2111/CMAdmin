import { createContext, Fragment, ReactNode, useMemo, useState } from 'react';

type ModalContextData = {
	hasModal: boolean;
	data: unknown;
	onCloseModal: VoidFunction;
	onModal: (dataItem: unknown, component: ReactNode) => void;
	component: ReactNode;
};

const initialModalContext: ModalContextData = {
	hasModal: false,
	data: {},
	onCloseModal: () => {},
	onModal: () => {},
	component: <Fragment />,
};

export const ModalContext = createContext(initialModalContext);

type ModalProviderProps = {
	children: ReactNode;
};
function ModalProvider(props: ModalProviderProps) {
	const [state, setState] = useState<Omit<ModalContextData, 'onCloseModal' | 'onModal'>>(initialModalContext);

	const handleModal = (dataItem: unknown, component: ReactNode) => {
		setState({
			data: dataItem,
			hasModal: true,
			component,
		});
	};
	const handleCloseModal = () => {
		setState((prev) => ({ ...prev, hasModal: false }));
	};

	const value = useMemo(
		() => ({
			...state,
			onCloseModal: handleCloseModal,
			onModal: handleModal,
		}),
		[state],
	);

	return <ModalContext.Provider value={value}>{props.children}</ModalContext.Provider>;
}

export default ModalProvider;
