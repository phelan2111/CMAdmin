import Button from '@/components/root/button';
import Form from '@/components/root/form';
import TextAreaField from '@/components/root/inputs/textarea';
import Input from '@/components/ui/input/input';
import AvatarUploadRequestSinger from '@/components/ui/upload/request/avatar/avatarSinger';
import UploadCarouselCoverArtistRequest from '@/components/ui/upload/request/cover/carouselCover';
import Wrapper from '@/components/ui/wrapper/normal';
import Localize from '@/langs';
import GenresSelect from '@/layout/artist/genresSelect';
import Socials from '@/layout/artist/socials';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { DataFormCreateSinger } from '../types';
import { array, string } from 'yup';

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
										<h1 className='text-5xl font-semibold'>{Localize('DETAILS_ACCOUNT')}</h1>
									</div>
								</div>
							</div>
							<div className='animate-translateRight'>
								<div className='h-72'>
									<UploadCarouselCoverArtistRequest name='singerCover' />
									<AvatarUploadRequestSinger name='singerAvatar' />
								</div>
								<div className='flex flex-col gap-8 pt-32 animate-translateRight w-full'>
									<div className='flex gap-6 relative'>
										<div className='flex flex-col gap-6 w-1/3 sticky top-0 h-fit'>
											<div className='flex flex-col gap-8 bg-white/10 p-8 rounded-xl'>
												<p className='text-3xl font-semibold'>{Localize('INTRODUCE')}</p>
												<div className='flex flex-col gap-4'>
													<Input required label='ARTIST_NAME' name='singerName' />
													<TextAreaField
														className='!bg-white !rounded-lg'
														classNameTextArea='!text-primary_dark'
														required
														label='ARTIST_DESCRIPTION'
														name='singerDescription'
													/>
												</div>
											</div>
											<div className='flex flex-col gap-8 bg-white/10 p-8 rounded-xl'>
												<p className='text-3xl font-semibold'>{Localize('SOCIAL')}</p>
												<div className='flex flex-col gap-4'>
													<Socials icon={<FaFacebookF />} name='facebook' text='FACEBOOK' />
													<Socials icon={<FaInstagram />} name='instagram' text='INSTAGRAM' />
												</div>
											</div>
										</div>
										<div className='w-2/3 bg-white/10 rounded-xl p-8 flex flex-col gap-8'>
											<p className='text-3xl font-semibold'>{Localize('GENRE')}</p>
											<GenresSelect name='genres' />
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
