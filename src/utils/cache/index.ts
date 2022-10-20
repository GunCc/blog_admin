import {
  DEFAULT_CACHE_TIME,
  enableStorageEncryption,
} from "@/settings/encryptionSetting";
import { getStorageShortName } from "../env";
import { createStorage as create, createStorageParams } from "./storageCache";

export type Options = Partial<createStorageParams>;

export const createOptions = (
  storage: Storage,
  options: Options = {}
): Options => {
  return {
    hasEncrypt: enableStorageEncryption,
    storage,
    prefixKey: getStorageShortName(),
    ...options,
  };
};

export const createStorage = (
  storage: Storage = sessionStorage,
  options: Options = {}
) => {
  return create(createOptions(storage, options));
};

export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, {
    ...options,
    timeout: DEFAULT_CACHE_TIME,
  });
};
