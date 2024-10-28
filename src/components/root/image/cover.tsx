type CoverImageProps = {
	src: string;
	errorImage?: string;
	className?: string;
	alt?: string;
};

function CoverImage({ className = 'w-full h-72', ...props }: CoverImageProps) {
	return (
		<div
			style={{
				backgroundImage: `url(${props.src})`,
			}}
			className={`${className} bg-no-repeat bg-cover bg-center rounded-lg`}
		/>
	);
}

export default CoverImage;
