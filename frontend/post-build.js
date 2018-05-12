#!/usr/bin/env node

var fs = require('fs-extra'),
        path = require('path'),
        glob = require("glob")
        cheerio = require('cheerio');


var rootDir = path.resolve(__dirname, '../');
var appDir = path.resolve(__dirname, './');
var source = path.resolve(appDir, 'dist/frontend/');
var destination = path.resolve(rootDir, 'origintask/static/app');
var indexPath = path.resolve(rootDir, 'task/templates/index.html');

fs.emptyDirSync(destination);

$ = cheerio.load(fs.readFileSync(source+'/index.html', 'utf-8'),{decodeEntities: false});
$('html').prepend('\n{% load static %}\n');
$('head link[href="favicon.ico"]').attr('href', "{% static 'favicon.ico' %}");
glob(source+"/*.js", {}, function (er, files) {
    files.forEach(function(file) {
        var filename = path.parse(file).base;
        fs.copySync(file,destination+"/"+filename);
        var djangoFilePath = "{% static 'app/"+filename+"' %}";        
        $('body script[src="'+filename+'"]').attr('src', djangoFilePath);
        fs.writeFileSync(indexPath, $.html());
    });
  })

  glob(source+"/*.css", {}, function (er, files) {
    files.forEach(function(file) {
        var filename = path.parse(file).base;
        fs.copySync(file,destination+"/"+filename);
        var djangoFilePath = "{% static 'app/"+filename+"' %}";
        $('head link[href="'+filename+'"]').attr('href', djangoFilePath);
        fs.writeFileSync(indexPath, $.html());
    });
  })

  glob(source+"/*.ttf", {}, function (er, files) {
    files.forEach(function(file) {
        var filename = path.parse(file).base;
        fs.copySync(file,destination+"/"+filename);
    });
  })

  glob(source+"/*.eot", {}, function (er, files) {
    files.forEach(function(file) {
        var filename = path.parse(file).base;
        fs.copySync(file,destination+"/"+filename);
    });
  })

  glob(source+"/*.svg", {}, function (er, files) {
    files.forEach(function(file) {
        var filename = path.parse(file).base;
        fs.copySync(file,destination+"/"+filename);
    });
  })

  glob(source+"/*.woff", {}, function (er, files) {
    files.forEach(function(file) {
        var filename = path.parse(file).base;
        fs.copySync(file,destination+"/"+filename);
    });
  })

  glob(source+"/*.woff2", {}, function (er, files) {
    files.forEach(function(file) {
        var filename = path.parse(file).base;
        fs.copySync(file,destination+"/"+filename);
    });
  })


