import React, { forwardRef } from 'react';

interface IVideoProps extends React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> {
	src: string;
	track: string;
	controls?: boolean;
	id?: string;
	mute?: boolean;
	autoPlay?: boolean;
	className?: string;
	ref?: React.Ref<HTMLVideoElement> | null;
}

const Video = forwardRef<HTMLVideoElement, IVideoProps>(({ autoPlay = false, className = '', ...props }, ref) => {
	return (
		<video
			{...props}
			ref={ref}
			id={props.id}
			muted={props.mute}
			autoPlay={autoPlay}
			className={`h-full w-full object-cover ${className}`}
			controls={props.controls}>
			<source src={props.src} type='video/mp4' />
			<track src={props.track} kind='captions' />
		</video>
	);
});

Video.displayName = 'Video';

export default Video;
