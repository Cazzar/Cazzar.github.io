// ==UserScript==
// @name         4Shared hacks
// @namespace    http://cazzar.net/
// @version      2
// @description  A various amount of scripts to add to 4shared in relation to some of it's annoying features.
// @update       http://cazzar.net/4shared.user.js
// @author       Cazzar
// @include      http://www.4shared.com/*
// @include      http*://www.4shared.com/get/*
// @grant        none
// ==/UserScript==
var $ = unsafeWindow.jQuery;

$(unsafeWindow).load(function () {
  var time = 20;
  $(".adBlockWarningMessage").remove();
  $("#downloadDelayTimeSec").text(time);
  $("#secondsLeft").val(time);
  Events.fireEvent("change.seconds.left", time);
});

$(function () {
  $("#btnLink").attr("onclick", "");
});
