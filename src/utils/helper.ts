import dayjs from 'dayjs';
import { v4 as uuuid } from 'uuid';
import bcrypt from 'bcryptjs';

export class Helper {
	static formatNumber(number: number) {
		const numberConvert = new Intl.NumberFormat('en-IN', {
			maximumSignificantDigits: 10,
		}).format(number);

		return numberConvert;
	}
	static isEmpty(value: unknown): boolean {
		return (
			value === undefined ||
			value === null ||
			value === undefined ||
			value === '' ||
			(Object.keys(value).length === 0 && Object.getPrototypeOf(value) === Object.prototype) ||
			(Array.isArray(value) && value.length === 0)
		);
	}
	static isIntoView(el: Element) {
		const rect = el.getBoundingClientRect();
		const innerHeight = window.innerHeight;
		if (rect.bottom <= innerHeight) {
			return true;
		}
		return false;
	}
	static isYesterday(millisecond: number) {
		const isYesterday = dayjs().add(-1, 'day').isSame(dayjs(millisecond), 'day');

		return isYesterday;
	}
	static isToday(millisecond: number) {
		const isToday = dayjs().isSame(dayjs(millisecond), 'day');

		return isToday;
	}
	static randomKey(): string {
		return uuuid();
	}
	static compareItem(
		dataItem: {
			[name: string]: unknown;
		},
		field: string,
		itemCompare: string | number,
	) {
		const isEqual = dataItem?.[field] === itemCompare;
		return { isEqual };
	}
	static async hasPassword(password: string) {
		const hasPassword = bcrypt.hash(password, 10);
		return hasPassword;
	}
}
