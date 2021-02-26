/**
  * 实现 EventEmitter
  * @example
  * const ee = new EventEmitter();
  * ee.on('update', console.log);
  * ee.emit('update', 'xxx');
  */
class EventEmitter {
  constructor() {
    this.event = {};
  }
  
  /**
   * @param {string} name
   * @param {Function} callback
   * @returns {void}
   */
  on(name, callback) {
    if (!this.event[name]) {
      this.event[name] = [callback];
    } else {
      this.event[name].push(callback);
    }
  }

  /**
   * @param {string} name
   * @param {any} params
   * @returns {void}
   */
  emit(name, params) {
    if (this.event[name]) {
      this.event[name].forEach(item => {
        item(params);
      });
    }
  }
}

const ee = new EventEmitter();
ee.on('update', console.log);
ee.emit('update', 'xxx');