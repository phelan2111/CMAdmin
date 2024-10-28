import Item from '@/components/ui/items/normal';
import SkeletonDetails from '@/components/ui/skeleton/details';
import StatusBrowse from '@/components/ui/status/browse';
import Wrapper from '@/components/ui/wrapper/normal';
import Localize from '@/langs';
import ActionBrowse from '@/layout/browse/action';
import dayjs from 'dayjs';
import { FucCreateGenreProps } from '../types';
import UpdateStatus from '../update/status';
import { ResponseGetGenreDetailsOfBrowse } from '@/services/browse/genre/getDetails';
import Image from '@/components/root/image/normal';
import UpdateButton from '@/components/ui/button/update';
import UpdateInformation from '../update/information';

type ViewProps = {
	isLoading: boolean;
	genreDetails: ResponseGetGenreDetailsOfBrowse;
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
								<StatusBrowse status={props.genreDetails.status} />
							</div>
							<p>#{props.genreDetails.genreId}</p>
						</div>
						<div className='flex items-center gap-4'>
							<ActionBrowse
								status={props.genreDetails.status}
								onDisplay={() => {
									props.onUpdateTopic({
										renderComponent: (
											<UpdateStatus
												onSuccess={props.onFreshRequest}
												content='DISPLAY_GENRE_TITLE'
												title='DISPLAY_GENRE_DESCRIPTION'
												details={props.genreDetails}
											/>
										),
									});
								}}
								onHidden={() => {
									props.onUpdateTopic({
										renderComponent: (
											<UpdateStatus
												onSuccess={props.onFreshRequest}
												content='HIDDEN_GENRE_DESCRIPTION'
												title='HIDDEN_GENRE_TITLE'
												details={props.genreDetails}
											/>
										),
									});
								}}
							/>
							<UpdateButton
								onClick={() => {
									props.onUpdateTopic({
										renderComponent: (
											<UpdateInformation
												onSuccess={props.onFreshRequest}
												content='UPDATE_GENRE_DESCRIPTION'
												title='UPDATE_GENRE'
												details={props.genreDetails}
											/>
										),
									});
								}}
							/>
						</div>
					</div>
					<div className='grid grid-cols-2 gap-6'>
						<div className='flex flex-col gap-8 animate-translateRight bg-white/10 h-fit rounded-xl p-6'>
							<p className='text-2xl font-medium capitalize'>{Localize('INFORMATION_GENRE')}</p>
							<div className='flex gap-6 items-center'>
								<Image src={props.genreDetails.imageGenre} />
								<div className='flex flex-col gap-4'>
									<Item label='GENRE_NAME' content={props.genreDetails.nameGenre} />
									<Item
										label='CREATE_AT'
										renderContent={() => {
											return <p>{dayjs(props.genreDetails.createdAt).format('DD-MM-YYYY hh:mm')}</p>;
										}}
									/>
									<Item
										label='UPDATE_AT'
										renderContent={() => {
											return <p>{dayjs(props.genreDetails.updatedAt).format('DD-MM-YYYY hh:mm')}</p>;
										}}
									/>
								</div>
							</div>
						</div>
						<div className='flex flex-col gap-8 animate-translateRight bg-white/10 rounded-xl p-6 h-full'>
							<p className='text-2xl font-medium capitalize'>{Localize('INFORMATION_TOPIC')}</p>
							<div className='flex gap-6 items-center h-full'>
								<div className='flex flex-col gap-4 justify-between'>
									<Item label='GENRE_NAME' content={props.genreDetails.topic.topicName} />
									<Item
										label='CREATE_AT'
										renderContent={() => {
											return <p>{dayjs(props.genreDetails.topic.createdAt).format('DD-MM-YYYY hh:mm')}</p>;
										}}
									/>
									<Item
										label='UPDATE_AT'
										renderContent={() => {
											return <p>{dayjs(props.genreDetails.topic.updatedAt).format('DD-MM-YYYY hh:mm')}</p>;
										}}
									/>
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
