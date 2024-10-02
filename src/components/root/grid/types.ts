import { ReactNode } from 'react';
export type ItemData = {
	[name: string]: unknown;
};
export type GridProps = {
	gridColum: GridColumn<never>[];
	data: ItemData[];
	total: number;
	onChangePaging?: (dataPaging: PagingState) => void;
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
