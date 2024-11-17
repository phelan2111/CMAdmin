import Button from '@/components/root/button';
import Form from '@/components/root/form';
import TextAreaField from '@/components/root/inputs/textarea';
import Input from '@/components/ui/input/input';
import Wrapper from '@/components/ui/wrapper/normal';
import Localize from '@/langs';
import { array, number, object, string } from 'yup';
import AvatarUploadRequestSong from '@/components/ui/upload/request/avatar/avatarSong';
import SingersSelect from '@/layout/music/song/singerSelect';
import SetupSong from '@/layout/music/song/setUp';
import { DataFormCreateSong } from '../types';

type IViewProps = {
	onSubmit: (dataItem: DataFormCreateSong) => void;
};
function View(props: IViewProps) {
	return (
		<div className='pr-4 py-8'>
			<Form
				validator={{
					songName: string().required('SONG_NAME_REQUIRED'),
					songDescription: string().required('SONG_DESCRIPTION_REQUIRED'),
					singers: array().length(1).required('SINGER_REQUIRED'),
					setup: object().shape({
						type: number().required('SETUP_REQUIRED'),
						uploadData: object().shape({
							src: string().required('SETUP_REQUIRED'),
						}),
					}),
				}}
				onSubmit={props.onSubmit}
				render={(renderProps) => {
					return (
						<Wrapper className='flex flex-col !gap-6'>
							<div className='flex justify-between items-center animate-translateRight'>
								<div className='leading-10 flex flex-col gap-2'>
									<div className='flex items-end gap-4'>
										<h1 className='text-5xl font-semibold'>{Localize('DETAILS_ACCOUNT')}</h1>
									</div>
								</div>
							</div>
							<div className='animate-translateRight'>
								<div className='h-72'>
									<AvatarUploadRequestSong name='image' />
								</div>
								<div className='flex flex-col gap-8 pt-32 animate-translateRight w-full'>
									<div className='flex gap-6 relative'>
										<div className='w-1/2 flex flex-col gap-8'>
											<div className='flex flex-col gap-8 bg-white/10 rounded-xl p-8 '>
												<p className='text-3xl font-semibold'>{Localize('INTRODUCE')}</p>
												<div className='flex flex-col gap-4'>
													<Input required label='SONG_NAME' name='songName' />
													<TextAreaField
														className='!bg-white/80 !rounded-lg'
														classNameTextArea='!text-primary_dark'
														required
														label='SONG_DESCRIPTION'
														name='songDescription'
													/>
												</div>
											</div>
											<div className='bg-white/10 rounded-xl p-8 h-full flex flex-col gap-8'>
												<p className='text-3xl font-semibold'>{Localize('ARTIST')}</p>
												<SingersSelect name='singers' />
											</div>
										</div>
										<div className='flex flex-col gap-6 w-1/2 sticky top-0 h-fit'>
											<div className='flex flex-col gap-8 bg-white/10 p-8 rounded-xl'>
												<p className='text-3xl font-semibold'>{Localize('SET_UP')}</p>
												<SetupSong name='setup' />
											</div>
										</div>
									</div>
									<Button disabled={!renderProps.isValid} type='submit' className='text-white !rounded-md h-14'>
										{Localize('SUBMIT')}
									</Button>
								</div>
							</div>
						</Wrapper>
					);
				}}
			/>
		</div>
	);
}

export default View;
