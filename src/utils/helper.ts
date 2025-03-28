import dayjs from 'dayjs';
import { v4 as uuuid } from 'uuid';
import bcrypt from 'bcryptjs';

type ObjectType = Record<string, unknown>;

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
	static findItem(dataItem: Array<Record<string, unknown>>, field: string, data: string | number) {
		const index = dataItem.findIndex((item) => (item?.[field] as string) === data);
		const isExist = index !== -1;
		return { isExist, index };
	}
	static cleanObject(obj: ObjectType) {
		for (const propName in obj) {
			if (Helper.isEmpty(obj[propName])) {
				delete obj[propName];
			}
		}
		return obj;
	}

	static convertTime(duration: number) {
		const minus = Math.floor(duration / 60);
		const second = duration - minus * 60;
		const hours = Math.floor(duration / 3600);

		return {
			minus: minus.toFixed(0),
			second: second.toFixed(0),
			hours: hours.toFixed(0),
		};
	}
}
