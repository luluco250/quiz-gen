import React, { ReactNode } from "react";
import style from "./navbar.module.css";

export function Navbar(): ReactNode {
	return (
		<nav className={style.navbar}>
			<div className={style.navbarContent}>
				<h3>Quiz Generator</h3>
			</div>
		</nav>
	);
}
