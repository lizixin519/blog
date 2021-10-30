/*
 * @Author: your name
 * @Date: 2021-10-24 15:48:27
 * @LastEditTime: 2021-10-24 16:14:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blog/test/index.js
 */

let arr = [2, 3, 4];

Array.prototype.myMap = function(fn, context) {
    console.log(context);
    var arr = Array.prototype.slice.call(this);
    var tempArr = [];
    for (var i = 0; i < arr.length; i++) {
        tempArr.push(fn.call(context, arr[i], i, this));
    }
    return tempArr;
};

Array.prototype.myFilter = function(fn, context) {
    var arr = Array.prototype.slice.call(this);
    var tempArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (fn.call(context, arr[i], i, this)) {
            tempArr.push(arr[i]);
        }
    }
    return tempArr;
};

Array.prototype.mySome = function(fn, context) {
    var arr = Array.prototype.slice.call(this);
    var flag = false;
    for (var i = 0; i < arr.length; i++) {
        if (fn.call(context, arr[i], i, this)) {
            flag = true;
            break;
        }
    }
    return flag;
};

Array.prototype.myEvery = function(fn, context) {
    var arr = Array.prototype.slice.call(this);
    var flag = true;
    for (var i = 0; i < arr.length; i++) {
        if (!fn.call(context, arr[i], i, this)) {
            flag = false;
            break;
        }
        console.log(i);
    }
    return flag;
};

let flag = arr.myEvery((item) => {
    return item < 5;
});

console.log(flag);
