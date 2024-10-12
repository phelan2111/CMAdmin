export type ResponseHasNotResponseProps = {
	onSuccess: VoidFunction;
	onError: VoidFunction;
};

export type ResponseHasResponseProps = {
	onSuccess?: (res: unknown) => void;
	onError?: VoidFunction;
};
