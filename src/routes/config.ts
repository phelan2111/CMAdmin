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
		CREATE: '/account/create',
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
	MUSIC: {
		_: '/music',
		ARTIST: {
			_: '/music/artist',
			CREATE: '/music/artist/create',
			DETAILS: '/music/artist/:artistId',
		},
		SONG: {
			_: '/music/song',
			CREATE: '/music/song/create',
			DETAILS: '/music/song/:songId',
		},
		PLAYLIST: {
			_: "/music/playlist",
			CREATE: "/music/playlist/create"

		}
	},
};
