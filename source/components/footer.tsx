import React, { ReactNode } from "react";
import { footer } from "./footer.module.css";

export function Footer(): ReactNode {
	return (
		<footer className={footer}>
			<a href="https://github.com/luluco250">lucasm</a> - 2024
		</footer>
	);
}
