import Upload from '@/components/root/upload/normal';
import DefaultUpload from '@/components/ui/upload/default/normal';
import RenderUpload from '@/components/ui/upload/render/normal';

function UploadBrowse() {
	return (
		<Upload
			renderDefault={(renderProps) => {
				return <DefaultUpload {...renderProps} />;
			}}
			label='IMAGE_GENRE'
			required
			renderUpload={(renderProps) => {
				return <RenderUpload {...renderProps} />;
			}}
			name='imageGenre'
		/>
	);
}

export default UploadBrowse;
