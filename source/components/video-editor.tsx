import React, {
	ChangeEvent,
	ReactNode,
	useCallback,
	useContext,
	useRef,
	useState,
} from "react";
import { AppContext } from "../contexts/app";
import { SoundFile } from "../models/sound-file";
import { UploadData } from "../models/upload-data";
import { assertNotNullish } from "../utils/assert";
import { Upload } from "./upload";
import style from "./video-editor.module.css";

export interface VideoEditorProps {
	className?: string;
	files?: UploadData[];
}

export function VideoEditor(props: VideoEditorProps): ReactNode {
	const [files, setFiles] = useState(props.files ?? []);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const appContext = useContext(AppContext);

	const onAddFile = useCallback(
		(event: ChangeEvent<HTMLInputElement>): void => {
			async function addFiles(uploadedFiles: FileList): Promise<void> {
				const addedFiles: UploadData[] = [];
				for (const file of uploadedFiles) {
					addedFiles.push(new UploadData(await SoundFile.fromFile(file)));
				}
				setFiles([...files, ...addedFiles]);
			}

			assertNotNullish(event.target.files, "files");
			void addFiles(event.target.files);
		},
		[files],
	);

	const setUploadData = useCallback(
		(index: number, value: UploadData): void => {
			const newFiles = [...files];
			newFiles[index] = value;
			setFiles(newFiles);
		},
		[files],
	);

	const onRemoveFile = useCallback(
		(index: number): void => {
			const newFiles = [...files];
			const toRemove = newFiles.splice(index)[0];
			toRemove.soundFile.dispose();
			setFiles(newFiles);
		},
		[files],
	);

	const onRender = useCallback((): void => {}, []);

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
				<button type="button" onClick={onRender}>
					Render
				</button>
				<button type="button" onClick={() => fileInputRef.current?.click()}>
					Add Song
				</button>
			</div>
			<ol className={style.entryList}>
				{files.map((file, index) => (
					<Upload
						key={file.id}
						index={index}
						upload={file}
						setUploadData={setUploadData}
						onRemove={onRemoveFile}
					/>
				))}
			</ol>
		</div>
	);
}
