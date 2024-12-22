/* eslint-disable react-hooks/exhaustive-deps */
import TextField from '@/components/root/inputs/textField';
import { useDebounce } from '@/hooks/useDebounce';
import Localize from '@/langs';
import { Helper } from '@/utils/helper';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

type SearchToolProps = {
	onChange?: (valueInput: string) => void;
	placeholder?: string;
	label?: string;
	className?: string;
};

function SearchTool({ label = 'SEARCH', placeholder = '', className = '!rounded-3xl pl-3 pr-6 w-72', ...props }: SearchToolProps) {
	const [searchValue, setSearchValue] = useState('');

	const value = useDebounce(searchValue, 850);

	const handleOnChange = (dataItem: string) => {
		setSearchValue(dataItem);
	};
	const handleReset = () => {
		setSearchValue('');
	};

	useEffect(() => {
		props.onChange?.(value);
		return () => {};
	}, [value]);

	return (
		<div className='flex items-center gap-2'>
			{!Helper.isEmpty(label) && <p>{Localize(label)}</p>}
			<div className='relative w-full'>
				<TextField placeholder={placeholder} value={searchValue} onChange={handleOnChange} className={className} />
				<div
					aria-hidden
					onClick={handleReset}
					className={`absolute right-3 top-3 w-5 h-5 bg-primary_dark/50 cursor-pointer hover:bg-primary_dark/70 rounded-full transition-all duration-500 flex items-center justify-center ${
						Helper.isEmpty(searchValue) ? 'opacity-0' : 'opacity-100'
					}`}>
					<IoMdClose />
				</div>
			</div>
		</div>
	);
}

export default SearchTool;
