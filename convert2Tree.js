/**
 * 将数组转换成树状结构
 * @param {Array} arr
 * @returns {Object}
 * @example
 * [
 *   { id: 1, name: 'i1' },
 *   { id: 2, name: 'i2', parentId: 1 },
 *   { id: 4, name: 'i4', parentId: 3 },
 *   { id: 3, name: 'i3', parentId: 2 },
 *   { id: 5, name: 'i5', parentId: 4 },
 * ]
 * 转换后
 * {
 *   id: 1,
 *   name: 'i1',
 *   children: [
 *     { id: 2, name: 'i2', parentId: 1, children: [...] },
 *   ]
 * }
 */
function convert2Tree(arr) {
  let res = {};
  let map = new Map();

  let find = function(id) {
    for(let i = 0; i < arr.length; i++) {
      if (arr[i].id == id)
        return i;
    }
    return -1;
  }

  let build = function(id) {
    if (!arr.length) {
      return;
    }
    let pos = find(id);
    let item = arr[pos];
    if (item.parentId == undefined) {
      res.id = item.id;
      res.name = item.name;
      map.set(item.id, res);
      arr.splice(pos, 1);
    } else {
      //找parent
      if (map.has(item.parentId)) {
        //父已经存在，直接放
        let parent = map.get(item.parentId)
        if (!parent.children) {
          parent.children = {};
        }
        parent.children.id = item.id;
        parent.children.name = item.name;
        //存一下
        map.set(item.id, parent.children);
        arr.splice(pos, 1);
      } else {
        //不存在，先去build父
        build(item.parentId);
        build(id);
      }
    }
  }

  while(arr.length) {
    build(arr[0].id);
  }

  return res;
}

convert2Tree([
    { id: 1, name: 'i1' },
    { id: 2, name: 'i2', parentId: 1 },
    { id: 4, name: 'i4', parentId: 3 },
    { id: 3, name: 'i3', parentId: 2 },
    { id: 5, name: 'i5', parentId: 4 },
  ])

convert2Tree([
    { id: 1, name: 'i1' },
    { id: 5, name: 'i5', parentId: 1 },
    { id: 4, name: 'i4', parentId: 5 },
    { id: 3, name: 'i3', parentId: 4 },
    { id: 2, name: 'i2', parentId: 3 },
  ])