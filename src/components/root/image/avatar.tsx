import { ReactNode } from 'react';

interface IAvatarProps {
	children?: ReactNode | string;
	className?: string;
	src?: string;
	onClick?: VoidFunction;
}

function Avatar({ className = 'h-8 w-8 ', ...props }: IAvatarProps) {
	if (props.children) {
		return (
			<div
				onClick={props.onClick}
				aria-hidden
				className={`h-10 w-10 rounded-full dark:bg-primary_light flex font-bold justify-center items-center dark:text-primary_dark ${className}`}>
				{props.children}
			</div>
		);
	}
	return <img loading='lazy' onClick={props.onClick} aria-hidden className={`rounded-full object-cover ${className}`} src={props.src} alt={props.src} />;
}

export default Avatar;
