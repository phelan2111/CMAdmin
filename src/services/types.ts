export type ResponseHasNotResponseProps = {
	onSuccess: VoidFunction;
	onError: VoidFunction;
};

export type ResponseHasResponseProps = {
	[name: string]: (res?: unknown) => void;
};

export type ResponseRequest<T> = {
	list: T[];
	total: number;
};

export const initialResponseRequest: ResponseRequest<unknown> = {
	list: [],
	total: 0,
};