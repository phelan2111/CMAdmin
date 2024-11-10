import React, { forwardRef } from 'react';

interface IAudioProps extends React.DetailedHTMLProps<React.AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement> {
	src: string;
	track: string;
	controls?: boolean;
	id?: string;
	mute?: boolean;
	autoPlay?: boolean;
	className?: string;
	ref?: React.Ref<HTMLAudioElement> | null;
}

const Audio = forwardRef<HTMLAudioElement, IAudioProps>(({ autoPlay = false, className = '', ...props }, ref) => {
	return (
		<audio
			{...props}
			ref={ref}
			id={props.id}
			muted={props.mute}
			autoPlay={autoPlay}
			className={`h-full w-full object-cover ${className}`}
			controls={props.controls}>
			<source src='horse.ogg' type='audio/ogg' />
			<source src='horse.mp3' type='audio/mpeg' />
			<track src={props.track} kind='captions' />
			{props.children}
		</audio>
	);
});

Audio.displayName = 'Audio';

export default Audio;
