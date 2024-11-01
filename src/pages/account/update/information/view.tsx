import DialogWrapper from '@/components/ui/wrapper/modal/dialog';
import { UpdateInformationProps } from '.';
import Form from '@/components/root/form';
import InputDialog from '@/components/ui/input/dialog';
import Radio from '@/components/root/inputs/radio';
import Localize from '@/langs';
import { string } from 'yup';
import Button from '@/components/root/button';
import { DataFormUpdate } from '../../types';
import { genderRadio } from '@/utils/variables';

interface IViewProps extends UpdateInformationProps {
	onSubmit: (dataItem: DataFormUpdate) => void;
}

function View(props: IViewProps) {
	return (
		<DialogWrapper className='w-[480px]' title={props.title} description={props.content}>
			<Form
				onSubmit={props.onSubmit}
				defaultValues={{
					lastName: props.details.lastName,
					firstName: props.details.firstName,
					gender: genderRadio.find((i) => i.value === props.details.gender),
					email: props.details.email,
					address: props.details.address,
				}}
				validator={{
					lastName: string().required('LAST_NAME_REQUIRED'),
					firstName: string().required('FIRST_NAME_REQUIRED'),
					email: string().required('EMAIL_REQUIRED'),
				}}
				render={(renderProps) => {
					return (
						<div className='flex flex-col gap-8'>
							<div className='flex flex-col gap-4'>
								<InputDialog label='FIRST_NAME' name='lastName' />
								<InputDialog label='LAST_NAME' name='firstName' />
								<div className='animate-translateRight'>
									<Radio name='gender' label='GENDER' data={genderRadio} />
								</div>
								<InputDialog label='EMAIL' name='email' />
								<InputDialog placeholder={Localize('PLACEHOLDER_ADDRESS')} label='ADDRESS' name='address' />
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
