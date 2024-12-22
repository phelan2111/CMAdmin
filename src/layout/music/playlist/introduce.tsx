import TextAreaField from '@/components/root/inputs/textarea';
import TextField from '@/components/root/inputs/textField';
import InputColor from '@/components/ui/input/color';
import UploadRequest from '@/components/ui/upload/request/normal/playlist';
import Localize from '@/langs';

const IntroducePlaylist = () => {
	return (
		<div className='flex'>
			<div className='bg-white/10 p-10 w-2/3 rounded-ss-xl flex gap-6 items-end relative'>
				<UploadRequest className='rounded-lg size-60' />
				<div className='text-sm flex flex-col gap-1'>
					<p>{Localize('PLAYLIST')}</p>
					<p className='text-8xl font-bold py-4'>Christmas Pop</p>
					<p>All the best in new and classic Christmas Pop! Cover: Ariana Grande</p>
					<div className='flex items-center gap-1'>
						<p className='font-bold'>Cohesive</p>
						<p> • 2,461,066 saves • 95 songs , about 5 hr</p>
					</div>
				</div>
				<div className='absolute top-4 right-4'>
					<InputColor label='COLOR_THEME' />
				</div>
			</div>
			<div className='w-1/3 flex flex-col gap-6 bg-primary_dark-10 p-6 rounded-se-xl'>
				<p className='text-2xl font-medium'>{Localize('INFORMATION_BASIC')}</p>
				<div className='flex flex-col gap-4'>
					<TextField placeholder="Enter playlist's name" name='namePlaylist' label='NAME_PLAYLIST' />
					<TextAreaField
						placeholder="Enter playlist's description"
						classNameTextArea='h-24'
						name='descriptionPlaylist'
						label='DESCRIPTION_PLAYLIST'
					/>
				</div>
			</div>
		</div>
	);
};

export default IntroducePlaylist;
