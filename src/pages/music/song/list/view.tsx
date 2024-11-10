import Button from '@/components/root/button';
import { PagingState } from '@/components/root/grid/types';
import FilterStatusTool, { FilterStatusItem } from '@/components/ui/common/tool/filter/status';
import SearchTool from '@/components/ui/common/tool/search/normal';
import Wrapper from '@/components/ui/wrapper/normal';
import { useRedirect } from '@/hooks/useRedirect';
import Localize from '@/langs';
import TableArtist from '@/layout/music/artist/table';
import { PATH } from '@/routes/config';
import { ResponseGetListArtist } from '@/services/music/artist/getSinger';
import { ResponseRequest } from '@/services/types';
import { dataFilterArtist } from '../variables';

type ViewProps = {
	data: ResponseRequest<ResponseGetListArtist>;
	isLoading: boolean;
	onChangePaging?: (dataPaging: PagingState) => void;
	onChangeSearch: (dataItem: string) => void;
	onChangeFilterStatus: (dataItem: FilterStatusItem) => void;
};

function View(props: ViewProps) {
	const { redirectPage } = useRedirect();
	return (
		<div className='pr-4 py-8'>
			<Wrapper className='flex flex-col gap-20'>
				<div className='flex justify-between items-end animate-translateRight'>
					<div className='leading-10'>
						<h1 className='text-5xl font-semibold'>{Localize('SONG')}</h1>
						<p>It is list of accounts in the system</p>
					</div>
					<div className='w-40'>
						<Button
							onClick={() => {
								redirectPage(PATH.MUSIC.SONG.CREATE);
							}}
							className='!bg-white/80 w-full text-primary_dark !rounded-md hover:!bg-white/50'>
							Create
						</Button>
					</div>
				</div>
				<div className='rounded-xl px-3 py-3 flex items-center justify-between animate-translateRight'>
					<FilterStatusTool onChange={props.onChangeFilterStatus} data={dataFilterArtist} />
					<SearchTool onChange={props.onChangeSearch} />
				</div>
				<div className='flex flex-col gap-4 h-full animate-translateRight'>
					<TableArtist
						onClickRow={(dataItem) => {
							redirectPage(`${PATH.MUSIC.ARTIST._}/${dataItem._id}`);
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
