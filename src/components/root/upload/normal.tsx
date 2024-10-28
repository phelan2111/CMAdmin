import Localize from '@/langs';
import { Helper } from '@/utils/helper';
import { ChangeEvent, ReactNode, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export type DataUpload = {
	file?: File;
	uploadId: string;
	src: string;
};
export type RenderUploadProps = {
	onDelete: (dataItem: DataUpload) => void;
	data: DataUpload[];
	messageError?: string;
};
export type ValueUpload = {
	values: DataUpload[];
};
type UploadProps = {
	defaultValue?: DataUpload[];
	onChange?: (dataItem: ValueUpload) => void;
	name?: string;
	renderUpload?: (renderProps: RenderUploadProps) => ReactNode;
	renderDefault?: (renderProps: RenderUploadProps) => ReactNode;
	multiple?: boolean;
	length?: number;
	label?: string;
	required?: boolean;
};

function Upload({ defaultValue = [], multiple = false, length = 1, name = '', required = false, ...props }: UploadProps) {
	const form = useFormContext();

	const messageError: string = useMemo(() => {
		return form?.formState.errors?.[name]?.message?.toString() ?? '';
	}, [form?.formState.errors, name]);

	const [uploadData, setUploadData] = useState<DataUpload[]>(form?.getValues()?.name ?? defaultValue);

	const handleOnChange = (dataItem: ChangeEvent<HTMLInputElement>) => {
		const fileList = dataItem.currentTarget.files;

		if (fileList) {
			const valueCurrent = uploadData;
			const files = Object.values(fileList);
			const dataUploadConvert: DataUpload[] = files.map((file) => ({
				src: URL.createObjectURL(file),
				uploadId: Helper.randomKey(),
				file,
			}));
			const cellUploadData: DataUpload[] = [...valueCurrent, ...dataUploadConvert];
			const takeUploadData: DataUpload[] = cellUploadData.splice(0, length);

			setUploadData(takeUploadData);
			props.onChange?.({ values: takeUploadData });
			form.setValue(name, takeUploadData, {
				shouldValidate: true,
				shouldDirty: true,
				shouldTouch: true,
			});
		}
	};
	const handleDeleteFile = (dataItem: DataUpload) => {
		const { index, isExist } = Helper.findItem(uploadData, 'uploadId', dataItem.uploadId);
		const valueCurrent = [...uploadData];
		if (isExist) {
			URL.revokeObjectURL(valueCurrent[index].src);
			valueCurrent.splice(index, 1);
		}
		form.setValue(name, valueCurrent, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
		setUploadData(valueCurrent);
	};

	return (
		<div className='flex flex-col gap-1'>
			{props.label && (
				<p className='text-base'>
					{Localize(props.label)} {required && <span className='text-red-500'>(*)</span>}
				</p>
			)}
			<div className='flex items-center gap-2 w-full'>
				{uploadData.length < length && (
					<div className='w-full relative animate-translateRight'>
						{props.renderDefault?.({
							onDelete: handleDeleteFile,
							data: uploadData,
							messageError,
						})}
						<input
							className='absolute w-full h-full top-0 left-0 bg-transparent opacity-0'
							onChange={handleOnChange}
							type='file'
							multiple={multiple}
						/>
					</div>
				)}
				{uploadData.length > 0 && (
					<div className='w-full animate-translateRight'>
						{props.renderUpload?.({
							onDelete: handleDeleteFile,
							data: uploadData,
							messageError,
						})}
					</div>
				)}
			</div>
		</div>
	);
}

export default Upload;
