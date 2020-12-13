import { functions } from "../firebase";

export declare type HttpsCallable<I, O> = (callableData: I) => Promise<O>;

export declare function httpsCallable<I = {}, O = {}>(functionName: string, region?: functions.SupportedRegions): HttpsCallable<I, O>;

export declare function useFunctionsEmulator(origin: string): void;