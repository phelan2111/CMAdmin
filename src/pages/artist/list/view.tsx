import Button from '@/components/root/button';
import Wrapper from '@/components/ui/wrapper/normal';
import Localize from '@/langs';
import TableArtist from '@/layout/artist/table';

function View() {
	return (
		<div className='pr-4 py-8'>
			<Wrapper className='flex flex-col gap-20'>
				<div className='flex justify-between items-end animate-translateRight'>
					<div className='leading-10'>
						<h1 className='text-5xl font-semibold'>{Localize('ARTIST')}</h1>
						<p>It is list of accounts in the system</p>
					</div>
					<div className='w-40'>
						<Button className='!bg-white/80 w-full text-primary_dark !rounded-md hover:!bg-white/50'>Create</Button>
					</div>
				</div>
				<div className='flex flex-col gap-4 h-full animate-translateRight'>
					<TableArtist />
				</div>
			</Wrapper>
		</div>
	);
}

export default View;
