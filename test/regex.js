/**
 * Created by solvek on 14.03.16.
 */

var util = require('util');

var REGEX = /(?:\s*:\s*(-?\d+))?(?:\s+("([^"]+)"|([^=]+))="([^"]+)")*?(?:\s*,\s*(.+)\s*)?/g;

var str = ' param1="val1" param2="val2 val3"';

var res = str.match(REGEX);

console.log(util.inspect(res));
