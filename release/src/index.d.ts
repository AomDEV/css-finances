import * as dataJson from "../banks.json";
import * as sharp from "sharp";
export type Icon = keyof typeof dataJson.th | (string & {});
export type Dataset = Record<Icon, {
    readonly code: string;
    readonly color: string;
    readonly official_name: string;
    readonly thai_name: string;
    readonly nice_name: string;
}>;
export declare function getDataset(): {
    bbl: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    kbank: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    rbs: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    ktb: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    jpm: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    mufg: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    tmb: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    scb: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    citi: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    smbc: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    sc: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    cimb: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    uob: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    bay: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    mega: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    boa: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    cacib: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    gsb: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    hsbc: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    db: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    ghb: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    baac: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    mb: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    bnp: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    tbank: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    ibank: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    tisco: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    kk: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    icbc: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    tcrb: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    lhb: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    tmn: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    pp: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
    ttb: {
        code: string;
        color: string;
        official_name: string;
        thai_name: string;
        nice_name: string;
    };
};
export declare class IconHelper {
    private constructor();
    static getFilePath(icon: Icon): string;
    static getRawBuffer(icon: Icon): Promise<Buffer>;
    static hasIcon(icon: Icon): boolean;
    static getBuffer(icon: Icon, options?: {
        readonly width?: number;
        readonly height?: number;
        readonly format?: keyof sharp.FormatEnum;
        readonly buffer?: Buffer;
    }): Promise<Buffer>;
}
