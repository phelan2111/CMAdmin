import SkeletonDetails from '@/components/ui/skeleton/details';
import Wrapper from '@/components/ui/wrapper/normal';
import Localize from '@/langs';
import { FucCreateGenreProps } from '@/pages/browse/genre/types';
import { ResponseGetUserDetails } from '@/services/user/getDetails';
import StatusAccount from '@/components/ui/status/account';
import { parseEnumRole, parseGender } from '@/utils/prase';
import Item from '@/components/ui/items/normal';
import dayjs from 'dayjs';
import Empty from '@/components/ui/empty/normal';
import EmptyComponent from '@/components/ui/common/empty';
import PlaylistItem from '@/components/ui/items/playlist';
import ActionStatus from '@/layout/account/action';
import UpdateButton from '@/components/ui/button/update';
import { Helper } from '@/utils/helper';
import { Gender } from '@/utils/enums';
import UpdateInformation from '../update/information';
import UploadCoverAccount from '@/components/ui/upload/normal/cover';
import { DataUpload } from '@/components/root/upload/normal';
import AvatarUploadAccount from '@/components/ui/upload/normal/avatar';
import UpdateStatus from '../update/status';

type ViewProps = {
	isLoading: boolean;
	userDetails: ResponseGetUserDetails;
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
								<StatusAccount status={props.userDetails.status} />
							</div>
							<p>#{props.userDetails.userId}</p>
						</div>
						<ActionStatus
							onActive={() => {
								props.onUpdateUser({
									renderComponent: (
										<UpdateStatus
											onSuccess={props.onFreshRequest}
											content='UNLOCK_ACCOUNT_DESCRIPTION'
											title='UNLOCK_ACCOUNT'
											details={props.userDetails}
										/>
									),
								});
							}}
							onLock={() => {
								props.onUpdateUser({
									renderComponent: (
										<UpdateStatus
											onSuccess={props.onFreshRequest}
											content='LOCK_ACCOUNT_DESCRIPTION'
											title='LOCK_ACCOUNT'
											details={props.userDetails}
										/>
									),
								});
							}}
							status={props.userDetails.status}
						/>
					</div>
					<div className='animate-translateRight'>
						<div className='h-72'>
							<UploadCoverAccount src={props.userDetails.cover} onChange={props.onUploadCover} />
							<AvatarUploadAccount src={props.userDetails.avatar} onChange={props.onUploadAvatar} />
						</div>
					</div>
					<div className='flex gap-8 pt-28 animate-translateRight'>
						<div className='w-1/3 bg-white/10 p-4 rounded-xl flex flex-col gap-6 h-fit sticky top-0'>
							<div className='flex justify-between items-center'>
								<p className='text-2xl font-semibold'>{Localize('INTRODUCE')}</p>
								<UpdateButton
									onClick={() => {
										props.onUpdateUser({
											renderComponent: (
												<UpdateInformation
													onSuccess={props.onFreshRequest}
													content='UPDATE_ACCOUNT_DESCRIPTION'
													title='UPDATE_INTRODUCE_ACCOUNT'
													details={props.userDetails}
												/>
											),
										});
									}}
								/>
							</div>
							<div className='flex flex-col gap-3'>
								<Item classLabel='min-w-36' label='FIRST_NAME' content={props.userDetails.firstName} />
								<Item classLabel='min-w-36' label='LAST_NAME' content={props.userDetails.lastName} />
								<Item
									classLabel='min-w-36'
									label='GENDER'
									content={Helper.isEmpty(props.userDetails.gender) ? '' : parseGender[props.userDetails.gender as Gender]}
								/>
								<Item classLabel='min-w-36' label='ROLE' content={parseEnumRole[props.userDetails.role]} />
								<Item classLabel='min-w-36' label='EMAIL' content={props.userDetails.email} />
								<Item classLabel='min-w-36' label='CREATE_AT' content={dayjs(props.userDetails.createdAt).format('DD-MM-YYYY HH:mm')} />
								<Item classLabel='min-w-36' label='UPDATE_AT' content={dayjs(props.userDetails.updatedAt).format('DD-MM-YYYY HH:mm')} />
								<Item classLabel='min-w-36' label='ADDRESS' content={props.userDetails.address} />
							</div>
						</div>
						<div className='w-2/3 p-4 rounded-xl flex flex-col gap-6 h-fit'>
							<p className='text-2xl font-semibold'>{Localize('PLAYLIST')}</p>
							<Empty
								isEmpty={true}
								componentEmpty={() => {
									return (
										<div className='w-full flex flex-col gap-4 items-center justify-center'>
											<EmptyComponent />
											<p className='text-sm'>{Localize('EMPTY_PLAYLIST')}...</p>
										</div>
									);
								}}>
								<div className='grid grid-cols-6 gap-4'>
									<PlaylistItem />
									<PlaylistItem />
									<PlaylistItem />
									<PlaylistItem />
									<PlaylistItem />
									<PlaylistItem />
									<PlaylistItem />
								</div>
							</Empty>
						</div>
					</div>
				</Wrapper>
			</SkeletonDetails>
		</div>
	);
}

export default View;
