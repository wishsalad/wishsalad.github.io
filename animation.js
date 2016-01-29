window.onload = function() {

var s = Snap("#svg");
Snap.load("logo.svg", onSVGLoaded) ;

// Scale Fullscreen
function resize(e) {
  var w = 450;
  var h = 260;

  var wW = window.innerWidth;
  var wH = window.innerHeight;

  var scalex = (wW - 50) / w;
  var scaley = (wH - 50) / h;
  var scale = Math.min(scalex, scaley);
  var style =   document.getElementById("container").style;
  style.transform = "scale(" + scale + ")";
  style.width = w + "px";
  style.height = h + "px";
  style.margin = (wH - h*scale)/2 + "px 0 0 " + (wW - w*scale)/2 + "px";
}
window.onresize = resize;
resize();

function onSVGLoaded( data ){
    s.append(data);

    var w = Snap("#w");
    var wt = w.transform();

    var ws = Snap("#ws");
    var wst = ws.transform();

    var motto1 = Snap("#motto1");
    var motto1t = motto1.transform();

    var motto2 = Snap("#motto2");
    var motto2t = motto2.transform();

    welems = [];
    for(var i = 0; i < 12; i++) {
       var we = Snap("#w" + (i+1));
       welems[i] = we;
    }

    var timers = [];

    function reset() {
      timers.forEach(function(t){ clearTimeout(t); });

      welems.forEach(function(e) {
        e.stop();
        var angle = Math.floor(Math.random() * 180) - 90;
        var scale = Math.random() * 3
        var t = "S" + scale + " r" + angle + "t0,-50"
        e.attr({opacity: 0, transform: t});
      });

      w.stop();
      w.transform(wt);
      w.addTransform("t150,0");

      w.stop();
      ws.attr({opacity: 0});
      ws.transform(wst);
      ws.addTransform("t50,0");

      motto1.stop();
      motto1.attr({opacity: 0});
      motto1.transform(motto1t.localMatrix);
      motto1.addTransform("S0.99 t0,5");

      motto2.stop();
      motto2.attr({opacity: 0});
      motto2.transform(motto2t.localMatrix);
      motto2.addTransform("S0.99 t0,5");
    }

    function animate() {
      var start = 600;

      var i = 0;
      welems.reverse();
      welems.forEach(function(e) {
        timers.push(setTimeout(function(){
            e.animate({opacity: 1, transform: 'S1 r0 t0,0'}, 800, mina.bounce);
        }, 60 * i + start));
        i++;
      });

      timers.push(setTimeout(function(){
          motto1.animate({opacity: 1, transform: motto1t}, 1300, mina.backout);
      }, 1500 + start));

      timers.push(setTimeout(function(){
          motto2.animate({opacity: 1, transform: motto2t}, 1300, mina.backout);
      }, 2500 + start));


      timers.push(setTimeout(function(){
          w.animate({transform: wt}, 350, mina.easeinout);
      }, 3500 + start));

      timers.push(setTimeout(function(){
          ws.animate({opacity: 1, transform: wst}, 600, mina.backout);
      }, 3850 + start));
    }

    reset();
    animate();

    ifvisible.on("blur", function(){
      reset();
    });

    ifvisible.on("focus", function(){
      animate();
    });

    s.click(function(){
      reset();
      animate();
    });
}

}

Snap.plugin( function( Snap, Element, Paper, global ) {
	Element.prototype.addTransform = function( t ) {
		return this.transform( this.transform().localMatrix.toTransformString() + t );
	};
});
