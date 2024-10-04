import { ReactNode } from 'react';

type WrapperProps = {
	children: ReactNode;
	className?: string;
};

function Wrapper({ className, ...props }: WrapperProps) {
	return (
		<section id='wrapper' className={`pl-8 pr-4 flex flex-col gap-6 text-white h-content overflow-auto scrollHiddenY ${className}`}>
			{props.children}
		</section>
	);
}

export default Wrapper;
