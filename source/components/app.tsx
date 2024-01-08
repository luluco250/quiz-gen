import React from "react";
import { footer, page } from "./app.module.css";
import { VideoEditor } from "./video-editor";

export const App = () => (
	<>
		<div className={page}>
			{/* <VideoPreview /> */}
			<VideoEditor />
		</div>
		<footer className={footer}>
			<a href="https://github.com/luluco250">lucasm</a> - 2024
		</footer>
	</>
);
