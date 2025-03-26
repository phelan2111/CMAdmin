import SkeletonDetails from '@/components/ui/skeleton/details';
import Wrapper from '@/components/ui/wrapper/normal';
import { FucCreateGenreProps } from '@/pages/browse/genre/types';
import { DataUpload } from '@/components/root/upload/normal';
import Localize from '@/langs';
import { ResponsePlaylistDetails } from '@/services/music/playlist/details';
import StatusPlaylist from '@/components/ui/status/playlist';
import UploadRequest from '@/components/ui/upload/request/normal/playlist';
import EmptySongOfPlaylist from '@/components/ui/empty/songOfPlaylist';
import ItemSongOfPlaylist from '@/components/ui/items/songOfPlaylist';
type ViewProps = {
	isLoading: boolean;
	playlistDetails: ResponsePlaylistDetails;
	onUpdateArtist: (dataItem: FucCreateGenreProps) => void;
	onFreshRequest: VoidFunction;
	onUploadCover: (dateItem: DataUpload[]) => void;
	onUploadAvatar: (dateItem: DataUpload) => void;
};

function View(props: ViewProps) {
	return (
		<div className='pr-4 py-8'>
			<SkeletonDetails isSkeleton={props.isLoading}>
				<Wrapper key={props.playlistDetails.playlistId} className='flex flex-col !gap-6'>
					<div className='flex justify-between items-center animate-translateRight'>
						<div className='leading-10 flex flex-col gap-2'>
							<div className='flex items-end gap-4'>
								<h1 className='text-5xl font-semibold'>{Localize('ARTIST_DETAILS')}</h1>
								<StatusPlaylist status={props.playlistDetails.status} />
							</div>
							<p>#{props.playlistDetails.playlistId}</p>
						</div>
					</div>
					<div className='flex flex-col h-full animate-translateRight  bg-gradient-to-b from-[#232323] rounded-xl'>
						<div
							style={{
								background: `linear-gradient(${props.playlistDetails.theme}30, transparent)`,
							}}
							className={`p-6 w-full rounded-ss-xl flex gap-6 items-start relative`}>
							<UploadRequest src={props.playlistDetails.image} name='image' className='rounded-lg min-w-60 size-60' />
							<div className='text-sm flex flex-col gap-1 justify-between h-full'>
								<p>{Localize('PLAYLIST')}</p>
								<p className='text-8xl font-bold py-4'>{props?.playlistDetails?.namePlaylist}</p>
								<div className='flex flex-col gap-1'>
									<p className='line-clamp-2'>{props?.playlistDetails?.descriptionPlaylist}</p>
									<div className='flex items-center gap-1'>
										<p className='font-bold'>Cohesive</p>
										<p>
											{' '}
											• <span className='font-bold'>{props.playlistDetails.viewSaves}</span> {Localize('SAVES')} •{' '}
											<span className='font-bold'>{props.playlistDetails.songs.length}</span> {Localize('SONGS')}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className='w-full px-6 flex flex-col gap-6  rounded-es-xl'>
							<p className='text-2xl font-medium'>{Localize('SONGS_OF_PLAYLIST')}</p>
							<EmptySongOfPlaylist totalColumn={props.playlistDetails.songs.length}>
								<div className='h-[270px] overflow-y-scroll scrollHiddenY snap-mandatory snap-y'>
									{props.playlistDetails.songs.map((song) => {
										return (
											<ItemSongOfPlaylist
												viewSaved={song.views}
												artist={song.singers}
												name={song.songName}
												key={song.songId}
												img={song.image}
											/>
										);
									})}
								</div>
							</EmptySongOfPlaylist>
						</div>
					</div>
				</Wrapper>
			</SkeletonDetails>
		</div>
	);
}

export default View;
