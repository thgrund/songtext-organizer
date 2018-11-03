/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

let _counter = 1;

/**
 * This is a simple counter for providing unique ids.
 */
const SongCounter = {
  increment() {
    return String(++_counter);
  },
  getCounter() {
    return String(_counter);
  },
  setCounter(counter) {
    _counter = counter;
  }
};

export default SongCounter;
