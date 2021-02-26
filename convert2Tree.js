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
  arr.sort((a,b) => {return a.parentId - b.parentId});
  let res = {};
    for (let i = 0; i < arr.length; i++){
      if (arr[i].parentId != undefined) {
        let root = res;
        while(root.id != arr[i].parentId) {
          root = root.children;
        }
        if (!root.children) {
          root.children = {};
        }
        root.children.id = arr[i].id;
        root.children.name = arr[i].name;
      } else {
        res.id = arr[i].id;
        res.name = arr[i].name;
      }
    }
    return res;
}