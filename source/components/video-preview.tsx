import React, { ReactNode } from "react";
import { videoPreview } from "./video-preview.module.css";

export interface VideoPreviewProps {
	className?: string;
}

export function VideoPreview(props: VideoPreviewProps): ReactNode {
	return (
		<video className={[props.className, videoPreview].join(" ")} controls />
	);
}
