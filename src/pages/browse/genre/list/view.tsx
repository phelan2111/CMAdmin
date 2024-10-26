import Button from '@/components/root/button';
import Wrapper from '@/components/ui/wrapper/normal';
import { useRedirect } from '@/hooks/useRedirect';
import Localize from '@/langs';
import TableGenre from '@/layout/browse/table/genre';
import { PATH } from '@/routes/config';
import { ResponseGetGenreOfBrowse } from '@/services/browse/genre/getList';
import { ResponseRequest } from '@/services/types';

type ViewProps = {
	data: ResponseRequest<ResponseGetGenreOfBrowse>;
	isLoading: boolean;
};

function View(props: ViewProps) {
	const { redirectPage } = useRedirect();

	return (
		<div className='pr-4 py-8'>
			<Wrapper className='flex flex-col gap-20'>
				<div className='flex justify-between items-end animate-translateRight'>
					<div className='leading-10'>
						<h1 className='text-5xl font-semibold'>{Localize('BROWSE')}</h1>
						<p>It is list of browse in the system</p>
					</div>
					<div className='w-40'>
						<Button
							onClick={() => {
								redirectPage(PATH.BROWSE.CREATE);
							}}
							className='!bg-white/80 w-full text-primary_dark !rounded-md hover:!bg-white/50'>
							Create
						</Button>
					</div>
				</div>
				<div className='flex flex-col gap-4 h-full animate-translateRight'>
					<TableGenre isLoading={props.isLoading} data={props.data.list} total={props.data.total} />
				</div>
			</Wrapper>
		</div>
	);
}

export default View;
