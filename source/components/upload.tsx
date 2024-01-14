import React, {
	ChangeEvent,
	ReactNode,
	useCallback,
	useEffect,
	useState,
} from "react";
import { UploadData } from "../models/upload-data";
import style from "./upload.module.css";

export interface UploadProps {
	readonly index: number;
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

	const onChangeName = useCallback(
		(event: ChangeEvent<HTMLInputElement>): void => {
			props.setUploadData(props.index, {
				...props.upload,
				name: event.target.value,
			});
		},
		[props.index, props.upload, props.setUploadData],
	);

	const onChangeValue = useCallback(
		(event: ChangeEvent<HTMLInputElement>): void => {
			const value = parseFloat(event.target.value);

			if (
				Number.isNaN(value) ||
				value < min ||
				value > max ||
				value === props.upload.timestamp
			) {
				return;
			}

			props.setUploadData(props.index, {
				...props.upload,
				timestamp: value,
			});
		},
		[props.upload, props.index, props.setUploadData, max],
	);

	const onRemove = useCallback(
		(): void => props.onRemove(props.index),
		[props.index, props.onRemove],
	);

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
			<button type="button" onClick={onRemove}>
				Remove
			</button>
		</div>
	);
}
