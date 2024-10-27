import Item from '@/components/ui/items/normal';
import SkeletonDetails from '@/components/ui/skeleton/details';
import StatusBrowse from '@/components/ui/status/browse';
import Wrapper from '@/components/ui/wrapper/normal';
import Localize from '@/langs';
import ActionBrowse from '@/layout/browse/action';
import { ResponseGetTopicDetailsOfBrowse } from '@/services/browse/topic/getDetails';
import dayjs from 'dayjs';
import { FucCreateTopicProps } from '../types';
import UpdateStatus from '../update';

type ViewProps = {
	isLoading: boolean;
	topicDetails: ResponseGetTopicDetailsOfBrowse;
	onHiddenTopic: (dataItem: FucCreateTopicProps) => void;
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
								<h1 className='text-5xl font-semibold'>{Localize('TOPIC_DETAILS')}</h1>
								<StatusBrowse status={props.topicDetails.status} />
							</div>
							<p>#{props.topicDetails._id}</p>
						</div>
						<ActionBrowse
							status={props.topicDetails.status}
							onDisplay={() => {
								props.onHiddenTopic({
									renderComponent: (
										<UpdateStatus
											onSuccess={props.onFreshRequest}
											content='DISPLAY_TOPIC_TITLE'
											title='DISPLAY_TOPIC_DESCRIPTION'
											details={props.topicDetails}
										/>
									),
								});
							}}
							onHidden={() => {
								props.onHiddenTopic({
									renderComponent: (
										<UpdateStatus
											onSuccess={props.onFreshRequest}
											content='HIDDEN_TOPIC_DESCRIPTION'
											title='HIDDEN_TOPIC_TITLE'
											details={props.topicDetails}
										/>
									),
								});
							}}
						/>
					</div>
					<div className='flex flex-col gap-8 animate-translateRight bg-white/10 h-fit rounded-xl p-6'>
						<p className='text-2xl font-medium capitalize'>{Localize('INFORMATION_BASIC')}</p>
						<div className='flex flex-col gap-4'>
							<Item label='TOPIC_NAME' content={props.topicDetails.topicName} />
							<Item
								label='CREATE_AT'
								renderContent={() => {
									return <p>{dayjs(props.topicDetails.createdAt).format('DD-MM-YYYY hh:mm')}</p>;
								}}
							/>
							<Item
								label='UPDATE_AT'
								renderContent={() => {
									return <p>{dayjs(props.topicDetails.updatedAt).format('DD-MM-YYYY hh:mm')}</p>;
								}}
							/>
						</div>
					</div>
				</Wrapper>
			</SkeletonDetails>
		</div>
	);
}

export default View;
