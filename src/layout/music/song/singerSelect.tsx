/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useMemo, useState } from 'react';
import { FROM } from '@/utils/variables';
import { EnumStatusArtist } from '@/utils/enums';
import { Helper } from '@/utils/helper';
import { useFormContext } from 'react-hook-form';
import { GenresOfArtist } from '@/services/music/artist/getDetails';
import ServiceArtistGetList, { ResponseGetListArtist } from '@/services/music/artist/getSinger';
import SingerItem from '@/components/ui/items/singer';
import SkeletonSingerItem from '@/components/ui/skeleton/item/singer';

type SingersSelectProps = {
	name: string;
	className?: string;
	defaultValue?: GenresOfArtist[];
};
function SingersSelect({ name = '', className = '', defaultValue = [] }: SingersSelectProps) {
	const form = useFormContext();

	const initialValue = useMemo(() => {
		return form?.getValues()?.[name] ?? defaultValue;
	}, [defaultValue, form, name]);

	const { onGetListArtist, response, isLoadingGetListArtistService } = ServiceArtistGetList();

	const [singerState, setSingerState] = useState<ResponseGetListArtist[]>(initialValue);
	const genres = useMemo(() => [...singerState], [singerState]);

	const handleSelect = (dataItem: ResponseGetListArtist) => {
		const { index, isExist } = Helper.findItem(singerState, '_id', dataItem._id);
		if (isExist) {
			genres.splice(index, 1);
		} else {
			genres.push(dataItem);
		}
		setSingerState(genres);
		form?.setValue(name, genres, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
	};

	useEffect(() => {
		onGetListArtist({
			from: FROM,
		});
	}, []);

	return (
		<div className='grid grid-cols-2 gap-6'>
			<SkeletonSingerItem isSkeleton={isLoadingGetListArtistService}>
				{response?.list?.map((singer) => {
					const { isExist } = Helper.findItem(singerState, '_id', singer._id);

					return (
						<SingerItem
							className={className}
							onClick={() => {
								handleSelect(singer);
							}}
							checkedDefault={isExist}
							hasInactive={singer.status === EnumStatusArtist.lock}
							key={singer._id}
							name={singer.singerName}
							src={singer.singerAvatar}
						/>
					);
				})}
			</SkeletonSingerItem>
		</div>
	);
}

export default SingersSelect;
