export type ResponseHasNotResponseProps = {
	onSuccess: VoidFunction;
	onError: VoidFunction;
};

export type ResponseHasResponseProps = {
	onSuccess: (res: unknown) => void;
	[name: string]: (res?: never) => void;
};

export type PayloadRequestList = {
	from: number;
	limit?: number;
	search?: string;
	[name: string]: unknown;
};

export type ResponseRequest<T> = {
	list: T[];
	total: number;
};

export const initialResponseRequest: ResponseRequest<unknown> = {
	list: [],
	total: 0,
};

export type ResponseUpload = {
	link: string;
	name: string;
	createAt: number;
	duration?: number;
};