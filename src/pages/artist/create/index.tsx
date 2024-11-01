import ServiceCreateSinger, { ResponseCreate } from '@/services/artist/create';
import Controller from './controller';
import LoadingModal from '@/components/root/loading/modal';
import LoaderScreen from '@/components/ui/loader/screen';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';

function CreateBrowse() {
	const { redirectPage } = useRedirect();
	const { onCreateSinger, isLoadingCreateSingerService } = ServiceCreateSinger({
		onSuccess: (res) => {
			const dataItem = res as ResponseCreate;
			redirectPage(`${PATH.ARTIST._}/${dataItem.singerId}`);
		},
	});

	return (
		<LoadingModal loading={isLoadingCreateSingerService} loader={<LoaderScreen />}>
			<Controller onCreateSinger={onCreateSinger} />
		</LoadingModal>
	);
}

export default CreateBrowse;