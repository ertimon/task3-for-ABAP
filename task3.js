'use strict';
var $ = require("jquery");
global.DOMParser = require('xmldom').DOMParser;
require('isomorphic-fetch');

fetch('http://www.cbr.ru/scripts/XML_daily.asp/').then(function(response) {
  response.text().then(function(text) {

   let parser = new DOMParser();
   let xmlDoc = parser.parseFromString(text,"text/xml");

   let currency_count = xmlDoc.getElementsByTagName("Valute").length;

   let min = Infinity,
       max = 0,
       val = 0,
       nom = 0,
       worth = 0,
       max_i = 0,
       min_i = 0;

   for (let i = 0; i <= currency_count - 1; i++){
      nom = Number(xmlDoc.getElementsByTagName("Nominal")[i].childNodes[0].nodeValue);
      val = xmlDoc.getElementsByTagName("Value")[i].childNodes[0].nodeValue;
      val = parseFloat(val.replace(',','.'));
      worth = val / nom;
        if (worth > max) {
          max = worth;
          max_i = i;
        }
        if (worth < min){
          min = worth;
          min_i = i;
        }
   }
let cheap_curr, expensive_curr;
cheap_curr = xmlDoc.getElementsByTagName("Name")[min_i].childNodes[0].nodeValue;
expensive_curr = xmlDoc.getElementsByTagName("Name")[max_i].childNodes[0].nodeValue;
console.log("cамая дорогая валюта - " + expensive_curr + " курс к рублю - " + max);
console.log("самая дешевая валюта - " + cheap_curr + " курс к рублю - " + min);
  }).catch(err => console.error(err));;
});


  
