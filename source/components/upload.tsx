import React, { ChangeEvent, ReactNode } from "react";
import { SoundFile } from "../models/sound-file";
import { slider, timestamp } from "./upload.module.css";

export interface UploadData {
	readonly soundFile: SoundFile;
	timestamp: number;
}

export interface UploadProps {
	readonly id: number;
	upload: UploadData;
	onSetTimestamp(id: number, value: number): void;
	onRemove(id: number): void;
}

export function Upload(props: UploadProps): ReactNode {
	const value = props.upload.timestamp;
	const min = 0;
	const max = props.upload.soundFile.duration;

	function onChangeValue(event: ChangeEvent<HTMLInputElement>): void {
		props.onSetTimestamp(props.id, parseFloat(event.target.value));
	}

	return (
		<div>
			{props.upload.soundFile.filename}
			<input
				type="range"
				className={slider}
				value={value}
				min={min}
				max={max}
				onChange={onChangeValue}
			/>
			<input
				type="number"
				className={timestamp}
				value={value}
				min={min}
				max={max}
				onChange={onChangeValue}
			/>
			<button onClick={() => props.onRemove(props.id)}>Remove</button>
		</div>
	);
}
