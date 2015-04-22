# BlockingInterval
Blocking Interval is a Javascript library that utilizes the operation of Javascript's built-in function setInterval to create and execute one interval at a time. 

### Note:
Javascript's setInterval function does not run in parallel, however setInterval functions can run one after another. This library simply allows one to create an interval that will run by itself. It also supplies tools for starting, stopping, pausing, and interrupting intervals.

#Usage
---
Include BlockingInterval.js into your html document
```html
<script type="text/javascript" src="BlockingInterval.min.js"></script>
```

Create a new instance of blocking interval
```javascript
var myInterval = new BlockingInterval();
```

Now you can set your interval just like javascripts built in `setInterval(callback, period);`.  
In blocking interval's version of setInterval, we pass the number of completed iterations `i` to your callback function. 
```javascript
myInterval.setInterval(function(i){
  console.log(i);
}, 100);
```
You can pause and resume an interval as follows
```javascript
myInterval.pause();
/* other code here */
myInterval.resume();
```
A blocking interval can also be interrupted momentarily with a different callback function.  
As with setInterval, this function is also passed `i` - the number of iterations completed.
```javascript
myInterval.interrupt(function(i){
  console.log("Sorry to interrupt at "+i);
});
```
Finally, to clear your interval
```javascript
myInterval.clearInterval();
```
This will completely reset the blocking interval object back to its initial state.
#To-do
 - A run time feature would be nice, to track the actual time that the interval has been running
 - Pass additional information to callbacks

#License
GNU General Public License, V2
