import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { SoundFile } from "../models/sound-file";
import style from "./upload.module.css";

export interface UploadData {
	readonly soundFile: SoundFile;
	timestamp: number;
	name: string;
}

export interface UploadProps {
	readonly id: number;
	upload: UploadData;
	setUploadData(id: number, data: UploadData): void;
	onRemove(id: number): void;
}

export function Upload(props: UploadProps): ReactNode {
	const value = props.upload.timestamp;
	const min = 0;
	const [max, setMax] = useState(0);

	useEffect(() => {
		void props.upload.soundFile.getDuration().then(value => setMax(value));
	}, [props]);

	function onChangeName(event: ChangeEvent<HTMLInputElement>): void {
		props.setUploadData(props.id, {
			...props.upload,
			name: event.target.value,
		});
	}

	function onChangeValue(event: ChangeEvent<HTMLInputElement>): void {
		const value = parseFloat(event.target.value);

		if (
			Number.isNaN(value) ||
			value < min ||
			value > max ||
			value === props.upload.timestamp
		) {
			return;
		}

		props.setUploadData(props.id, {
			...props.upload,
			timestamp: value,
		});
	}

	return (
		<div className={style.container}>
			<input
				type="text"
				className={style.name}
				value={props.upload.name}
				onChange={onChangeName}
			/>
			<input
				type="range"
				className={style.slider}
				value={value}
				min={min}
				max={max}
				onChange={onChangeValue}
			/>
			<input
				type="number"
				className={style.timestamp}
				value={value}
				min={min}
				max={max}
				onChange={onChangeValue}
			/>
			<button onClick={() => props.onRemove(props.id)}>Remove</button>
		</div>
	);
}
