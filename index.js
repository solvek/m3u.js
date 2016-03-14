/**
 * Created by solvek on 26.01.16.
 */

var EXTM3U = '#EXTM3U';
var EXTINF = '#EXTINF:';

var REGEX = /(?:\s*(-?\d+))?(?:\s+("([^"]+)"|([^=]+))="([^"]+)")?(?:\s*,\s*(.+)\s*)?/g;

//var util = require('util');

function parseData(data){
    var result = {params:{}};

    var m, paramName;

    while ((m = REGEX.exec(data)) !== null) {
        if (m.index === REGEX.lastIndex) {
            REGEX.lastIndex++;
        }

        //console.log(util.inspect(m));
        if (m[1]){
            result.length = parseInt(m[1]);
        }

        if (m[6]){
            result.title = m[6];
        }

        if (m[5]){
            paramName = m[3] ? m[3] : m[4];
            result.params[paramName] = m[5];
        }
    }

    //console.log(util.inspect(result));
    return result;
}

function formatParams(params){
    var result = '';
    for(var key in params){
        result += ' ' + key + '="' + params[key]+'"';
    }

    return result;
}

function parse(content){
    var result = {
        tracks: []
    };

    //console.log(content);
    var lines = content.split('\n');

    var line, current = null;
    for(var i=0;i<lines.length;i++){
        line = lines[i].trim();

        if (line == ''){
            continue;
        }

        if (line.indexOf(EXTM3U) == 0){
            current = parseData(line.substr(EXTM3U.length));
            result.header = current.params;
            continue;
        }

        if (line.indexOf(EXTINF) == 0){
            current = parseData(line.substr(EXTINF.length));
            continue;
        }

        if (line.indexOf("#") == 0){
            continue;
        }

        if (current) {
            current.file = line;

            //console.log(util.inspect(current));
            result.tracks.push(current);

            current = null;
        }
    }

    return result;
}

function format(m3u){
    var result = EXTM3U;
    if (m3u.header){
        result += formatParams(m3u.header);
    }
    result+= '\n';
    m3u.tracks.forEach(function(track){
        result += EXTINF
            +track.length
            +formatParams(track.params)
            +","
            +track.title
            +'\n'
            +track.file
            +'\n';
    });

    return result;
}

module.exports.parse = parse;
module.exports.format = format;