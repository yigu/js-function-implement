/**
 * 排序后输出 id
 * before 2，意思是排在 id 2 的前面，first 意思是排最前面
 * @param {Array<Object>} list
 * @returns {Array<number>}
 * @example
 * [
 *  { id: 1, before: 2 },
 *  { id: 2, before: 3 },
 *  { id: 3, before: 6 },
 *  { id: 5, first: true },
 *  { id: 6, last: true },
 *  { id: 7, before: 5 },
 *  { id: 8, after: 6 },
 * ];
 * 输出为
 * [7, 5, 1, 2, 3, 6, 8];
 */
function sort1(list) {
  //现在我对用例的理解是，所有的项都会链接到 fist 和 last 两部分上，再将两个拼起来即可。
  //可能有多个fist的情况，则不同first的部分前后关系不确定。
  let first = [];//可能有多个first/last
  let last = [];
  //空间换时间，快速查找
  let map = new Map();
  list.forEach(item => {
    if (item.first) {
      first.push(item);
    } else if (item.last) {
      last.push(item);
    } else if (item.before != undefined) {
      map.set(`before${item.before}`, item);
    } else if (item.after != undefined) {
      map.set(`after${item.after}`, item);
    } 
  });
  // console.log(first);
  // console.log(last);
  // console.log(map);

  //基于单个元素找到连接的一整个链条
  let link = function(item, map) {
    let res = [item];
    if (map.has(`before${item.id}`)) {
      //换元素继续找
      res = link(map.get(`before${item.id}`), map).concat(res);
    } 
    if (map.has(`after${item.id}`)) {
      //换元素继续找
      res = res.concat(link(map.get(`after${item.id}`), map));
    }
    return res;
  }

  //将所有前面的元素补充全
  let full = function(des, map) {
    let tmp = [];
    des.forEach(item => {
      tmp = tmp.concat(link(item, map));
    })
    return tmp;
  }

  if (first.length) {
    first = full(first, map);
  }
  //console.log(first);
  if (last.length) {
    last = full(last, map);
  }
  //console.log(last);
  return first.concat(last).map(item => item.id);
}

function sort2(list) {
  let find = function(list, id) {
    for (let i = 0; i < list.length;i++) {
      if (list[i].id == id || list[i].endId == id) {
        return i;
      }
    }
    throw new Error('无解');
  }

  while(list.length > 2) {
    let obj = list.shift();
    if (obj.before) {
      let pos = find(list, obj.before);
      let item = {};
      if (obj.value == undefined) { obj.value = [obj.id] }
      if (list[pos].value == undefined) { list[pos].value = [list[pos].id] }

      item.value = obj.value.concat(list[pos].value);
      item.id = obj.value[0];
      item.endId = list[pos].value[list[pos].value.length - 1];

      item.first = list[pos].first;
      item.last = list[pos].last;
      item.before = list[pos].before;
      item.after = list[pos].after;

      list.splice(pos, 1);
      list.push(item);
    } else if (obj.after) {
      let pos = find(list, obj.after);
      let item = {};
      if (obj.value == undefined) { obj.value = [obj.id] }
      if (list[pos].value == undefined) { list[pos].value = [list[pos].id] }

      item.value = list[pos].value.concat(obj.value);
      item.id = list[pos].value[0];
      item.endId = obj.value[obj.value.length - 1];

      item.first = list[pos].first;
      item.last = list[pos].last;
      item.before = list[pos].before;
      item.after = list[pos].after;

      list.splice(pos, 1);
      list.push(item);
    } else {
      list.push(obj);
    }
    console.log(list);
  }

  if (list.length <= 2) {
    if (list[0].first) {
      return list[0].value.concat(list[1].value);
    } else {
      return list[1].value.concat(list[0].value);
    }
  }
}

function sort(list) {
  // id 起始， endId 末尾， value 存起始到末尾的ids
  // 例如： { id: 1, endId 2, value: [1,5,4,2] }
  
  let find = function(list, id) {
    for (let i = 0; i < list.length;i++) {
      if (list[i].id == id || list[i].endId == id) {
        return i;
      }
    }
    throw new Error('无解');
  }
  if (list.length <= 2) {
    if (list[0].first) {
      return list[0].value.concat(list[1].value);
    } else {
      return list[1].value.concat(list[0].value);
    }
  }
  let obj = list.shift();
  if (obj.before) {
    let pos = find(list, obj.before);
    let item = {};
    if (obj.value == undefined) { obj.value = [obj.id] }
    if (list[pos].value == undefined) { list[pos].value = [list[pos].id] }

    item.value = obj.value.concat(list[pos].value);
    item.id = obj.value[0];
    item.endId = list[pos].value[list[pos].value.length - 1];

    item.first = list[pos].first;
    item.last = list[pos].last;
    item.before = list[pos].before;
    item.after = list[pos].after;

    list.splice(pos, 1);
    list.push(item);
  } else if (obj.after) {
    let pos = find(list, obj.after);
    let item = {};
    if (obj.value == undefined) { obj.value = [obj.id] }
    if (list[pos].value == undefined) { list[pos].value = [list[pos].id] }

    item.value = list[pos].value.concat(obj.value);
    item.id = list[pos].value[0];
    item.endId = obj.value[obj.value.length - 1];

    item.first = list[pos].first;
    item.last = list[pos].last;
    item.before = list[pos].before;
    item.after = list[pos].after;

    list.splice(pos, 1);
    list.push(item);
  } else {
    list.push(obj);
  }
  console.log(list);

  return sort(list);
}

sort([
   { id: 1, before: 2 },
   { id: 2, before: 3 },
   { id: 3, before: 6 },
   { id: 5, first: true },
   { id: 6, last: true },
   { id: 7, before: 5 },
   { id: 8, after: 6 },
  ])
//[7, 5, 1, 2, 3, 6, 8]

sort([
   { id: 1, first: true },
   { id: 2, before: 4 },
   { id: 3, first: true },
   { id: 4, before: 3 },
   { id: 5, after: 3 },
   { id: 6, after: 5 },
   { id: 7, after: 6 },
   { id: 8, before: 9 },
   { id: 9, last: true },
   { id: 10, after: 9 }
  ])
//[1, 2, 4, 3, 5, 6, 7, 8, 9, 10]