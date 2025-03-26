import DialogWrapper from '@/components/ui/wrapper/modal/dialog';
import { UpdateStatusProps } from '.';
import Button from '@/components/root/button';
import Localize from '@/langs';
import InputColor from '@/components/ui/input/color';
import TextField from '@/components/root/inputs/textField';
import TextAreaField from '@/components/root/inputs/textarea';
import Form from '@/components/root/form';
import { FormUpdateInformation } from '../../types';
import { string } from 'yup';

interface IViewProps extends UpdateStatusProps {
	onSubmit: (dataItem: FormUpdateInformation) => void;
}

function View(props: IViewProps) {
	return (
		<DialogWrapper className='w-[1024px]' title={'UPDATE_INFORMATION_PLAYLIST'} description={'UPDATE_INFORMATION_DESCRIPTION'}>
			<Form
				onSubmit={props.onSubmit}
				defaultValues={{
					namePlaylist: props.details.namePlaylist,
					descriptionPlaylist: props.details.descriptionPlaylist,
					theme: props.details.theme,
				}}
				validator={{
					namePlaylist: string().required(),
					descriptionPlaylist: string().required(),
					theme: string().required(),
				}}
				render={({ getValues, formState }) => {
					return (
						<div className='flex flex-col gap-10'>
							<div className='flex bg-gradient-to-b from-[#232323] rounded-lg overflow-hidden text-white'>
								<div
									style={{
										background: `linear-gradient(${getValues()?.theme as string}30, transparent)`,
									}}
									className={`p-6 w-2/3 flex gap-6 items-start relative`}>
									<div>
										<img className='rounded-lg object-cover min-w-60 size-60' src={props.details.image} alt='' />
									</div>
									<div className='text-sm flex flex-col gap-1 justify-between h-full'>
										<p>{Localize('PLAYLIST')}</p>
										<p className='text-5xl font-bold line-clamp-2'>{getValues()?.namePlaylist as string}</p>
										<div className='flex flex-col gap-1'>
											<p className='line-clamp-2'>{getValues()?.descriptionPlaylist as string}</p>
											<div className='flex items-center gap-1'>
												<p className='font-bold'>Cohesive</p>
												<p>
													{' '}
													• {props.details.viewSaves} {Localize('SAVES')} • {props.details.songs.length} {Localize('SONGS')}
												</p>
											</div>
										</div>
									</div>
									<div className='absolute top-4 right-4'>
										<InputColor name='theme' label='COLOR_THEME' />
									</div>
								</div>
								<div className='w-1/3 flex flex-col gap-4 bg-primary_dark-10 p-6 rounded-se-xl'>
									<p className='text-2xl font-medium'>{Localize('INFORMATION_BASIC')}</p>
									<div className='flex flex-col gap-4'>
										<TextField placeholder="Enter playlist's name" name='namePlaylist' label='NAME_PLAYLIST' />
										<TextAreaField
											placeholder="Enter playlist's description"
											classNameTextArea='!h-20'
											name='descriptionPlaylist'
											label='DESCRIPTION_PLAYLIST'
										/>
									</div>
								</div>
							</div>
							<Button disabled={!formState.isDirty || !formState.isValid} type='submit' className='text-white rounded-[6px] h-14'>
								{Localize('SUBMIT')}
							</Button>
						</div>
					);
				}}
			/>
		</DialogWrapper>
	);
}

export default View;
