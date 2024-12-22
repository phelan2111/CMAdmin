import DialogWrapper from '@/components/ui/wrapper/modal/dialog';
import { UpdateInformationProps } from '.';
import Form from '@/components/root/form';
import Localize from '@/langs';
import { array } from 'yup';
import Button from '@/components/root/button';
import SingersSelect from '@/layout/music/song/singerSelect';
import { ResponseGetListArtist } from '@/services/music/artist/getSinger';

interface IViewProps extends UpdateInformationProps {
	onSubmit: (dataItem: ResponseGetListArtist[]) => void;
}

function View(props: IViewProps) {
	return (
		<DialogWrapper className='w-[1024px]' title={props.title} description={props.content}>
			<Form
				onSubmit={props.onSubmit}
				defaultValues={{
					singers: props.details.singer.map((i) => ({ ...i, _id: i.singerId })),
				}}
				validator={{
					singers: array().required('SINGER_REQUIRED'),
				}}
				render={(renderProps) => {
					return (
						<div className='flex flex-col gap-8'>
							<div className='flex flex-col gap-4 h-[340px] overflow-y-scroll scrollHiddenY px-6 py-2'>
								<SingersSelect name='singers' />
							</div>
							<Button disabled={!renderProps.isValid} type='submit' className='text-white !rounded-md h-14'>
								{Localize('SUBMIT')}
							</Button>
						</div>
					);
				}}
			/>
		</DialogWrapper>
	);
}

export default View;
