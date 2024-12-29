import DialogWrapper from '@/components/ui/wrapper/modal/dialog';
import { UpdateInformationProps } from '.';
import Form from '@/components/root/form';
import Localize from '@/langs';
import { string } from 'yup';
import Button from '@/components/root/button';
import { DataFormUpdateSocials } from '../../types';
import Socials from '@/layout/music/artist/socials';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

interface IViewProps extends UpdateInformationProps {
	onSubmit: (dataItem: DataFormUpdateSocials) => void;
}

function View(props: IViewProps) {
	return (
		<DialogWrapper className='w-[480px]' title={props.title} description={props.content}>
			<Form
				onSubmit={props.onSubmit}
				defaultValues={{
					facebook: props.details.socials?.facebook,
					instagram: props.details.socials?.instagram,
				}}
				validator={{
					facebook: string().required('FACEBOOK_REQUIRED'),
					instagram: string().required('INSTAGRAM_REQUIRED'),
				}}
				render={(renderProps) => {
					return (
						<div className='flex flex-col gap-8'>
							<div className='flex flex-col gap-4'>
								<Socials icon={<FaFacebookF />} name='facebook' text='FACEBOOK' />
								<Socials icon={<FaInstagram />} name='instagram' text='INSTAGRAM' />
							</div>
							<Button disabled={!renderProps.formState.isValid} type='submit' className='text-white !rounded-md h-14'>
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
