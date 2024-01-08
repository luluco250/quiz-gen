import "normalize.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/app";
import "./styles.css";
import { throwIfNullish } from "./utils/nullish";

const root = createRoot(
	throwIfNullish(document.getElementById("root"), "root"),
);
root.render(<App />);