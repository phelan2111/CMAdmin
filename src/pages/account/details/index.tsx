import Controller from './controller';
import { useParams } from 'react-router-dom';
import ServiceUserDetails from '@/services/user/getDetails';

function AccountDetails() {
	const params = useParams();

	const { isLoadingUserDetailsService, onUserDetails, response } = ServiceUserDetails();

	return <Controller isLoading={isLoadingUserDetailsService} userId={params.userId as string} userDetails={response} onGetTopicDetails={onUserDetails} />;
}

export default AccountDetails;
