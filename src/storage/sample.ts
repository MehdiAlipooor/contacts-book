import { db } from './db';

export const index = {
  '09199784100': 2,
  '09361836669': 12,
};

const indexCache: Record<string, number> = {};

const id = crypto.randomUUID();

const create = (username: string, phone: string, indexField?: string) => {
  const row = db.push({ id, phone, username });

  if (!indexField) {
    return;
  }

  indexCache[indexField] = row;
};

const getByPhone = (phone: string) => {
  const getCacheIndex = indexCache[phone];

  if (getCacheIndex) {
    return db[getCacheIndex];
  }

  return db.filter((f) => f.phone === phone);
};

const updateRow = (phone: string) => {
  const getCacheIndex = indexCache[phone];

  db[getCacheIndex] = {
    ...db[getCacheIndex],
    phone,
  };
};
