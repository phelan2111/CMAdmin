/* eslint-disable react-hooks/exhaustive-deps */
import ServiceGetListGenreOfBrowse, { ResponseGetGenreOfBrowse } from '@/services/browse/genre/getList';

import GenreItem from '@/components/ui/items/genre';
import { useEffect, useMemo, useState } from 'react';
import SkeletonGenreItem from '@/components/ui/skeleton/item/genre';
import { FROM } from '@/utils/variables';
import { EnumStatusBrowse } from '@/utils/enums';
import { Helper } from '@/utils/helper';
import { useFormContext } from 'react-hook-form';
import { GenresOfArtist } from '@/services/music/artist/getDetails';

type GenresSelectProps = {
	name: string;
	className?: string;
	defaultValue?: GenresOfArtist[];
};
function GenresSelect({ name = '', className = '', defaultValue = [] }: GenresSelectProps) {
	const form = useFormContext();

	const initialValue = useMemo(() => {
		return form?.getValues()?.[name] ?? defaultValue;
	}, [defaultValue, form, name]);

	const { onGetListGenreOfBrowse, response, isLoadingGetListGenreOfBrowseService } = ServiceGetListGenreOfBrowse();

	const [genresState, setGenresState] = useState<ResponseGetGenreOfBrowse[]>(initialValue);
	const genres = useMemo(() => [...genresState], [genresState]);

	const handleSelect = (dataItem: ResponseGetGenreOfBrowse) => {
		const { index, isExist } = Helper.findItem(genresState, '_id', dataItem._id);
		if (isExist) {
			genres.splice(index, 1);
		} else {
			genres.push(dataItem);
		}
		setGenresState(genres);
		form?.setValue(name, genres, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
	};

	useEffect(() => {
		onGetListGenreOfBrowse({
			from: FROM,
			status: EnumStatusBrowse.display,
		});
	}, []);


	return (
		<div className='grid grid-cols-6 gap-6'>
			<SkeletonGenreItem isSkeleton={isLoadingGetListGenreOfBrowseService}>
				{response?.list?.map((genre) => {
					const { isExist } = Helper.findItem(genresState, '_id', genre._id);

					return (
						<GenreItem
							className={className}
							onClick={() => {
								handleSelect(genre);
							}}
							checkedDefault={isExist}
							hasInactive={genre.status === EnumStatusBrowse.hidden}
							key={genre._id}
							name={genre.nameGenre}
							src={genre.imageGenre}
						/>
					);
				})}
			</SkeletonGenreItem>
		</div>
	);
}

export default GenresSelect;
