import Localize from '@/langs';
import TableAccount from '@/layout/account/table';

function View() {
	return (
		<div className='pr-4 py-8'>
			<section className='pl-8 pr-4 flex flex-col gap-6 text-white h-content overflow-auto scrollHiddenY'>
				<div className='leading-10 animate-translateRight'>
					<h1 className='text-5xl font-semibold'>{Localize('ACCOUNT')}</h1>
					<p>It is list of accounts in the system</p>
				</div>
				<div className='flex flex-col gap-4 h-full'>
					<TableAccount />
				</div>
			</section>
		</div>
	);
}

export default View;
