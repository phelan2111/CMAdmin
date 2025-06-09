import { Outlet } from 'react-router-dom';
import background from '@/assets/kyc/backoffcice_KYC.webp';

function AuthWrapper() {
	return (
		<main
			style={{
				backgroundImage: `url(${background})`,
			}}
			className='w-screen h-screen flex justify-center bg-wrapperAuth relative overflow-hidden bg-cover'>
			<div className='max-w-[1920px] m-auto w-full lg:flex lg:p-6 lg:gap-6'>
				<div className='flex w-full gap-6'>
					<Outlet />
				</div>
			</div>
		</main>
	);
}

export default AuthWrapper;
