window.onload = function() {

var s = Snap("#svg");
Snap.load("logo.svg", onSVGLoaded) ;

// Scale Fullscreen
function resize(e) {
  var w = 450;
  var h = 260;

  var scalex = (window.innerWidth - 50) / w;
  var scaley = (window.innerHeight - 50) / h;
  var scale = Math.min(scalex, scaley);
  document.getElementById("container").style.transform = "scale(" + scale + ")";
}
window.onresize = resize;
resize();

function onSVGLoaded( data ){
    s.append(data);

    var w = Snap("#w");
    var wt = w.transform();
    w.addTransform("t150,0")

    var ws = Snap("#ws");
    ws.attr({opacity: 0});
    var wst = ws.transform();
    ws.addTransform("t50,0");

    var motto = Snap("#motto");
    motto.attr({opacity: 0});
    var mottot = motto.transform();
    motto.addTransform("S0.99 t0,5");

    welems = [];
    for(var i = 0; i < 12; i++) {
       var we = Snap("#w" + (i+1));
       var angle = Math.floor(Math.random() * 180) - 90;
       var scale = Math.random() * 3
       var t = "S" + scale + " r" + angle + "t0,-50"
       we.attr({opacity: 0, transform: t});
       welems[i] = we;
    }

    var start = 600;

    var i = 0;
    welems.reverse();
    welems.forEach(function(e) {
      setTimeout(function(){
          e.animate({opacity: 1, transform: 'S1 r0 t0,0'}, 800, mina.bounce);
      }, 60 * i + start);
      i++;
    });

    setTimeout(function(){
        w.animate({transform: wt}, 350, mina.easeinout);
    }, 1400 + start);

    setTimeout(function(){
        ws.animate({opacity: 1, transform: wst}, 600, mina.backout);
    }, 1750 + start);

    setTimeout(function(){
        motto.animate({opacity: 1, transform: mottot}, 1300, mina.backout);
    }, 1850 + start);
}

}

Snap.plugin( function( Snap, Element, Paper, global ) {
	Element.prototype.addTransform = function( t ) {
		return this.transform( this.transform().localMatrix.toTransformString() + t );
	};
});
