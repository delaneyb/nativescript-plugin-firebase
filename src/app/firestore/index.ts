import { firebase, firestore as fStore } from "../../firebase";
// import * as firebaseSdk from 'firebase/app';

export namespace firestore {
  export class Firestore /*implements firebaseSdk.firestore.Firestore*/ {
    collection(collectionPath: string): fStore.CollectionReference {
      return firebase.firestore.collection(collectionPath);
    }

    collectionGroup(id: string): fStore.CollectionGroup {
      return firebase.firestore.collectionGroup(id);
    }

    doc(path: string): fStore.DocumentReference {
      return firebase.firestore.docRef(path);
    }

    FieldValue(): firebase.firestore.FieldValue {
      return <any>{
        type: undefined,
        value: undefined,
        serverTimestamp: () => "SERVER_TIMESTAMP",
        delete: () => "DELETE_FIELD",
        arrayUnion: (...elements: any[]) => new firebase.firestore.FieldValue("ARRAY_UNION", elements),
        arrayRemove: (...elements: any[]) => new firebase.firestore.FieldValue("ARRAY_REMOVE", elements),
        increment: (n: number) => new firebase.firestore.FieldValue("INCREMENT", n)
      };
    }

    GeoPoint(latitude: number, longitude: number): fStore.GeoPoint {
      return firebase.firestore.GeoPoint(latitude, longitude);
    }

    runTransaction<T>(updateFunction: (transaction: fStore.Transaction) => Promise<any>): Promise<void> {
      return firebase.firestore.runTransaction(updateFunction);
    }

    batch(): fStore.WriteBatch {
      return firebase.firestore.batch();
    }

    settings(settings: fStore.Settings): void {
      firebase.firestore.settings(settings);
    }

    clearPersistence(): Promise<void> {
      return firebase.firestore.clearPersistence();
    }
  }
}
