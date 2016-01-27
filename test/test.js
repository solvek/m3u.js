/**
 * Created by solvek on 26.01.16.
 */

var fs = require('fs');
var should = require('chai').should();
var expect = require('chai').expect;

var m3u = require('../index.js');

var parsed = m3u.parse(fs.readFileSync('./test.m3u', 'utf8'));

//var util = require('util');
//console.log("Parsed: "+util.inspect(parsed));

parsed.should.be.an('object');
parsed.should.have.ownProperty('header');

var header = parsed.header;

Object.keys(header).length.should.equal(2);

var tracks = parsed.tracks;

tracks.should.be.an('array');
tracks.length.should.equal(3);

var track1 = tracks[0];

track1.should.be.an('object');
track1.title.should.equal('Test');
track1.lenght.should.equal(0);
track1.params.should.be.an('object');

var params = track1.params;
params.should.be.an('object');
Object.keys(params).length.should.equal(2);
params.should.have.ownProperty('p1');
params.should.have.ownProperty('p2');

var track2 = tracks[1];

track2.should.be.an('object');
track2.lenght.should.equal(-1);
track2.file.should.equal('http://url2');

params.p1.should.equal('v1');
params.p2.should.equal('v2');

var track3 = tracks[2];

track3.should.be.an('object');
track3.lenght.should.equal(500);