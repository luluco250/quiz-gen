import React, { ReactNode } from "react";
import style from "./footer.module.css";

export function Footer(): ReactNode {
	return (
		<footer className={style.footer}>
			<a href="https://github.com/luluco250">lucasm</a> - 2024
		</footer>
	);
}
