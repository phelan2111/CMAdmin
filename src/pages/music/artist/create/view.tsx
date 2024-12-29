import Button from '@/components/root/button';
import Form from '@/components/root/form';
import TextAreaField from '@/components/root/inputs/textarea';
import AvatarUploadRequestSinger from '@/components/ui/upload/request/avatar/avatarSinger';
import UploadCarouselCoverArtistRequest from '@/components/ui/upload/request/cover/carouselCover';
import Wrapper from '@/components/ui/wrapper/normal';
import Localize from '@/langs';
import GenresSelect from '@/layout/music/artist/genresSelect';
import Socials from '@/layout/music/artist/socials';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { DataFormCreateSinger } from '../types';
import { array, string } from 'yup';
import TextField from '@/components/root/inputs/textField';

type IViewProps = {
	onSubmit: (dataItem: DataFormCreateSinger) => void;
};
function View(props: IViewProps) {
	return (
		<div className='pr-4 py-8'>
			<Form
				validator={{
					singerName: string().required('SINGER_NAME_REQUIRED'),
					singerDescription: string().required('SINGER_DESCRIPTION_REQUIRED'),
					genres: array().required('GENRES_REQUIRED'),
				}}
				onSubmit={props.onSubmit}
				render={(renderProps) => {
					return (
						<Wrapper className='flex flex-col !gap-6'>
							<div className='flex justify-between items-center animate-translateRight'>
								<div className='leading-10 flex flex-col gap-2'>
									<div className='flex items-end gap-4'>
										<h1 className='text-5xl font-semibold'>{Localize('CREATE_ARTIST')}</h1>
									</div>
								</div>
							</div>
							<div className='animate-translateRight flex'>
								<div className='w-2/3 bg-white/10 p-6 rounded-l-xl'>
									<div className='h-72'>
										<UploadCarouselCoverArtistRequest name='singerCover' />
										<AvatarUploadRequestSinger name='singerAvatar' />
									</div>
									<div className='flex flex-col gap-8 mt-28'>
										<p className='text-3xl font-semibold'>{Localize('GENRE')}</p>
										<GenresSelect name='genres' />
									</div>
								</div>
								<div className='w-1/3 bg-primary_dark-10'>
									<div className='flex flex-col gap-8 animate-translateRight w-full'>
										<div className='flex gap-6 relative'>
											<div className='flex flex-col w-full sticky top-0 h-fit'>
												<div className='flex flex-col gap-8 p-8 rounded-xl'>
													<p className='text-3xl font-semibold'>{Localize('INTRODUCE')}</p>
													<div className='flex flex-col gap-4'>
														<TextField required label='ARTIST_NAME' name='singerName' />
														<TextAreaField
															className='!rounded-lg'
															classNameTextArea='!text-primary_dark'
															required
															label='ARTIST_DESCRIPTION'
															name='singerDescription'
														/>
													</div>
												</div>
												<div className='flex flex-col gap-8 px-8 rounded-xl'>
													<p className='text-3xl font-semibold'>{Localize('SOCIAL')}</p>
													<div className='flex flex-col gap-4'>
														<Socials className='' icon={<FaFacebookF />} name='facebook' text='FACEBOOK' />
														<Socials className='' icon={<FaInstagram />} name='instagram' text='INSTAGRAM' />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='w-full'>
								<Button disabled={!renderProps.formState.isValid} type='submit' className='text-white !rounded-md w-full'>
									{Localize('SUBMIT')}
								</Button>
							</div>
						</Wrapper>
					);
				}}
			/>
		</div>
	);
}

export default View;
