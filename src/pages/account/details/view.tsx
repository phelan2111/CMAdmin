import SkeletonDetails from '@/components/ui/skeleton/details';
import Wrapper from '@/components/ui/wrapper/normal';
import Localize from '@/langs';
import { FucCreateGenreProps } from '@/pages/browse/genre/types';
import { ResponseGetUserDetails } from '@/services/user/getDetails';
import StatusAccount from '@/components/ui/status/account';
import CoverImage from '@/components/root/image/cover';
import Avatar from '@/components/root/image/avatar';
import { MdAlternateEmail } from 'react-icons/md';
import { parseEnumRole, parseGender } from '@/utils/prase';
import Item from '@/components/ui/items/normal';
import dayjs from 'dayjs';
import Empty from '@/components/ui/empty/normal';
import EmptyComponent from '@/components/ui/common/empty';
import PlaylistItem from '@/components/ui/items/playlist';
import ActionAccount from '@/layout/account/action';
import UpdateButton from '@/components/ui/button/update';
import { Helper } from '@/utils/helper';
import { Gender } from '@/utils/enums';

type ViewProps = {
	isLoading: boolean;
	userDetails: ResponseGetUserDetails;
	onUpdateTopic: (dataItem: FucCreateGenreProps) => void;
	onFreshRequest: VoidFunction;
};

function View(props: ViewProps) {
	return (
		<div className='pr-4 py-8'>
			<SkeletonDetails isSkeleton={props.isLoading}>
				<Wrapper className='flex flex-col !gap-6'>
					<div className='flex justify-between items-center animate-translateRight'>
						<div className='leading-10 flex flex-col gap-2'>
							<div className='flex items-end gap-4'>
								<h1 className='text-5xl font-semibold'>{Localize('GENRE_DETAILS')}</h1>
								<StatusAccount status={props.userDetails.status} />
							</div>
							<p>#{props.userDetails.userId}</p>
						</div>
						<div className='flex items-center gap-4'>
							<ActionAccount onActive={() => {}} onLock={() => {}} status={props.userDetails.status} />
							<UpdateButton onClick={() => {}} />
						</div>
					</div>
					<div className='animate-translateRight'>
						<div className='h-72'>
							<CoverImage
								className='border-2 border-white w-full h-72'
								src='https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
							/>
							<div className='-translate-y-1/2 px-16 flex items-end'>
								<Avatar
									className='size-52 border-4 border-white'
									src='https://res.cloudinary.com/dkvhfe4uu/image/upload/v1730121609/pexels-pixabay-164727_a3vbpu.jpg'
								/>
								<div className='pb-4 pl-8 flex flex-col gap-2'>
									<div className='flex items-end gap-1 text-4xl font-bold'>
										<p>{props.userDetails.firstName}</p>
										<p>{props.userDetails.lastName}</p>
									</div>
									<div className='flex gap-1 text-sm'>
										<p className='flex gap-1 items-center'>
											<MdAlternateEmail />
										</p>
										<p>{props.userDetails.email}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='flex gap-8 pt-28 animate-translateRight'>
						<div className='w-1/3 bg-white/10 p-4 rounded-xl flex flex-col gap-6 h-fit sticky top-0'>
							<p className='text-xl font-semibold'>{Localize('INTRODUCE')}</p>
							<div className='flex flex-col gap-3'>
								<Item classLabel='min-w-36' label='FIRST_NAME' content={props.userDetails.firstName} />
								<Item classLabel='min-w-36' label='LAST_NAME' content={props.userDetails.lastName} />
								<Item
									classLabel='min-w-36'
									label='GENDER'
									content={Helper.isEmpty(props.userDetails.gender) ? '' : parseGender[props.userDetails.gender as Gender]}
								/>
								<Item classLabel='min-w-36' label='ADDRESS' content={props.userDetails.address} />
								<Item classLabel='min-w-36' label='ROLE' content={parseEnumRole[props.userDetails.role]} />
								<Item classLabel='min-w-36' label='EMAIL' content={props.userDetails.email} />
								<Item classLabel='min-w-36' label='CREATE_AT' content={dayjs(props.userDetails.createdAt).format('DD-MM-YYYY HH:mm')} />
							</div>
						</div>
						<div className='w-2/3 p-4 rounded-xl flex flex-col gap-6 h-fit'>
							<p className='text-xl font-semibold'>{Localize('PLAYLIST')}</p>
							<Empty
								isEmpty={false}
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
