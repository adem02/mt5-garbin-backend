export interface ApiInfo {
    name: string;
    version: string;
    description: string;
    hostname?: string;
    platform?: string;
    type?: string;
}

export type ApiInfoResponse = Readonly<ApiInfo>;
