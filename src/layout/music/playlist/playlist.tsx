/* eslint-disable react-hooks/exhaustive-deps */
import SearchTool from '@/components/ui/common/tool/search/normal';
import EmptySong from '@/components/ui/empty/songEmpty';
import EmptySongOfPlaylist from '@/components/ui/empty/songOfPlaylist';
import ItemSongOfPlaylist from '@/components/ui/items/songOfPlaylist';
import Localize from '@/langs';
import ItemSongSelect from './items/songSelect';
import ServiceSongGetList, { ResponseGetListSong } from '@/services/music/song/getSong';
import { PayloadRequestList } from '@/services/types';
import { useEffect, useState } from 'react';
import { FROM, LIMIT, SORT } from '@/utils/variables';
import { EnumStatusSong } from '@/utils/enums';
import { Helper } from '@/utils/helper';

const Playlist = () => {
	const { onGetListSong, response } = ServiceSongGetList();
	const [songList, setSongList] = useState<ResponseGetListSong[]>([]);

	const [payload, setPayload] = useState<PayloadRequestList>({
		from: FROM,
		limit: LIMIT,
		createdAt: SORT.DESC,
		status: EnumStatusSong.display,
	});

	const handleSearch = (dataItem: string) => {
		const pl = { ...payload };
		if (Helper.isEmpty(dataItem)) {
			pl.search = '';
		} else {
			pl.search = dataItem;
		}

		setPayload(Helper.cleanObject(pl) as PayloadRequestList);
	};
	const handleSelectedSong = (dataItem: ResponseGetListSong) => {
		const dataSongs = [...songList];
		const { index, isExist } = Helper.findItem(songList as never, 'songId', dataItem.songId);
		if (isExist) {
			dataSongs.splice(index, 1);
		} else {
			dataSongs.push(dataItem);
		}
		setSongList(dataSongs);
	};

	useEffect(() => {
		onGetListSong(payload);
	}, [payload]);

	return (
		<div className='flex h-full'>
			<div className='w-2/3 p-6 flex flex-col gap-6 bg-white/10 rounded-es-xl'>
				<p className='text-2xl font-medium'>{Localize('SONGS_OF_PLAYLIST')}</p>
				<EmptySongOfPlaylist totalColumn={songList.length}>
					<div className='h-[270px] overflow-y-scroll scrollHiddenY snap-mandatory snap-y'>
						{songList.map((song) => {
							return <ItemSongOfPlaylist artist={song.singers} name={song.songName} key={song.songId} img={song.image} />;
						})}
					</div>
				</EmptySongOfPlaylist>
			</div>
			<div className='w-1/3 bg-primary_dark-10 p-6 flex flex-col gap-6 rounded-ee-xl select-none'>
				<p className='text-2xl font-medium'>{Localize('LIST_SONG')}</p>
				<div className='flex flex-col gap-4'>
					<SearchTool onChange={handleSearch} className='w-full' label='' placeholder='Search name or songId' />
					<div className='h-[200px] overflow-y-scroll scrollHiddenY snap-mandatory snap-y'>
						<EmptySong totalColumn={response?.total}>
							{response?.list?.map((song) => {
								return <ItemSongSelect onChange={handleSelectedSong} song={song} key={song.songId} />;
							})}
						</EmptySong>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Playlist;