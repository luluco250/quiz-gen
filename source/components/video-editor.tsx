import React, { ChangeEvent, useState } from "react";
import { SoundFile } from "../models/sound-file";
import { assertNotNullish } from "../utils/assert";
import { Upload, UploadData } from "./upload";

export interface VideoEditorProps {
	files?: UploadData[];
}

export function VideoEditor(props: VideoEditorProps) {
	const [files, setFiles] = useState(props.files ?? []);

	async function onAddFile(event: ChangeEvent<HTMLInputElement>) {
		assertNotNullish(event.target.files, "files");

		const addedFiles: UploadData[] = [];

		for (const file of event.target.files) {
			const soundFile = await SoundFile.fromFile(file);
			addedFiles.push({
				soundFile,
				timestamp: 0,
			});
		}

		setFiles([...files, ...addedFiles]);
	}

	function onSetTimestamp(index: number, value: number) {
		const newFiles = [...files];
		const file = newFiles[index];

		if (
			value < 0 ||
			value > file.soundFile.duration ||
			value === file.timestamp
		) {
			return;
		}

		file.timestamp = value;
		setFiles(newFiles);
	}

	function onRemoveFile(index: number) {
		const newFiles = [...files];
		const toRemove = newFiles.splice(index)[0];
		toRemove.soundFile.dispose();
		setFiles(newFiles);
	}

	return (
		<>
			<input type="file" onChange={onAddFile} multiple />
			<ol>
				{files.map((file, index) => (
					<Upload
						key={index}
						id={index}
						upload={file}
						onSetTimestamp={onSetTimestamp}
						onRemove={onRemoveFile}
					/>
				))}
			</ol>
		</>
	);
}
