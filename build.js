import esbuild from "esbuild";
import process from "process";

/** @type {import("esbuild").BuildOptions} */
const esbuildOptions = {
	entryPoints: ["./source/main.tsx"],
	minify: true,
	outdir: "./build/",
	bundle: true,
	logLevel: "debug",
	format: "esm",
	sourcemap: false,
	target: ["es2022"],
	platform: "browser",
	treeShaking: true,
};

switch (process.argv[2]) {
	case "serve": {
		const context = await esbuild.context({
			...esbuildOptions,
			minify: false,
			treeShaking: false,
			sourcemap: true,
		});
		await context.serve({
			servedir: ".",
		});
		break;
	}
	case "build":
	default:
		await esbuild.build(esbuildOptions);
		break;
}
