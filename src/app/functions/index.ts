import { firebase, firebaseFunctions as fNamespace } from "../../firebase";

export namespace functions {
  // tslint:disable-next-line:class-name
  export class Functions {
    httpsCallable<I, O>(functionName: string, region?: fNamespace.SupportedRegions) {
      return firebase.functions.httpsCallable<I, O>(functionName, region);
    }
  }
}