import { Outlet } from 'react-router-dom';
import background from '@/assets/kyc/backoffcice_KYC.webp';
import DrawerNormal from '../drawer/normal';
import Header from '../header';

function AdminWrapper() {
	return (
		<main
			style={{
				backgroundImage: `url(${background})`,
			}}
			className='w-screen h-screen flex justify-center bg-wrapperAuth relative overflow-hidden bg-cover p-8'>
			<div className='max-w-[1920px] overflow-hidden m-auto w-full bg-white/10 backdrop-blur-2xl rounded-2xl relative h-full z-20'>
				<div className='flex w-full h-full'>
					<DrawerNormal />
					<section className='w-full flex flex-col'>
						<Header />
						<Outlet />
					</section>
				</div>
			</div>
		</main>
	);
}

export default AdminWrapper;
