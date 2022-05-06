/**
 * Amount of storage deposited/unlocked.
 *
 * https://nomicon.io/Standards/StorageManagement
 */
export interface StorageBalance<V = string> {
  total: V;
  available: V;
}

/**
 * https://nomicon.io/Standards/StorageManagement
 */
export interface StorageBalanceBounds<V = string> {
  min: V;
  max: V;
}
