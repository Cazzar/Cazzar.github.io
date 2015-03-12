// ==UserScript==
// @name         4Shared hacks
// @namespace    http://cazzar.net/
// @version      1.0
// @description  A various amount of scripts to add to 4shared in relation to some of it's annoying features.
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @author       Cazzar
// @match        http://www.4shared.com/*
// @grant        none
// ==/UserScript==

$(function () {
    $("#btnLink").attr("onclick", "");
});
