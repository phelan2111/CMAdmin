import Button from '@/components/root/button';
import Form from '@/components/root/form';
import Checkbox from '@/components/root/inputs/checkbox';
import TextField from '@/components/root/inputs/textField';
import InputPassword from '@/components/ui/input/password';
import Localize from '@/langs';
import { DataFormSignIn } from '@/pages/kyc/signIn/types';

type SignInProps = {
	onSubmit: (dataForm: DataFormSignIn) => void;
};
function SignIn(props: SignInProps) {
	return (
		<div className='lg:flex m-auto p-6 relative z-10 w-full items-center justify-center h-fit'>
			<section className='flex bg-white/10 backdrop-blur-2xl m-auto p-6 rounded-2xl gap-6 max-w-96 w-full text-white'>
				<article className='flex flex-col gap-10 w-full'>
					<div className='flex flex-col gap-1'>
						<h4 className='text-3xl uppercase font-semibold'>{Localize('SIGN_IN')}</h4>
						<p className='text-sm'>{Localize('LET_GET_STARTED')}</p>
					</div>
					<div>
						<Form
							onSubmit={props.onSubmit}
							render={() => {
								return (
									<div className='flex flex-col gap-4'>
										<TextField label='USER_NAME' />
										<InputPassword label='PASSWORD' />
										<div className='flex justify-between items-center'>
											<Checkbox
												label={{
													direction: 'horizontal',
													text: 'REMEMBER_FOR_30DAYS',
												}}
											/>
											<p className='text-xs underline cursor-pointer hover:text-white/70 transition-colors duration-300'>
												{Localize('FORGOT_PASSWORD')}
											</p>
										</div>
										<div className='pt-6 w-full'>
											<Button text='SIGN_IN' />
										</div>
									</div>
								);
							}}
						/>
					</div>
					<p aria-hidden='true' className='text-sm py-3 text-center cursor-pointer hover:text-white/60 transition-colors duration-300'>
						2024 Cohesive music, All rightReserved
					</p>
				</article>
			</section>
		</div>
	);
}

export default SignIn;
