import { ReactNode } from 'react';
export type ItemData = {
	[name: string]: unknown;
};
export type GridProps = {
	gridColum: GridColumn<never>[];
	data: ItemData[];
	total: number;
	isLoading?: boolean;
	onChangePaging?: (dataPaging: PagingState) => void;
	onClickRow?: (dataItem: never) => void;
};
export type HeadersGird = {
	title: string;
	index: number;
};
export type CellGird<T> = {
	indexDataItem: number;
	dataItem: T;
	field: string;
};
export type GridColumn<T> = {
	headers?: (dataHeaders: HeadersGird) => ReactNode;
	classHeaders?: string;
	title: string;
	cell?: (dataItem: CellGird<T>) => ReactNode;
	field: string;
};
export type PagingState = {
	take: number;
	skip: number;
};

export type TableProps<T> = {
	total: number;
	data: T[];
	isLoading?: boolean;
	onClickRow: (dataItem: T) => void;
	onChangePaging?: (dataPaging: PagingState) => void;
};