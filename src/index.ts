import { join } from "path";
import * as dataJson from "../banks.json";
import { readFile } from "fs/promises";
import * as sharp from "sharp";

export type Icon = keyof typeof dataJson.th | (string & {});
export type Dataset = Record<Icon, {
    readonly code: string;
    readonly color: string;
    readonly official_name: string;
    readonly thai_name: string;
    readonly nice_name: string;
}>;
export function getDataset() {
    return dataJson.th;
}
export class IconHelper {
    private constructor() { }

    public static getFilePath(icon: Icon) {
        return join(__dirname, "svg", `${String(icon)}.svg`);
    }

    public static getRawBuffer(icon: Icon) {
        if (!this.hasIcon(icon)) return null;
        return readFile(this.getFilePath(icon))
    }

    public static hasIcon (icon: Icon) {
        const keys = Object.keys(getDataset());
        if (!keys.find(key => key === icon)) return false;
        return true;
    }

    public static async getBuffer(icon: Icon, options?: {
        readonly width?: number;
        readonly height?: number;
        readonly format?: keyof sharp.FormatEnum;
    }) {
        if (!this.hasIcon(icon)) return null;

        const width = Number(options?.width || 256)
        const height = Number(options?.height || 256)

        const svgRawBuffer = await this.getRawBuffer(icon);
        const iconBuffer = await sharp(svgRawBuffer).resize(Number(width / 2)).toBuffer();
        const canvas = sharp({
            create: {
                width,
                height,
                channels: 4,
                background: getDataset()[icon].color
            }
        });
        canvas.composite([{
            input: iconBuffer,
            blend: "over",
        }])

        return canvas.toFormat(options?.format || "png").toBuffer();
    }
}