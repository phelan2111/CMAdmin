import SkeletonDetails from '@/components/ui/skeleton/details';
import Wrapper from '@/components/ui/wrapper/normal';
import Localize from '@/langs';
import { FucCreateGenreProps } from '@/pages/browse/genre/types';
import { DataUpload } from '@/components/root/upload/normal';
import ActionAccount from '@/layout/account/action';
import { ResponseGetSongDetails } from '@/services/music/song/getDetails';
import AvatarUploadRequestSong from '@/components/ui/upload/request/avatar/avatarSong';
import SetupSong from '@/layout/music/song/setUp';
import Item from '@/components/ui/items/normal';
import SingerItem from '@/components/ui/items/singer';
import StatusSong from '@/components/ui/status/song';
import UpdateStatusSong from '../update/status';

type ViewProps = {
	isLoading: boolean;
	songDetails: ResponseGetSongDetails;
	onUpdateArtist: (dataItem: FucCreateGenreProps) => void;
	onFreshRequest: VoidFunction;
	onUploadCover: (dateItem: DataUpload[]) => void;
	onUploadAvatar: (dateItem: DataUpload) => void;
};

function View(props: ViewProps) {
	return (
		<div className='pr-4 py-8'>
			<SkeletonDetails isSkeleton={props.isLoading}>
				<Wrapper key={props.songDetails.songId} className='flex flex-col !gap-6'>
					<div className='flex justify-between items-center animate-translateRight'>
						<div className='leading-10 flex flex-col gap-2'>
							<div className='flex items-end gap-4'>
								<h1 className='text-5xl font-semibold'>{Localize('DETAILS_ACCOUNT')}</h1>
								<StatusSong status={props.songDetails.status} />
							</div>
							<p>#{props.songDetails.songId}</p>
						</div>
						<ActionAccount
							status={props.songDetails.status}
							onActive={() => {
								props.onUpdateArtist({
									renderComponent: (
										<UpdateStatusSong
											onSuccess={props.onFreshRequest}
											content='UNLOCK_ARTIST_DESCRIPTION'
											title='UNLOCK_ARTIST'
											details={props.songDetails}
										/>
									),
								});
							}}
							onLock={() => {}}
						/>
					</div>
					<div className='animate-translateRight'>
						<div className='h-72'>
							<AvatarUploadRequestSong isDetails src={props.songDetails.image} name='image' />
						</div>
						<div className='flex flex-col gap-8 pt-32 animate-translateRight w-full'>
							<div className='flex gap-6 relative'>
								<div className='w-1/2 bg-white/10 rounded-xl p-8 flex flex-col gap-8'>
									<div className='flex flex-col gap-8 '>
										<p className='text-3xl font-semibold'>{Localize('INTRODUCE')}</p>
										<div className='flex flex-col gap-4'>
											<Item classLabel='min-w-36' label='SONG_NAME' content={props.songDetails.songName} />
											<Item classLabel='min-w-36' label='SONG_DESCRIPTION' content={props.songDetails.songDescription} />
										</div>
									</div>
									<p className='text-3xl font-semibold'>{Localize('ARTIST')}</p>
									<div className='grid grid-cols-2 gap-6'>
										{props.songDetails.singer.map((i) => (
											<SingerItem key={i.singerId} name={i.singerName} disabled hasInactive={false} src={i.singerAvatar} />
										))}
									</div>
								</div>
								<div className='flex flex-col gap-6 w-1/2 sticky top-0 h-fit'>
									<div className='flex flex-col gap-8 bg-white/10 p-8 rounded-xl'>
										<p className='text-3xl font-semibold'>{Localize('SET_UP')}</p>
										<SetupSong src={props.songDetails.link} isDetails name='setup' />
									</div>
								</div>
							</div>
						</div>
					</div>
				</Wrapper>
			</SkeletonDetails>
		</div>
	);
}

export default View;
