/**
 * Created by solvek on 14.03.16.
 */

var util = require('util');

var REGEX = /\s*(-?\d+)/g;

var str = '500,Test3';

var res = str.match(REGEX);

console.log(util.inspect(res));
