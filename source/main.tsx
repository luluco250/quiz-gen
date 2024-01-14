import "normalize.css";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/app";
import { AppProvider } from "./contexts/app";
import { MultiProvider } from "./contexts/multi";
import "./styles.css";
import { throwIfNullish } from "./utils/nullish";

const root = createRoot(
	throwIfNullish(document.getElementById("root"), "root"),
);

root.render(
	<StrictMode>
		<MultiProvider providers={[<AppProvider />]}>
			<App />
		</MultiProvider>
	</StrictMode>,
);
