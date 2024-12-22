import Checkbox from '@/components/root/inputs/checkbox';
import ItemSong from '@/components/ui/items/song';

const ItemSongSelect = () => {
	return (
		<div className='flex items-center gap-3 hover:bg-white/10 cursor-pointer px-3 py-2 transition-colors duration-300 border-b last-of-type:border-transparent'>
			<Checkbox />
			<ItemSong />
		</div>
	);
};

export default ItemSongSelect;
