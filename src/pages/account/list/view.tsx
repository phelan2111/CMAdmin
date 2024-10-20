import Button from '@/components/root/button';
import Wrapper from '@/components/ui/wrapper/normal';
import Localize from '@/langs';
import TableAccount from '@/layout/account/table';
import { ResponseRequest } from '@/services/types';
import { ResponseGetUser } from '@/services/user/getList';

type ViewProps = {
	data: ResponseRequest<ResponseGetUser>;
};

function View(props: ViewProps) {
	return (
		<div className='pr-4 py-8'>
			<Wrapper className='flex flex-col gap-20'>
				<div className='flex justify-between items-end animate-translateRight'>
					<div className='leading-10'>
						<h1 className='text-5xl font-semibold'>{Localize('ACCOUNT')}</h1>
						<p>It is list of accounts in the system</p>
					</div>
					<div className='w-40'>
						<Button className='!bg-white/80 w-full text-primary_dark !rounded-md hover:!bg-white/50'>Create</Button>
					</div>
				</div>
				<div className='flex flex-col gap-4 h-full animate-translateRight'>
					<TableAccount data={props.data.list} total={props.data.total} />
				</div>
			</Wrapper>
		</div>
	);
}

export default View;
