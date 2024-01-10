import React, { ReactNode } from "react";
import style from "./video-preview.module.css";

export interface VideoPreviewProps {
	className?: string;
	video?: string;
}

export function VideoPreview(props: VideoPreviewProps): ReactNode {
	return (
		<div className={`${props.className} ${style.container}`}>
			<video className={style.videoPreview} width={0} height={0} controls>
				<source src={props.video} type="video/mp4" />
			</video>
		</div>
	);
}
