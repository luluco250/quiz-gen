export class SoundFile {
	private readonly _audio: HTMLAudioElement;
	private readonly _filename: string;

	public constructor(audio: HTMLAudioElement, filename: string) {
		this._audio = audio;
		this._filename = filename;
	}

	public static async fromFile(file: File): Promise<SoundFile> {
		return await new Promise<SoundFile>((resolve, reject) => {
			const audio = document.createElement("audio");
			const fileReader = new FileReader();
			fileReader.onload = (): void => {
				const result = fileReader.result;

				if (typeof result !== "string") {
					reject("Failed to read file to data url");
					return;
				}

				audio.src = result;
				resolve(new SoundFile(audio, file.name));
			};
			fileReader.readAsDataURL(file);
		});
	}

	public dispose(): void {
		const url = this.dataUrl;
		this._audio.remove();
		URL.revokeObjectURL(url);
	}

	public async getDuration(): Promise<number> {
		const duration = this._audio.duration;

		if (!Number.isNaN(duration)) {
			return duration;
		}

		return await new Promise<number>(resolve => {
			this._audio.ondurationchange = (): void => {
				this._audio.ondurationchange = null;
				resolve(this._audio.duration);
			};
		});
	}

	public get dataUrl(): string {
		return this._audio.src;
	}

	public get filename(): string {
		return this._filename;
	}
}
