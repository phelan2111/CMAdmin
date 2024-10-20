import Localize from '@/langs';
import LogoComponent from '../common/logo';
import background from '@/assets/kyc/backoffcice_KYC.jpg';

type LoaderScreenProps = {
	className?: string;
};

function LoaderScreen({ className = '' }: LoaderScreenProps) {
	return (
		<div
			style={{
				backgroundImage: `url(${background})`,
			}}
			className={`fixed w-screen h-screen bg-primary_dark z-50 right-0 top-0 flex bg-cover items-center justify-center ${className}`}>
			<div className='flex justify-center flex-col items-center relative z-10'>
				<LogoComponent />
				<div className='mt-2 px-2 py-2 rounded-sm text-center w-full text-primary_light'>
					<h4 className='font-bold text-lg'>{Localize('COHESIVE_MUSIC')}</h4>
				</div>
			</div>
			<div className='bg-primary_dark/40 backdrop-blur-xl w-full h-full absolute top-0 left-0' />
		</div>
	);
}

export default LoaderScreen;
