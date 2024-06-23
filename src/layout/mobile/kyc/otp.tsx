import LogoComponent from '@/components/common/logo';
import Button from '@/core/button';
import Form from '@/core/form';
import InputOTP from '@/core/inputs/otp';
import Localize from '@/langs';

interface IOTPProps {
	onVerify: VoidFunction;
}

function OTP(props: IOTPProps) {
	return (
		<div className='bg-white/10 px-10 py-4 rounded-md flex flex-col gap-10 w-full h-screen select-none animate-translateRight'>
			<div className='flex justify-center flex-col items-center'>
				<LogoComponent />
				<div className='mt-2 px-2 py-2 rounded-sm text-center w-full'>
					<h4 className='font-bold text-lg'>
						{Localize('COHESIVE_MUSIC')}
					</h4>
				</div>
			</div>
			<div>
				<h4 className='text-3xl font-bold'>{Localize('OTP')}</h4>
				<p className='text-xs pt-2'>
					{Localize('OTP_DES')} +84 824 84**
				</p>
			</div>
			<div className=''>
				<Form
					render={() => {
						return (
							<div className='flex flex-col gap-12'>
								<InputOTP numInputs={5} />
								<div className='pt-[26px] w-full'>
									<Button
										onClick={props.onVerify}
										text='VERIFY'
									/>
								</div>
							</div>
						);
					}}
				/>
			</div>
		</div>
	);
}

export default OTP;
