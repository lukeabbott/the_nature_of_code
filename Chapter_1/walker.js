(function () {
    "use strict";
    //get the canvas
    var nocCanvas = document.getElementById("noc_examples"),
    //get the context of the drawing pane
        nocContext = nocCanvas.getContext("2d");
    
    //define a Walker object
    var Walker = function (x, y, context, trail) {
        //if trail is undefined then set to false
        trail = (typeof trail === "boolean")? trail : true;
        
        //set walker size
        var size = 1;
        
        //produces a random number from -1 to 1
        function randomChange() {
            var rand = Math.random();
            if(rand < 0.6) return -1;
            if(rand >= 0.6 && rand < 0.9) return 1;
            return 0;
        }
        //resets rectangle position if it hits the canvas edge
        function boundaryReset(c) {
            if (c <= 0) {
                return 479;
            }
            if (c >= 480) {
                return 1;
            }
            return c;
        }
        //displays the Walker on the canvas
        function draw() {
            context.fillRect(x, y, size, size);
        }
        //removes the Walker from the canvas
        function clear() {
            context.clearRect(x, y, size, size);
        }
        //logic for the movement of the Walker
        this.move = function move() {
            //remove rectangle if we do not want a trail
            if (!trail) {
                clear();
            }
            //modify the x and y coordinates
            x += randomChange();
            x = boundaryReset(x);
            y += randomChange();
            y = boundaryReset(y);
            //draw the walker on the canvas
            draw();
        };
        this.getCds = function(){
            return "x: "+x+" y: "+y;
        };
        //initial draw of the walker
        draw();
        //add the walker to the collection for iteration
        Walker.all.push(this);
    };
    //collection of all walkers
    Walker.all = [];
    Walker.moveAll = function (){
        Walker.all.forEach(function (w) {
            w.move();
        });
    };
    
    //generate a bunch of walkers at once
    function generateWalkers(qty,trail) {
        for (null; qty--; null) {
            new Walker(Math.round(Math.random() * 480), Math.round(Math.random() * 480), nocContext,trail);
        }
    }
    
    //trigger the walkers move function on a timer
    setInterval(Walker.moveAll, 33);
    
    window.genWalkers = generateWalkers;
})();