import { Helper } from '@/utils/helper';
import { Fragment, ReactNode, useEffect } from 'react';

interface IAnimationScrollElementProps {
	children: ReactNode;
	animation?: string;
	id: string;
	onScroll?: (isIntoView: boolean) => void;
	idElementScroll: string;
}

function AnimationScrollElement(props: IAnimationScrollElementProps) {
	useEffect(() => {
		const element = document.querySelector(`#${props.id}`);
		const elementScroll = document.querySelector(
			`#${props.idElementScroll}`,
		);

		if (elementScroll) {
			elementScroll.addEventListener('scroll', () => {
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
		}
		return () => {
			window.removeEventListener('scroll', () => {});
		};
	}, [props]);

	return <Fragment>{props.children}</Fragment>;
}

export default AnimationScrollElement;
