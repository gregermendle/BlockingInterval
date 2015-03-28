/*
    - Blocking Interval -
    Blocking Interval is a Javascript library that mimics the operation of setInterval 
    but only allows one interval to be executed at a time.
    Copyright (C) 2015  Gregory Jordan

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
*/
(function(){
	BlockingInterval = function(){
		/*
			console.log fixes
		*/
		if(typeof console === 'undefined'){
			console.log = function(){}; // no-op function for log
		}
	
		var bi = this;

		/*
			Callback function for the interval
		*/
		bi.callback = null;
	
		/*
			The time period for which the callback should run (eg. time = 300 thus run every 300 ms)
		*/
		bi.period = 0;
	
		/*
			The current iteration
		*/
		bi.i = 1;
	
		/*
			Is the interval paused
		*/
		bi.paused = false;
	
		/*
			Set blocking interval
		*/
		bi.setInterval = function(callback, period){
			if(typeof callback === 'undefined' || callback == null){
				console.log("No callback function specified!");
				return false;
			}
			if(typeof window.blockingInt === 'undefined'){
				window.blockingInt = false;
			}
			if(window.blockingInt == false){
				bi.callback = callback;
				bi.period = period;			
				window.blockingInt = setInterval(function(){
						bi.callback(bi.i); // call the callback function
						bi.i++; // increment the number of iterations
					}, bi.period);
				return true;
			}else{
				console.log("A blocking interval is already running!");
				return false;
			}
		}
	
		/*
			Interrupt the current interval with the given callback
		*/
	
		bi.interrupt = function(callback){
			if(!bi.blockingIntExists()){
				console.log("No blocking interval currently exists!");
				return false;
			}
			if(typeof callback === 'undefined' || callback == null){
				console.log("No callback function supplied for interrupt!");
				return false;
			}
			if(bi.paused || bi.pause()){ // pause the interval
				callback((bi.i-1));
				bi.resume();
				return true;
			}
		}
	
		/*
			Check blocking interval exists
		*/
	
		bi.blockingIntExists = function(){
			if(typeof window.blockingInt !== 'undefined' && window.blockingInt != false){
				return true;
			}else{
				return false
			}
		}
	
		/*
			Pauses the blocking interval
		*/
	
		bi.pause = function(){
			if(bi.blockingIntExists()){
				if(bi.paused){
					console.log("Blocking interval already paused!");
					return false;
				}
				clearInterval(window.blockingInt);
				window.blockingInt = false; // set to false since we want to be able to create a 'new' interval
				bi.paused = true;
				return true;
			}else{
				console.log('No blocking interval currently exists!');
				return false;
			}
		}
	
		/*
			Resumes the paused interval
		*/
	
		bi.resume = function(){
			if(bi.paused){
				bi.setInterval(bi.callback, bi.period);
				bi.paused = false;
				return true;
			}else{
				console.log('No blocking interval is paused!');
				return false;
			}
		}
	
		/*
			Clear current blocking interval
		*/
		bi.clearInterval = function(){
			if(bi.blockingIntExists()){
				clearInterval(window.blockingInt);
				bi.reset();
				return true;
			}else{
				console.log("No blocking interval currently exists!");
				return false;
			}
		}
	
		/*
			Reset the blocking interval object
		*/
	
		bi.reset = function(){
			window.blockingInt = false;
			bi.paused = false;
			bi.callback = null;
			bi.period = 0;
			bi.i = 1;
		}
	}
	return BlockingInterval;
})();