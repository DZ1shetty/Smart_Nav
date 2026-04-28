/**
 * Floor Data Index — APJ Block
 * 
 * Each floor's data is stored in its own file under apj-block/.
 * This index re-exports them as the combined `floorsData` object
 * so existing imports continue to work unchanged.
 */

import { basement } from './apj-block/basement.js';
import { ground } from './apj-block/ground.js';
import { first } from './apj-block/first.js';
import { second } from './apj-block/second.js';
import { third } from './apj-block/third.js';
import { fourth } from './apj-block/fourth.js';
import { fifth } from './apj-block/fifth.js';

export const floorsData = {
  basement,
  ground,
  first,
  second,
  third,
  fourth,
  fifth,
};
