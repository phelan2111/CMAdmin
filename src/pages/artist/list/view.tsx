import Button from '@/components/root/button';
import Wrapper from '@/components/ui/wrapper/normal';
import { useRedirect } from '@/hooks/useRedirect';
import Localize from '@/langs';
import TableArtist from '@/layout/artist/table';
import { PATH } from '@/routes/config';
import { ResponseGetListArtist } from '@/services/artist/getSinger';
import { ResponseRequest } from '@/services/types';

type ViewProps = {
	data: ResponseRequest<ResponseGetListArtist>;
	isLoading: boolean;
};

function View(props: ViewProps) {
	const { redirectPage } = useRedirect();
	return (
		<div className='pr-4 py-8'>
			<Wrapper className='flex flex-col gap-20'>
				<div className='flex justify-between items-end animate-translateRight'>
					<div className='leading-10'>
						<h1 className='text-5xl font-semibold'>{Localize('ARTIST')}</h1>
						<p>It is list of accounts in the system</p>
					</div>
					<div className='w-40'>
						<Button
							onClick={() => {
								redirectPage(PATH.ARTIST.CREATE);
							}}
							className='!bg-white/80 w-full text-primary_dark !rounded-md hover:!bg-white/50'>
							Create
						</Button>
					</div>
				</div>
				<div className='flex flex-col gap-4 h-full animate-translateRight'>
					<TableArtist
						onClickRow={(dataItem) => {
							redirectPage(`${PATH.ARTIST._}/${dataItem._id}`);
						}}
						data={props.data.list}
						total={props.data.total}
						isLoading={props.isLoading}
					/>
				</div>
			</Wrapper>
		</div>
	);
}

export default View;
