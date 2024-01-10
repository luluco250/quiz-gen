import React, { ChangeEvent, ReactNode, useRef, useState } from "react";
import { SoundFile } from "../models/sound-file";
import { assertNotNullish } from "../utils/assert";
import { Upload, UploadData } from "./upload";
import style from "./video-editor.module.css";

export interface VideoEditorProps {
	className?: string;
	files?: UploadData[];
}

export function VideoEditor(props: VideoEditorProps): ReactNode {
	const [files, setFiles] = useState(props.files ?? []);
	const fileInputRef = useRef<HTMLInputElement>(null);

	async function onAddFile(
		event: ChangeEvent<HTMLInputElement>,
	): Promise<void> {
		assertNotNullish(event.target.files, "files");

		const addedFiles: UploadData[] = [];

		for (const file of event.target.files) {
			const soundFile = await SoundFile.fromFile(file);
			addedFiles.push({
				soundFile,
				timestamp: 0,
				name: file.name.replace(/\..*$/, ""),
			});
		}

		setFiles([...files, ...addedFiles]);
	}

	function setUploadData(index: number, value: UploadData): void {
		const newFiles = [...files];
		newFiles[index] = value;
		setFiles(newFiles);
	}

	function onRemoveFile(index: number): void {
		const newFiles = [...files];
		const toRemove = newFiles.splice(index)[0];
		toRemove.soundFile.dispose();
		setFiles(newFiles);
	}

	async function onRender(): Promise<void> {}

	return (
		<div className={props.className}>
			<input
				ref={fileInputRef}
				type="file"
				onChange={e => void onAddFile(e)}
				accept="audio/*"
				multiple
				hidden
			/>
			<div className={style.buttonRow}>
				<button onClick={() => void onRender()}>Render</button>
				<button onClick={() => fileInputRef.current?.click()}>Add Song</button>
			</div>
			<ol className={style.entryList}>
				{files.map((file, index) => (
					<Upload
						key={index}
						id={index}
						upload={file}
						setUploadData={setUploadData}
						onRemove={onRemoveFile}
					/>
				))}
			</ol>
		</div>
	);
}
