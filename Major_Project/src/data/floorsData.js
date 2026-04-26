/**
 * Floor Data Index — APJ Block
 * 
 * Each floor's data is stored in its own file under apj-block/.
 * This index re-exports them as the combined `floorsData` object
 * so existing imports continue to work unchanged.
 */

import { basement } from './apj-block/basement.js';
import { floor1 } from './apj-block/floor1.js';
import { floor2 } from './apj-block/floor2.js';
import { floor3 } from './apj-block/floor3.js';
import { floor4 } from './apj-block/floor4.js';
import { floor5 } from './apj-block/floor5.js';

export const floorsData = {
  basement,
  floor1,
  floor2,
  floor3,
  floor4,
  floor5,
};
