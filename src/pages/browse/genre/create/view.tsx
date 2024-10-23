import Form from '@/components/root/form';
import TextAreaField from '@/components/root/inputs/textarea';
import TextField from '@/components/root/inputs/textField';
import Wrapper from '@/components/ui/wrapper/normal';
import Localize from '@/langs';

function View() {
	return (
		<div className='pr-4 py-8'>
			<Wrapper className='flex flex-col gap-20'>
				<div className='flex justify-between items-end animate-translateRight'>
					<div className='leading-10'>
						<h1 className='text-5xl font-semibold'>{Localize('CREATE_BROWSE')}</h1>
						<p>It is list of browse in the system</p>
					</div>
				</div>
				<div className='flex flex-col gap-4 h-full animate-translateRight'>
					<Form
						render={() => {
							return (
								<div className='flex flex-col gap-4'>
									<TextField label='SINGE_NAME' className='bg-white/30' name='singerName' />
									<TextAreaField label='SINGE_DESCRIPTION' className='bg-white/30' name='singerName' />
								</div>
							);
						}}
					/>
				</div>
			</Wrapper>
		</div>
	);
}

export default View;
