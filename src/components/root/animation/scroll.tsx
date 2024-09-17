import { Helper } from '@/utils/helper';
import { Fragment, ReactNode, useEffect } from 'react';

interface IAnimationScrollProps {
	children: ReactNode;
	animation?: string;
	id: string;
	onScroll?: (isIntoView: boolean) => void;
}

function AnimationScroll(props: IAnimationScrollProps) {
	useEffect(() => {
		const element = document.querySelector(`#${props.id}`);
		window.addEventListener('scroll', () => {
			console.log('element', element);
			if (element) {
				if (props.animation) {
					if (Helper.isIntoView(element)) {
						element.classList.add(props.animation);
					} else {
						element.classList.remove(props.animation);
					}
				}
				if (props.onScroll) {
					props.onScroll(Helper.isIntoView(element));
				}
			}
		});
		return () => {
			window.removeEventListener('scroll', () => {});
		};
	}, [props]);

	return <Fragment>{props.children}</Fragment>;
}

export default AnimationScroll;
