import SkeletonDetails from '@/components/ui/skeleton/details';
import Wrapper from '@/components/ui/wrapper/normal';
import Localize from '@/langs';
import { FucCreateGenreProps } from '@/pages/browse/genre/types';
import { DataUpload } from '@/components/root/upload/normal';
import { ResponseGetArtistDetails } from '@/services/artist/getDetails';
import StatusArtist from '@/components/ui/status/artist';
import ActionAccount from '@/layout/account/action';
import UpdateButton from '@/components/ui/button/update';
import Item from '@/components/ui/items/normal';
import Empty from '@/components/ui/empty/normal';
import EmptyComponent from '@/components/ui/common/empty';
import dayjs from 'dayjs';
import HoverCard from '@/components/root/animation/hoverCard';
import Image from '@/components/root/image/normal';
import { Helper } from '@/utils/helper';
import UploadCarouselCoverArtistRequest from '@/components/ui/upload/request/cover/carouselCover';
import AvatarUploadRequestSinger from '@/components/ui/upload/request/avatar/avatarSinger';
import UpdateInformation from '../update/information';
import UpdateInformationSocials from '../update/socials';
import UpdateGenresOfArtist from '../update/genres';

type ViewProps = {
	isLoading: boolean;
	artistDetails: ResponseGetArtistDetails;
	onUpdateArtist: (dataItem: FucCreateGenreProps) => void;
	onFreshRequest: VoidFunction;
	onUploadCover: (dateItem: DataUpload[]) => void;
	onUploadAvatar: (dateItem: DataUpload) => void;
};

function View(props: ViewProps) {
	return (
		<div className='pr-4 py-8'>
			<SkeletonDetails isSkeleton={props.isLoading}>
				<Wrapper key={props.artistDetails.singerId} className='flex flex-col !gap-6'>
					<div className='flex justify-between items-center animate-translateRight'>
						<div className='leading-10 flex flex-col gap-2'>
							<div className='flex items-end gap-4'>
								<h1 className='text-5xl font-semibold'>{Localize('DETAILS_ACCOUNT')}</h1>
								<StatusArtist status={props.artistDetails.status} />
							</div>
							<p>#{props.artistDetails.singerId}</p>
						</div>
						<ActionAccount status={props.artistDetails.status} onActive={() => {}} onLock={() => {}} />
					</div>
					<div className='animate-translateRight'>
						<div className='h-72'>
							<UploadCarouselCoverArtistRequest src={props.artistDetails.singerCover} isDetails onChange={props.onUploadCover} />
							<AvatarUploadRequestSinger isDetails src={props.artistDetails.singerAvatar} onChange={props.onUploadAvatar} />
						</div>
						<div className='flex gap-8 pt-32 animate-translateRight h-full'>
							<div className='w-1/3 flex flex-col gap-6'>
								<div className='w-full bg-white/10 p-4 rounded-xl flex flex-col gap-6 h-fit sticky top-0'>
									<div className='flex justify-between items-center'>
										<p className='text-2xl font-semibold'>{Localize('INTRODUCE')}</p>
										<UpdateButton
											onClick={() => {
												props.onUpdateArtist({
													renderComponent: (
														<UpdateInformation
															onSuccess={props.onFreshRequest}
															content='UNLOCK_ACCOUNT_DESCRIPTION'
															title='UNLOCK_ACCOUNT'
															details={props.artistDetails}
														/>
													),
												});
											}}
										/>
									</div>
									<div className='flex flex-col gap-3'>
										<Item classLabel='min-w-36' label='ARTIST_NAME' content={props.artistDetails.singerName} />
										<Item classLabel='min-w-36' label='ARTIST_DESCRIPTION' content={props.artistDetails.singerDescription} />
										<Item classLabel='min-w-36' label='FOLLOWERS' content={`${props.artistDetails.followers}`} />
										<Item
											classLabel='min-w-36'
											label='CREATE_AT'
											content={dayjs(props.artistDetails.createdAt).format('DD-MM-YYYY HH:mm')}
										/>
										<Item
											classLabel='min-w-36'
											label='UPDATE_AT'
											content={dayjs(props.artistDetails.updatedAt).format('DD-MM-YYYY HH:mm')}
										/>
									</div>
								</div>
								<div className='w-full bg-white/10 p-4 rounded-xl flex flex-col gap-6 h-fit sticky top-0'>
									<div className='flex justify-between items-center'>
										<p className='text-2xl font-semibold'>{Localize('SOCIAL')}</p>
										<UpdateButton
											onClick={() => {
												props.onUpdateArtist({
													renderComponent: (
														<UpdateInformationSocials
															onSuccess={props.onFreshRequest}
															content='UNLOCK_ACCOUNT_DESCRIPTION'
															title='UNLOCK_ACCOUNT'
															details={props.artistDetails}
														/>
													),
												});
											}}
										/>
									</div>
									<div className='flex flex-col gap-3'>
										<Item
											renderContent={() => {
												const hasEmpty = Helper.isEmpty(props.artistDetails.socials?.facebook);
												if (hasEmpty) {
													return <p>-</p>;
												}
												return (
													<a
														className='font-medium underline'
														target='_blank'
														href={`${props.artistDetails.socials?.facebook}`}
														rel='noreferrer'>
														{props.artistDetails.socials?.facebook}
													</a>
												);
											}}
											classLabel='min-w-36'
											label='FACEBOOK'
										/>
										<Item
											renderContent={() => {
												const hasEmpty = Helper.isEmpty(props.artistDetails.socials?.instagram);
												if (hasEmpty) {
													return <p>-</p>;
												}
												return (
													<a
														className='font-medium underline'
														target='_blank'
														href={`${props.artistDetails.socials?.instagram}`}
														rel='noreferrer'>
														{props.artistDetails.socials?.instagram}
													</a>
												);
											}}
											classLabel='min-w-36'
											label='INSTAGRAM'
										/>
									</div>
								</div>
							</div>
							<div className='w-2/3 p-4 rounded-xl flex flex-col gap-6 h-full bg-white/10'>
								<div className='flex justify-between items-center'>
									<p className='text-2xl font-semibold'>{Localize('GENRE')}</p>
									<UpdateButton
										onClick={() => {
											props.onUpdateArtist({
												renderComponent: (
													<UpdateGenresOfArtist
														onSuccess={props.onFreshRequest}
														content='UNLOCK_ACCOUNT_DESCRIPTION'
														title='UNLOCK_ACCOUNT'
														details={props.artistDetails}
													/>
												),
											});
										}}
									/>
								</div>
								<Empty
									isEmpty={props.artistDetails.genres.length === 0}
									componentEmpty={() => {
										return (
											<div className='w-full flex flex-col gap-4 items-center justify-center'>
												<EmptyComponent />
												<p className='text-sm'>{Localize('EMPTY_GENRE')}...</p>
											</div>
										);
									}}>
									<div className='grid grid-cols-6 gap-4'>
										{props.artistDetails.genres.map((genre) => (
											<HoverCard
												key={genre.genreId}
												onClick={() => {}}
												className={`w-fit rounded-xl transition-all duration-300 overflow-hidden cursor-pointer `}>
												<div className='flex flex-col gap-2 bg-white/10 w-full p-2'>
													<Image className='w-32 h-28 object-cover' src={genre.imageGenre} />
													<div className='text-sm text-inherit'>
														<p className='font-semibold'>{genre.nameGenre}</p>
													</div>
												</div>
											</HoverCard>
										))}
									</div>
								</Empty>
							</div>
						</div>
					</div>
				</Wrapper>
			</SkeletonDetails>
		</div>
	);
}

export default View;
