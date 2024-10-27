type ImageProps = {
	src: string;
	errorImage?: string;
	className?: string;
	alt?: string;
};

function Image({ className = 'size-[180px]', alt = 'image', ...props }: ImageProps) {
	return <img className={`${className} rounded-xl`} src={props.src} alt={alt} />;
}

export default Image;
