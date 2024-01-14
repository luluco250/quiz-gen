import React, { ReactNode, createContext } from "react";
import { UploadData } from "../models/upload-data";

export class AppContextImpl {
	private _files: UploadData[] = [];

	public addFiles(files: File[]): void {}

	public removeFile(index: number): void {}

	public get files(): UploadData[] {
		return this._files;
	}
}

export const AppContext = createContext(new AppContextImpl());

export function AppProvider(props: { children: ReactNode }): ReactNode {
	return (
		<AppContext.Provider value={new AppContextImpl()}>
			{props.children}
		</AppContext.Provider>
	);
}
