import Cookies, { CookieSetOptions } from 'universal-cookie';
import config from '@/config/api.json';

export type IAuthService = {
	token?: string;
	expireAt: number;
	refreshAt: number;
};

export type IProfileUser = {
	email: string;
};

class AuthService {
	static setPackageAuth(auth: IAuthService, expireAt: number) {
		const cookie = new Cookies();
		const options: CookieSetOptions = {
			path: '/',
			expires: new Date(expireAt),
		};
		cookie.set(config.cookie.auth, auth, options);
	}
	static setPackageProfile(profile: IProfileUser, expireAt: number) {
		const cookie = new Cookies();
		const options: CookieSetOptions = {
			path: '/',
			expires: new Date(expireAt),
		};
		cookie.set(config.cookie.profile, profile, options);
	}
	static getPackageAuth() {
		const cookie = new Cookies();
		return cookie.get(config.cookie.auth);
	}

	static getPackageProfile() {
		const cookie = new Cookies();
		return cookie.get(config.cookie.profile);
	}
	static removeAll() {
		const cookie = new Cookies();

		cookie.remove(config.cookie.auth, { path: '/' });
		cookie.remove(config.cookie.profile, { path: '/' });
	}
}

export default AuthService;
