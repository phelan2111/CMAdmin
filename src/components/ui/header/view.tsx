import BreadcrumbNormal from '@/components/root/breadcrumb/normal';
import PopoverNotification from '../popover/notification';
import PopoverProfile from '../popover/profile';

function View() {
	return (
		<header className='px-4 py-2 flex items-center justify-between bg-white/10 rounded-se-2xl'>
			<BreadcrumbNormal
				data={[
					{
						id: 'hehe',
						disabled: true,
						text: 'Home',
					},
				]}
			/>
			<div className='flex gap-4 items-center'>
				<PopoverNotification />
				<PopoverProfile />
			</div>
		</header>
	);
}

export default View;
