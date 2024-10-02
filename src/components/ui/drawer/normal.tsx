import LogoComponent from '../common/logo';
import Menu from '@/components/root/menu/normal';
import MenuItem from '@/components/root/menu/item/normal';
import { GoBook, GoChevronDown, GoCopilot, GoStack, GoHome, GoHubot } from 'react-icons/go';
import { ReactNode, useMemo, useState } from 'react';
import { Helper } from '@/utils/helper';
import { PATH } from '@/routes/config';
import Localize from '@/langs';
import { useRedirect } from '@/hooks/useRedirect';

interface IItemDrawer {
	icon?: ReactNode;
	text: string;
	id: string;
	path: string;
	children?: IItemDrawer[];
	classTargeted?: string;
	classTargetedItem?: string;
}
const drawer: IItemDrawer[] = [
	{
		id: Helper.randomKey(),
		path: PATH.DASHBOARD,
		text: 'DASHBOARD',
		icon: <GoHome className='text-xl' />,
		classTargeted: 'bg-white/20',
	},
	{
		id: Helper.randomKey(),
		path: PATH.ACCOUNT,
		text: 'ACCOUNT',
		icon: <GoHubot className='text-xl' />,
		classTargeted: 'bg-white/20',
	},
	{
		id: Helper.randomKey(),
		path: PATH.HOME,
		text: 'MUSIC',
		icon: <GoStack className='text-xl' />,
		classTargetedItem: 'h-[132px]',
		children: [
			{
				id: Helper.randomKey(),
				path: PATH.HOME,
				text: 'ALBUM',
				icon: <GoStack className='text-xl' />,
				classTargeted: 'bg-white/20',
			},
			{
				id: Helper.randomKey(),
				path: PATH.HOME,
				text: 'PLAYLIST',
				icon: <GoStack className='text-xl' />,
				classTargeted: 'bg-white/20',
			},
		],
	},
	{
		id: Helper.randomKey(),
		path: PATH.HOME,
		text: 'ARTIST',
		icon: <GoCopilot className='text-xl' />,
		classTargeted: 'bg-white/20',
	},
	{
		id: Helper.randomKey(),
		path: PATH.HOME,
		text: 'PODCAST',
		icon: <GoBook className='text-xl' />,
		classTargeted: 'bg-white/20',
	},
];

function DrawerNormal() {
	const [state, setState] = useState<[string, string]>(['', '']); // [parentsId, childrenId]
	const { redirectPage } = useRedirect();

	const idItemDrawerList: [string, string] = useMemo(() => [...state], [state]);

	const handleClickParents = (dataParents: IItemDrawer) => {
		const index = idItemDrawerList.findIndex((i) => i === dataParents.id);
		const isExist = index !== -1;
		if (!isExist) {
			idItemDrawerList[0] = dataParents.id;
		}
		if (!dataParents.children?.length) {
			idItemDrawerList[1] = '';
			redirectPage(dataParents.path);
		} else {
			if (isExist) {
				idItemDrawerList[0] = '';
			}
		}
		setState(idItemDrawerList);
	};
	const handleClickChild = (itemParents: IItemDrawer, itemChild: IItemDrawer) => {
		idItemDrawerList[0] = itemParents.id;
		idItemDrawerList[1] = itemChild.id;
		setState(idItemDrawerList);
		redirectPage(itemChild.path);
	};

	return (
		<aside className='h-full bg-white/10 backdrop-blur-2xl flex flex-col gap-4 rounded-l-2xl'>
			<div className='p-4 h-20 overflow-hidden flex items-center justify-between'>
				<div className='scale-50 -translate-y-0 cursor-pointer'>
					<LogoComponent />
				</div>
			</div>
			<nav className='pr-3'>
				<Menu>
					{drawer.map((child) => {
						const isChild = child.children;
						const isParentsTargeted = child.id === state[0];
						return (
							<MenuItem
								className={`overflow-hidden transition-all duration-500 ${isParentsTargeted ? child.classTargetedItem : 'h-11'}`}
								key={child.id}>
								<div
									aria-hidden
									onClick={() => {
										handleClickParents(child);
									}}
									className={`flex items-center justify-between gap-2 text-md w-full rounded-2xl text-white py-2 px-3 hover:bg-white/10 transition-colors duration-500 ${
										isParentsTargeted && child.classTargeted
									}`}>
									<div className='flex items-center gap-2'>
										{child.icon}
										<div className='pt-1'>
											<p>{Localize(child.text)}</p>
										</div>
									</div>
									{isChild && <GoChevronDown />}
								</div>
								{isChild && (
									<Menu gap='gap-0'>
										{child.children?.map((subChild) => {
											const isChildTargeted = subChild.id === state[1];
											return (
												<MenuItem
													onClick={() => {
														handleClickChild(child, subChild);
													}}
													key={child.id}>
													<div
														className={`flex items-center justify-between gap-2 text-md w-full rounded-2xl text-white py-2 px-3 hover:bg-white/10 transition-colors duration-500 ${
															isChildTargeted && subChild.classTargeted
														}`}>
														<div className='flex items-center gap-2'>
															<div className='w-2 h-2' />
															<div className='pt-1'>
																<p>{Localize(subChild.text)}</p>
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