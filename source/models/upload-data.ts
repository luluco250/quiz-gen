import { SoundFile } from "./sound-file";

export class UploadData {
	public readonly id: string = crypto.randomUUID();
	public timestamp = 0;
	public name: string;

	public constructor(public readonly soundFile: SoundFile) {
		this.name = soundFile.filename.replace(/\..*$/, "");
	}
}
