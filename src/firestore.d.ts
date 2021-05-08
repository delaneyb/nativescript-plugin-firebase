export type DocumentData = { [field: string]: any };
export type WhereFilterOp =
  | "<"
  | "<="
  | "=="
  | ">="
  | ">"
  | "in"
  | "array-contains"
  | "array-contains-any";
export type OrderByDirection = "desc" | "asc";

export interface GeoPoint {
  longitude: number;
  latitude: number;
}

export interface Settings {
  /** The hostname to connect to. */
  host?: string;
  /** Whether to use SSL when connecting. */
  ssl?: boolean;

  /**
   * Specifies whether to use `Timestamp` objects for timestamp fields in
   * `DocumentSnapshot`s. This is enabled by default and should not be
   * disabled.
   *
   * Previously, Firestore returned timestamp fields as `Date` but `Date`
   * only supports millisecond precision, which leads to truncation and
   * causes unexpected behavior when using a timestamp from a snapshot as a
   * part of a subsequent query.
   *
   * So now Firestore returns `Timestamp` values instead of `Date`, avoiding
   * this kind of problem.
   *
   * To opt into the old behavior of returning `Date` objects, you can
   * temporarily set `timestampsInSnapshots` to false.
   *
   * @deprecated This setting will be removed in a future release. You should
   * update your code to expect `Timestamp` objects and stop using the
   * `timestampsInSnapshots` setting.
   */
  timestampsInSnapshots?: boolean;

  /**
   * An approximate cache size threshold for the on-disk data. If the cache grows beyond this
   * size, Firestore will start removing data that hasn't been recently used. The size is not a
   * guarantee that the cache will stay below that size, only that if the cache exceeds the given
   * size, cleanup will be attempted.
   *
   * The default value is 40 MB. The threshold must be set to at least 1 MB, and can be set to
   * CACHE_SIZE_UNLIMITED to disable garbage collection.
   */
  cacheSizeBytes?: number;
}

export interface SetOptions {
  merge?: boolean;
}

export interface SnapshotMetadata {
  /**
   * True if the snapshot contains the result of local writes (e.g. set() or
   * update() calls) that have not yet been committed to the backend.
   * If your listener has opted into metadata updates (via
   * `DocumentListenOptions` or `QueryListenOptions`) you will receive another
   * snapshot with `hasPendingWrites` equal to false once the writes have been
   * committed to the backend.
   */
  readonly hasPendingWrites: boolean;

  /**
   * True if the snapshot was created from cached data rather than
   * guaranteed up-to-date server data. If your listener has opted into
   * metadata updates (via `DocumentListenOptions` or `QueryListenOptions`)
   * you will receive another snapshot with `fromCache` equal to false once
   * the client has received up-to-date data from the backend.
   */
  readonly fromCache: boolean;
}

export interface DocumentSnapshot {
  ios?: any;
  /* FIRDocumentSnapshot */
  android?: any;
  /* com.google.firebase.firestore.DocumentSnapshot */
  id: string;
  exists: boolean;
  ref: DocumentReference;

  /**
   * Included when includeMetadataChanges is true.
   */
  readonly metadata?: SnapshotMetadata;

  data(): DocumentData;
}

export interface SnapshotListenOptions {
  /**
   * Include a change even if only the metadata of the query or of a document changed.
   * Default false.
   */
  readonly includeMetadataChanges?: boolean;
}

export interface GetOptions {
  /**
   * Describes whether we should get from server or cache.
   *
   * Setting to 'default' (or not setting at all), causes Firestore to try to
   * retrieve an up-to-date (server-retrieved) snapshot, but fall back to
   * returning cached data if the server can't be reached.
   *
   * Setting to 'server' causes Firestore to avoid the cache, generating an
   * error if the server cannot be reached. Note that the cache will still be
   * updated if the server request succeeds. Also note that latency-compensation
   * still takes effect, so any pending write operations will be visible in the
   * returned data (merged into the server-provided data).
   *
   * Setting to 'cache' causes Firestore to immediately return a value from the
   * cache, ignoring the server completely (implying that the returned value
   * may be stale with respect to the value on the server.) If there is no data
   * in the cache to satisfy the `get()` call, `DocumentReference.get()` will
   * return an error and `QuerySnapshot.get()` will return an empty
   * `QuerySnapshot` with no documents.
   */
  source?: "default" | "server" | "cache";
}

export interface DocumentReference {
  readonly discriminator: "docRef";

  readonly id: string;

  /**
   * A reference to the Collection to which this DocumentReference belongs.
   */
  readonly parent: CollectionReference;

  readonly path: string;

  readonly firestore: any;

  collection: (collectionPath: string) => CollectionReference;

  set: (document: any, options?: SetOptions) => Promise<void>;

  get: (options?: GetOptions) => Promise<DocumentSnapshot>;

  update: (document: any) => Promise<void>;

  delete: () => Promise<void>;

  onSnapshot(
    optionsOrCallback:
      | SnapshotListenOptions
      | ((snapshot: DocumentSnapshot) => void),
    callbackOrOnError?: (snapshot: DocumentSnapshot | Error) => void,
    onError?: (error: Error) => void
  ): () => void;

  android?: any;

  ios?: any;
}

export interface Query {
  readonly firestore: any;

  get(options?: GetOptions): Promise<QuerySnapshot>;

  where(fieldPath: string | firebase.firestore.FieldPath, opStr: WhereFilterOp, value: any): Query;

  orderBy(
    fieldPath: string,
    directionStr: OrderByDirection
  ): Query;

  limit(limit: number): Query;

  onSnapshot(
    optionsOrCallback:
      | SnapshotListenOptions
      | ((snapshot: QuerySnapshot) => void),
    callbackOrOnError?: (snapshotOrError: QuerySnapshot | Error) => void,
    onError?: (error: Error) => void
  ): () => void;

  startAt(snapshot: DocumentSnapshot): Query;

  startAt(...fieldValues: any[]): Query;

  startAfter(snapshot: DocumentSnapshot): Query;

  startAfter(...fieldValues: any[]): Query;

  endAt(snapshot: DocumentSnapshot): Query;

  endAt(...fieldValues: any[]): Query;

  endBefore(snapshot: DocumentSnapshot): Query;

  endBefore(...fieldValues: any[]): Query;

  ios?: FIRQuery;

  android?: com.google.firebase.firestore.Query;

  isEqual(other: any): boolean;
}

export interface CollectionGroup {
  where(fieldPath: string | firebase.firestore.FieldPath, opStr: WhereFilterOp, value: any): Query;
}

export interface CollectionReference extends Query {
  readonly id: string;

  /**
   * A reference to the containing Document if this is a subcollection, else null.
   */
  readonly parent: DocumentReference | null;

  doc(documentPath?: string): DocumentReference;

  add(data: DocumentData): Promise<DocumentReference>;
}

export type UpdateData = { [fieldPath: string]: any };


export interface Transaction {
  get(documentRef: DocumentReference): DocumentSnapshot;

  set(
    documentRef: DocumentReference,
    data: DocumentData,
    options?: SetOptions
  ): Transaction;

  update(documentRef: DocumentReference, data: UpdateData): Transaction;

  // update(
  //   documentRef: DocumentReference,
  //   field: string | firebase.firestore.FieldPath,
  //   value: any,
  //   ...moreFieldsAndValues: any[]
  // ): Transaction;

  delete(documentRef: DocumentReference): Transaction;
}

export interface WriteBatch {
  set(
    documentRef: DocumentReference,
    data: DocumentData,
    options?: SetOptions
  ): WriteBatch;

  update(documentRef: DocumentReference, data: UpdateData): WriteBatch;

  // update(
  //   documentRef: DocumentReference,
  //   field: string | firebase.firestore.FieldPath,
  //   value: any,
  //   ...moreFieldsAndValues: any[]
  // ): WriteBatch;

  delete(documentRef: DocumentReference): WriteBatch;

  commit(): Promise<void>;
}

export type FieldValueType = "ARRAY_UNION" | "ARRAY_REMOVE" | "INCREMENT";


export interface SnapshotListenOptions {
  readonly includeMetadataChanges?: boolean;
}

export interface SnapshotOptions {
  /**
   * If set, controls the return value for server timestamps that have not yet
   * been set to their final value.
   *
   * By specifying 'estimate', pending server timestamps return an estimate
   * based on the local clock. This estimate will differ from the final value
   * and cause these values to change once the server result becomes available.
   *
   * By specifying 'previous', pending timestamps will be ignored and return
   * their previous value instead.
   *
   * If omitted or set to 'none', `null` will be returned by default until the
   * server value becomes available.
   */
  readonly serverTimestamps?: "estimate" | "previous" | "none";
}

export interface QueryDocumentSnapshot extends DocumentSnapshot {
  /**
   * Retrieves all fields in the document as an Object.
   *
   * By default, `FieldValue.serverTimestamp()` values that have not yet been
   * set to their final value will be returned as `null`. You can override
   * this by passing an options object.
   *
   * @override
   * @param options An options object to configure how data is retrieved from
   * the snapshot (e.g. the desired behavior for server timestamps that have
   * not yet been set to their final value).
   * @return An Object containing all fields in the document.
   */
  data(options?: SnapshotOptions): DocumentData;
}

export type DocumentChangeType = "added" | "removed" | "modified";

export interface DocumentChange {
  readonly type: DocumentChangeType;

  /** The document affected by this change. */
  readonly doc: QueryDocumentSnapshot;

  /**
   * The index of the changed document in the result set immediately prior to
   * this DocumentChange (i.e. supposing that all prior DocumentChange objects
   * have been applied). Is -1 for 'added' events.
   */
  readonly oldIndex: number;

  /**
   * The index of the changed document in the result set immediately after
   * this DocumentChange (i.e. supposing that all prior DocumentChange
   * objects and the current DocumentChange object have been applied).
   * Is -1 for 'removed' events.
   */
  readonly newIndex: number;
}

export interface QuerySnapshot {
  docSnapshots: DocumentSnapshot[];
  docs: QueryDocumentSnapshot[];

  /**
   * Included when includeMetadataChanges is true.
   */
  readonly metadata: SnapshotMetadata;

  docChanges(options?: SnapshotListenOptions): DocumentChange[];

  forEach(
    callback: (result: DocumentSnapshot) => void,
    thisArg?: any
  ): void;
}
