import CoverImage from '@/components/root/image/cover';
import { DataUpload } from '@/components/root/upload/normal';
import UpdateButton from '@/components/ui/button/update';
import Localize from '@/langs';
import { Helper } from '@/utils/helper';
import { ChangeEvent, Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { MdOutlineFileUpload, MdOutlineSaveAlt } from 'react-icons/md';
import { UploadCarouselProps } from '../../../../layout/account/upload/types';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Avatar from '@/components/root/image/avatar';
import CloseButton from '../../button/close';

function UploadCarouselCover({
	src = ['https://res.cloudinary.com/dkvhfe4uu/image/upload/v1748598392/singer/image/avatar/pexels-steve-30889893_haorin.jpg'],
	...props
}: UploadCarouselProps) {
	const [uploadData, setUploadData] = useState<DataUpload[]>(src.map((i) => ({ src: i, uploadId: Helper.randomKey() })));
	const [indexCarousel, setIndexCarousel] = useState<number>(0);
	const uploads = useMemo(() => [...uploadData], [uploadData]);
	const ref = useRef<HTMLDivElement>(null);
	const refItem = useRef<HTMLDivElement>(null);

	const handleOnChange = (dataItem: ChangeEvent<HTMLInputElement>) => {
		const fileList = dataItem.currentTarget.files;

		if (fileList) {
			const files = Object.values(fileList);
			const dataUploadConvert: DataUpload[] = files.map((file) => ({
				src: URL.createObjectURL(file),
				uploadId: Helper.randomKey(),
				file,
			}));
			setUploadData(dataUploadConvert);
			props.onChange?.(dataUploadConvert);
		}
	};
	const handleNext = () => {
		setIndexCarousel((prev) => prev + 1);
	};
	const handlePrev = () => {
		setIndexCarousel((prev) => prev - 1);
	};
	const handleDelete = (dataItem: DataUpload) => {
		const { index, isExist } = Helper.findItem(uploadData, 'uploadId', dataItem.uploadId);
		if (isExist) {
			uploads.splice(index, 1);
		}
		props.onChange?.(uploads);
		setUploadData(uploads);
	};

	useEffect(() => {
		if (!Helper.isEmpty(src)) {
			setUploadData(uploadData);
		}
	}, [src, uploadData]);
	useEffect(() => {
		const element = ref.current;
		const elementItem = refItem.current;

		if (element && elementItem) {
			const widthItem = elementItem.offsetWidth;
			element.scrollTo({
				left: widthItem * indexCarousel,
				top: 0,
				behavior: 'smooth',
			});
		}
	}, [indexCarousel]);

	return (
		<div className='relative w-full'>
			<div ref={ref} className='border-2 border-white rounded-lg w-full h-72 flex flex-nowrap overflow-hidden overflow-x-auto scrollHiddenX'>
				{uploadData.map((i) => {
					return (
						<div key={i.uploadId} className='min-w-full w-full' ref={refItem}>
							<CoverImage className='min-w-full h-72' src={i.src} />
						</div>
					);
				})}
			</div>
			{uploadData.length > 1 && (
				<Fragment>
					<div
						aria-hidden
						style={{
							opacity: indexCarousel === 0 ? 0.5 : 100,
							pointerEvents: indexCarousel === 0 ? 'none' : 'auto',
						}}
						onClick={handlePrev}
						className='absolute top-32 transition-all duration-500 right-28 bg-primary_dark/80 hover:bg-primary_dark w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 cursor-pointer'>
						<FaAngleLeft />
					</div>
					<div
						aria-hidden
						onClick={handleNext}
						style={{
							opacity: indexCarousel === uploadData.length - 1 ? 0.5 : 100,
							pointerEvents: indexCarousel === uploadData.length - 1 ? 'none' : 'auto',
						}}
						className='absolute top-32 transition-all duration-500 right-8 bg-primary_dark/80 hover:bg-primary_dark w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 cursor-pointer'>
						<FaAngleRight />
					</div>
				</Fragment>
			)}

			<div className='absolute top-0 left-0 flex w-fit rounded-ss-lg rounded-ee-lg gap-2 bg-white p-4'>
				{uploadData.map((i) => {
					return (
						<div key={i.uploadId} className='w-fit relative'>
							{uploadData.length > 1 && (
								<div className='absolute top-1 right-1'>
									<CloseButton
										onClick={() => {
											handleDelete(i);
										}}
									/>
								</div>
							)}

							<Avatar className='size-16 rounded-lg' src={i.src} />
						</div>
					);
				})}
			</div>

			<div className='absolute top-8 right-8 z-10 flex w-fit gap-2'>
				<UpdateButton
					disabled={Helper.isEmpty(uploadData.filter((i) => i.file))}
					className='font-semibold text-base !w-32 buttonFollow'
					icon={<MdOutlineSaveAlt className='text-2xl' />}
					text='SAVE'
					onClick={() => {
						props.onChange?.(uploadData);
					}}
				/>
				<label className='buttonFollow group !rounded-full' htmlFor='cover'>
					<p className='bg-primary_dark text-primary_light flex items-center w-32 group-hover:bg-primary_dark/10 transition-all duration-500 gap-2 px-4 py-3 rounded-full text-base font-semibold'>
						<MdOutlineFileUpload className='text-2xl' />
						{Localize('UPLOAD')}
					</p>
					<input multiple onChange={handleOnChange} className='hidden' name='cover' id='cover' type='file' />
				</label>
			</div>
		</div>
	);
}

export default UploadCarouselCover;
