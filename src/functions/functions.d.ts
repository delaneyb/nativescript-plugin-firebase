export type SupportedRegions =
    | "us-central1"
    | "us-east1"
    | "us-east4"
    | "europe-west1"
    | "europe-west2"
    | "asia-east2"
    | "asia-northeast1"
    | "australia-southeast1";

export type HttpsCallable<I, O> = (callableData: I) => Promise<O>;

export declare function httpsCallable<I = {}, O = {}>(functionName: string, region?: SupportedRegions): HttpsCallable<I, O>;

export declare function useFunctionsEmulator(origin: string): void;