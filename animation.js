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
    w.addTransform("t150,0")

    var ws = Snap("#ws");
    ws.attr({opacity: 0});
    var wst = ws.transform();
    ws.addTransform("t50,0");

    var motto1 = Snap("#motto1");
    motto1.attr({opacity: 0});
    var motto1t = motto1.transform();
    motto1.addTransform("S0.99 t0,5");

    var motto2 = Snap("#motto2");
    motto2.attr({opacity: 0});
    var motto2t = motto2.transform();
    motto2.addTransform("S0.99 t0,5");

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
        motto1.animate({opacity: 1, transform: motto1t}, 1300, mina.backout);
    }, 1500 + start);

    setTimeout(function(){
        motto2.animate({opacity: 1, transform: motto2t}, 1300, mina.backout);
    }, 2500 + start);


    setTimeout(function(){
        w.animate({transform: wt}, 350, mina.easeinout);
    }, 3500 + start);

    setTimeout(function(){
        ws.animate({opacity: 1, transform: wst}, 600, mina.backout);
    }, 3850 + start);
}

}

Snap.plugin( function( Snap, Element, Paper, global ) {
	Element.prototype.addTransform = function( t ) {
		return this.transform( this.transform().localMatrix.toTransformString() + t );
	};
});
