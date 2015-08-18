'use strict';

var App = angular.module('RSSFeedApp', []);

App.controller("FeedCtrl", ['$scope','FeedService', function ($scope,Feed) {    
    $scope.loadButonText="Load";
        $scope.allFeeds = [{titleText:"CodeProject C#",url:"http://www.codeproject.com/webservices/articlerss.aspx?cat=3"}, 
                        {titleText:"ComputerWorld - News",url:"http://www.computerworld.com/index.rss"},
                        {titleText:"Dr. Dobb's",url:"http://www.drdobbs.com/rss/all"},
                        {titleText:"InfoWorld Today's News",url:"http://www.infoworld.com/news/feed"},
                        {titleText:"Inc. Magazine",url:"http://www.inc.com/rss/homepage.xml"},
                        {titleText:"TechCrunch",url:"http://feeds.feedburner.com/TechCrunch"},
                        {titleText:"CNN",url:"http://rss.cnn.com/rss/cnn_topstories.rss"}
                        ];
                        
    $scope.loadFeed=function(e){        
        Feed.parseFeed($scope.feedSrc).then(function(res){
            $scope.feeds=res.data.responseData.feed.entries;
            setTimeout (getMsg,500);
        });
    }


}]);

App.factory('FeedService',['$http',function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));

        }
    }
}]);

    remove();

    

function getMsg(e) {

    var header=document.querySelectorAll('ul.unstyled li h5');
    for (var i=0;i<header.length;i++){
        header[i].onclick=function() {
            var head=this.getElementsByTagName('a')[0].innerHTML;
            var content_wrap=document.createTextNode('div');
            var content=convertSpecSymbols(this.parentNode.getElementsByClassName('hidden_paragraph')[0].innerHTML);
            document.getElementById('msgTitle').innerHTML=head;
            document.getElementById('msgContent').innerHTML= content;
            /*---count symbol repeats-------------*/
            var str=content.toString().replace(/<\/?[^>]+>/g,'').toLowerCase();
            

            symbols_number(str);

        }
    }
    
}
function remove(e) {
    var remove_buttons=document.querySelectorAll('button.remove');
        for (var i=-0;i<remove_buttons.length;i++) {
            remove_buttons[i].onclick=function() {
            this.parentNode.parentNode.removeChild(this.parentNode);
        }
        
    }
}

function convertSpecSymbols (str, toText) {
  var
    symbols = [
      ['&amp;',     '&'],
      ['&lt;',      '<'],
      ['&gt;',      '>'],
      ['&and;',     '^'],
      ['&sim;',     '~']
    ],
    pos = -1;
 
  if (typeof toText == 'undefined' || toText) {
    for (var i = 0, n = symbols.length; i < n; i++) {
      while ((pos = str.indexOf(symbols[i][0], pos + 1)) != -1) {
        str = str.substring(0, pos) + symbols[i][1] + str.substring(pos + symbols[i][0].length);
      }
    }
  } else {
    for (var i = 0, n = symbols.length; i < n; i++) {
      while ((pos = str.indexOf(symbols[i][1], pos + 1)) != -1) {
        str = str.substring(0, pos) + symbols[i][0] + str.substring(pos + symbols[i][1].length);
      }
    }
  }
  return str;
}


function symbols_number(str){
        var letters=new Array();
        var numbers=new Array();
        var percent=new Array();
        var total_numbers=str.replace(/[^A-Z]/gi, "").length;
    for (var i=0; i<26; i++){
        letters[i]=String.fromCharCode(i+97);
        var re=new RegExp('' + letters[i] + '','gi');
        var matches=str.match(re);
        if (matches===null){
            numbers[i]=0;
            letters[i]='';
        } else {
            numbers[i]=matches.length;
        }
        percent[i]=numbers[i]/total_numbers;
        
    }
    clear_canvas();
    drawMyChart(percent,letters);
}

function drawMyChart(data_array,data_labels){
        if(!!document.createElement('canvas').getContext){ 
            var mychart = new AwesomeChart('canvas1');
            mychart.title = "Frequency letter repeat";
            mychart.data = data_array;
            mychart.labels = data_labels;
            mychart.chartType = 'doughnut';
            mychart.draw();
        }
      }
function clear_canvas(e) {
    var canvas = document.getElementById('canvas1');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    var w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
}   
