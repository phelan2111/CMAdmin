import Controller from './controller';
import LoadingModal from '@/components/root/loading/modal';
import LoaderScreen from '@/components/ui/loader/screen';
import { useModal, useToast } from '@/hooks/useContext';
import { ToastType } from '@/contexts/toast';
import { ResponseGetArtistDetails } from '@/services/artist/getDetails';
import ServiceUpdateInformationArtist from '@/services/artist/updateInformation';
export type UpdateInformationProps = {
	details: ResponseGetArtistDetails;
	title: string;
	content: string;
	onSuccess: VoidFunction;
};

function UpdateInformationSocials(props: UpdateInformationProps) {
	const { onCloseModal } = useModal();
	const { onToast } = useToast();

	const { isLoadingUpdateArtistService, onUpdateArtist } = ServiceUpdateInformationArtist({
		onSuccess: () => {
			onCloseModal();
			onToast({ theme: ToastType.success, label: 'UPDATE_INTRODUCE_ACCOUNT', content: 'UPDATE_INTRODUCE_ACCOUNT_SUCCESSFUL' });
			props.onSuccess();
		},
		onSystemError: () => {
			onToast({ theme: ToastType.error, label: 'SYSTEM_ERROR', content: 'SOMETHING_WERE_WRONG' });
		},
	});

	return (
		<LoadingModal loading={isLoadingUpdateArtistService} loader={<LoaderScreen />}>
			<Controller onUpdateArtist={onUpdateArtist} {...props} />;
		</LoadingModal>
	);
}

export default UpdateInformationSocials;
