import Form from '@/components/root/form';
import Radio from '@/components/root/inputs/radio';
import Wrapper from '@/components/ui/wrapper/normal';
import { string } from 'yup';
import Localize from '@/langs';
import Button from '@/components/root/button';
import Input from '@/components/ui/input/input';
import Select from '@/components/root/inputs/select';
import { genderRadio, initialSelectRole } from '@/utils/variables';
import { DataFormCreate } from '../types';
import UploadCoverRequestAccount from '@/components/ui/upload/request/cover/cover';
import AvatarUploadRequestAccount from '@/components/ui/upload/request/avatar/avatar';

type IViewProps = {
	onSubmit: (dataItem: DataFormCreate) => void;
};

function View(props: IViewProps) {
	return (
		<div className='pr-4 py-8'>
			<Form
				onSubmit={props.onSubmit}
				defaultValues={{
					gender: genderRadio[0],
					role: initialSelectRole[0],
				}}
				validator={{
					lastName: string().required('LAST_NAME_REQUIRED'),
					firstName: string().required('FIRST_NAME_REQUIRED'),
					email: string().required('EMAIL_REQUIRED'),
				}}
				render={(renderProps) => {
					return (
						<Wrapper className='flex flex-col !gap-6'>
							<div className='flex justify-between items-center animate-translateRight'>
								<div className='leading-10 flex flex-col gap-2'>
									<div className='flex items-end gap-4'>
										<h1 className='text-5xl font-semibold'>{Localize('CREATE_ACCOUNT')}</h1>
									</div>
									<p>It is create accounts in the system</p>
								</div>
							</div>
							<div className='animate-translateRight'>
								<div className='h-72'>
									<UploadCoverRequestAccount name='cover' />
									<AvatarUploadRequestAccount name='avatar' />
								</div>
							</div>
							<div className='flex flex-col gap-8 pt-24 animate-translateRight w-full'>
								<div className='flex flex-col gap-8 w-full bg-white/10 p-8 rounded-xl'>
									<p className='text-3xl font-semibold'>{Localize('INTRODUCE')}</p>
									<div className='grid grid-cols-2 gap-6'>
										<Input required label='FIRST_NAME' name='lastName' />
										<Input required label='LAST_NAME' name='firstName' />
										<div className='animate-translateRight'>
											<Radio name='gender' label='GENDER' data={genderRadio} />
										</div>
										<div className='animate-translateRight'>
											<Select
												name='role'
												label='ROLE'
												data={initialSelectRole}
												classNameInput='!text-start !text-primary_dark'
												classActive='bg-gray-200 text-primary_dark'
												classItem='bg-white'
												className='bg-white'
												classHelperText='font-medium text-red-600'
												classNameEmpty='bg-white'
												classMenuItem='px-3 py-2'
											/>
										</div>
										<Input required label='EMAIL' name='email' />
										<Input placeholder={Localize('PLACEHOLDER_ADDRESS')} label='ADDRESS' name='address' />
									</div>
								</div>
								<Button disabled={!renderProps.isValid} type='submit' className='text-white !rounded-md h-14'>
									{Localize('SUBMIT')}
								</Button>
							</div>
						</Wrapper>
					);
				}}
			/>
		</div>
	);
}

export default View;
