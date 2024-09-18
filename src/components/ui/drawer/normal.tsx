import LogoComponent from '../common/logo';
import Menu from '@/components/root/menu/normal';
import MenuItem from '@/components/root/menu/item/normal';
import {
	GoBook,
	GoChevronDown,
	GoCopilot,
	GoStack,
	GoChevronRight,
	GoHome,
} from 'react-icons/go';
import { ReactNode, useMemo, useState } from 'react';
import { Helper } from '@/utils/helper';
import { PATH } from '@/routes/config';
enum LAYER {
	parents = 0,
	child,
}
interface IItemDrawer {
	icon?: ReactNode;
	text: string;
	id: string;
	path: string;
	children?: IItemDrawer[];
	layer: LAYER;
}
const drawer: IItemDrawer[] = [
	{
		id: Helper.randomKey(),
		path: PATH.HOME,
		text: 'Home',
		icon: <GoHome className='text-xl' />,
		layer: LAYER.parents,
	},
	{
		id: Helper.randomKey(),
		path: PATH.HOME,
		text: 'Music',
		icon: <GoStack className='text-xl' />,
		layer: LAYER.parents,
		children: [
			{
				id: Helper.randomKey(),
				path: PATH.HOME,
				text: 'Album',
				icon: <GoStack className='text-xl' />,
				layer: LAYER.child,
			},
			{
				id: Helper.randomKey(),
				path: PATH.HOME,
				text: 'Playlist',
				icon: <GoStack className='text-xl' />,
				layer: LAYER.child,
			},
		],
	},
	{
		id: Helper.randomKey(),
		path: PATH.HOME,
		text: 'Artists',
		icon: <GoCopilot className='text-xl' />,
		layer: LAYER.parents,
	},
	{
		id: Helper.randomKey(),
		path: PATH.HOME,
		text: 'Podcast',
		icon: <GoBook className='text-xl' />,
		layer: LAYER.parents,
	},
];

function DrawerNormal() {
	const [state, setState] = useState<[string, string]>(['', '']); // [parentsId, childrenId]

	const idItemDrawerList: [string, string] = useMemo(
		() => [...state],
		[state],
	);

	const handleParentExist = (id: string) => {
		const index = idItemDrawerList.findIndex((i) => i === id);
		const isExist = index !== -1;
		if (isExist) {
			idItemDrawerList[0] = '';
		} else {
			idItemDrawerList[0] = id;
		}
	};
	const handleClick = (dataItem: IItemDrawer) => {
		const isParents = dataItem.layer === LAYER.parents;
		if (isParents) {
			handleParentExist(dataItem.id);
		} else {
			idItemDrawerList[1] = dataItem.id;
		}
		setState(idItemDrawerList);
	};

	return (
		<aside className='h-full bg-white/10 backdrop-blur-2xl flex flex-col gap-4 rounded-l-2xl'>
			<div className='p-4 h-20 overflow-hidden flex items-center justify-between'>
				<div className='scale-50 -translate-y-0 -translate-x-10 cursor-pointer'>
					<LogoComponent />
				</div>
				<div className='w-7 h-7 cursor-pointer transition-all duration-500 text-white rounded-full flex items-center justify-center hover:bg-yellow-50 hover:text-primary_dark-20'>
					<GoChevronRight />
				</div>
			</div>
			<nav className='pr-3'>
				<Menu>
					{drawer.map((item) => {
						const isChild = item.children;
						return (
							<MenuItem
								onClick={() => {
									handleClick(item);
								}}
								key={item.id}>
								<div className='flex items-center justify-between gap-2 text-md w-full rounded-2xl text-white py-2 px-3 hover:bg-white/10 transition-colors duration-500'>
									<div className='flex items-center gap-2'>
										{item.icon}
										<div className='pt-1'>
											<p>{item.text}</p>
										</div>
									</div>
									{isChild && <GoChevronDown />}
								</div>
								{isChild && (
									<Menu gap='gap-0'>
										{item.children?.map((child) => {
											return (
												<MenuItem
													onClick={() => {
														handleClick(child);
													}}
													key={child.id}>
													<div className='flex items-center justify-between gap-2 text-md w-full rounded-2xl text-white py-2 px-3 hover:bg-white/10 transition-colors duration-500'>
														<div className='flex items-center gap-2'>
															<div className='w-2 h-2' />
															<div className='pt-1'>
																<p>
																	{child.text}
																</p>
															</div>
														</div>
													</div>
												</MenuItem>
											);
										})}
									</Menu>
								)}
							</MenuItem>
						);
					})}
				</Menu>
			</nav>
		</aside>
	);
}

export default DrawerNormal;
