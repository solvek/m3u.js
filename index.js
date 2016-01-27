/**
 * Created by solvek on 26.01.16.
 */

var EXTM3U = '#EXTM3U';
var EXTINF = '#EXTINF:';

var util = require('util');

function parseParams(pairs){
    var result = {};

    var pair, value;

    for(var i=0;i<pairs.length;i++){
        pair = pairs[i].split('=');
        if (pair.length > 1){
            value = pair[1].trim();
        }
        else {
            value = null;
        }
        result[pair[0].trim()] = value;
        //console.log(pair);
        //console.log(util.inspect(result));
    }

    //console.log(util.inspect(result));
    return result;
}

function parse(content){
    var result = {
        tracks: []
    };

    //console.log(content);
    var lines = content.split('\n');

    var line, current = {}, comma, params;
    for(var i=0;i<lines.length;i++){
        line = lines[i].trim();

        if (line == ''){
            continue;
        }

        if (line.indexOf(EXTM3U) == 0){
            result.header = parseParams(line.substr(EXTM3U.length).trim().split(' '));
            continue;
        }

        if (line.indexOf(EXTINF) == 0){
            comma = line.lastIndexOf(',');
            current.title = line.substr(comma+1).trim();

            params = line.substring(EXTINF.length, comma).trim().split(' ');

            //console.log(line.substring(EXTINF.length, comma).trim());
            //console.log(util.inspect(params));

            current.lenght = parseInt(params.shift().trim());

            current.params = parseParams(params);
            continue;
        }

        if (line.indexOf("#") == 0){
            continue;
        }

        current.file = line;

        //console.log(util.inspect(current));
        result.tracks.push(current);

        current = {};
    }

    return result;
}

module.exports.parse = parse;