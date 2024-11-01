import SkeletonDetails from '@/components/ui/skeleton/details';
import Wrapper from '@/components/ui/wrapper/normal';
import Localize from '@/langs';
import { FucCreateGenreProps } from '@/pages/browse/genre/types';
import { DataUpload } from '@/components/root/upload/normal';
import AvatarUploadAccount from '@/components/ui/upload/normal/avatar';
import { ResponseGetArtistDetails } from '@/services/artist/getDetails';
import UploadCarouselCoverAccount from '@/components/ui/upload/normal/carouselCover';
import StatusArtist from '@/components/ui/status/artist';
import ActionAccount from '@/layout/account/action';

type ViewProps = {
	isLoading: boolean;
	artistDetails: ResponseGetArtistDetails;
	onUpdateUser: (dataItem: FucCreateGenreProps) => void;
	onFreshRequest: VoidFunction;
	onUploadCover: (dateItem: DataUpload) => void;
	onUploadAvatar: (dateItem: DataUpload) => void;
};

function View(props: ViewProps) {
	return (
		<div className='pr-4 py-8'>
			<SkeletonDetails isSkeleton={props.isLoading}>
				<Wrapper className='flex flex-col !gap-6'>
					<div className='flex justify-between items-center animate-translateRight'>
						<div className='leading-10 flex flex-col gap-2'>
							<div className='flex items-end gap-4'>
								<h1 className='text-5xl font-semibold'>{Localize('DETAILS_ACCOUNT')}</h1>
								<StatusArtist status={props.artistDetails.status} />
							</div>
							<p>#{props.artistDetails.artistId}</p>
						</div>
						<ActionAccount status={props.artistDetails.status} onActive={() => {}} onLock={() => {}} />
					</div>
					<div className='animate-translateRight'>
						<div className='h-72'>
							<UploadCarouselCoverAccount onChange={() => {}} />
							<AvatarUploadAccount src={props.artistDetails.singerAvatar} onChange={props.onUploadAvatar} />
						</div>
						<div className='bg-white/10 mt-32'>qweqwe</div>
					</div>
				</Wrapper>
			</SkeletonDetails>
		</div>
	);
}

export default View;
