import React, { ReactNode } from "react";
import style from "./app.module.css";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { VideoEditor } from "./video-editor";
import { VideoPreview } from "./video-preview";

export function App(): ReactNode {
	return (
		<>
			<Navbar />
			<div className={style.page}>
				<VideoEditor className={style.editor} />
				<VideoPreview className={style.preview} />
			</div>
			<Footer />
		</>
	);
}
