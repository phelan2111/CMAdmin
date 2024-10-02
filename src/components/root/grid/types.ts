import { ReactNode } from "react"

export type Grid  = {
    gridColum: GridColumn<unknown>[];
}
export type HeadersGird = {
    title: string;
    index: number;
}
export type CellGird<T>  = {
    indexDataItem: number;
    dataItem: T;
    field: string;
}
export type GridColumn<T> = {
    headers?: (dataHeaders: HeadersGird) => ReactNode;
    classHeaders: string;
    title: string;
    cell?: (dataItem: CellGird<T>) => ReactNode;
    field: string;
}