export const PATH = {
	KYC: {
		_: 'kyc',
		SIGN_IN: '/kyc/signIn',
		SIGN_UP: '/kyc/signUp',
	},
	HOME: '/',
	PRIVATE: '/private',
	DASHBOARD: '/dashboard',
	ACCOUNT: {
		_: '/account',
		DETAILS: '/account/:userId',
	},
	BROWSE: {
		_: '/browse',
		CREATE: '/browse/create',
		GENRE: {
			_: '/browse/genre',
			CREATE: '/browse/genre/create',
			DETAILS: '/browse/genre/:genreId',
		},
		TOPIC: {
			_: '/browse/topic',
			CREATE: '/browse/topic/create',
			DETAILS: '/browse/topic/:topicId',
		},
	},
	ARTIST: {
		_: '/artist',
		CREATE: '/artist/create',
	},
};
