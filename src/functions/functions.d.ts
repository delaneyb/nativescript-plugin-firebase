import { functionsRegions } from "./";

export type SupportedRegions = typeof functionsRegions[number]

export type HttpsCallable<I, O> = (callableData: I) => Promise<O>;

export declare function httpsCallable<I = {}, O = {}>(functionName: string, region?: SupportedRegions): HttpsCallable<I, O>;

export declare function useFunctionsEmulator(origin: string): void;