import { FilterStatusItem } from '@/components/ui/common/tool/filter/status';
import { ResponseGetTopicDetailsOfBrowse } from '@/services/browse/topic/getDetails';
import { EnumStatusBrowse } from '@/utils/enums';
import { Helper } from '@/utils/helper';

export const dataFilter: FilterStatusItem[] = [
	{
		id: Helper.randomKey(),
		text: 'DISPLAY',
		value: EnumStatusBrowse.display,
		className: 'bg-green-500',
	},
	{
		id: Helper.randomKey(),
		text: 'HIDDEN',
		value: EnumStatusBrowse.hidden,
		className: 'bg-red-500',
	},
];

export const initialStateItemTopic: ResponseGetTopicDetailsOfBrowse = {
	_id: '',
	topicName: '',
	status: EnumStatusBrowse.display,
	createdAt: '',
	updatedAt: '',
	__v: 0,
};
