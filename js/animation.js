window.onload = function() {

var parentSvg = Snap("#svg");
Snap.load("img/logo.svg", onSVGLoaded) ;

function onSVGLoaded( data ){
    var svg = Snap(data.select('svg'));
    parentSvg.append(svg);

    var width = svg.attr("width");
    var height = svg.attr("height");

    function resize(e) {
      var wW = window.innerWidth;
      var wH = window.innerHeight;

      var scalex = (wW - 50) / width;
      var scaley = (wH - 50) / height;
      var scale = Math.min(Math.min(scalex, scaley), 2);

      var wsize = width*scale + "px";
      var hsize = height*scale + "px";;

      parentSvg.attr({width: wsize});
      parentSvg.attr({height: hsize});

      svg.attr({width: wsize});
      svg.attr({height: hsize});
    }
    window.onresize = resize;
    resize();

    var w = Snap("#w");
    var wt = w.transform();

    var ws = Snap("#ws");
    var wst = ws.transform();

    var motto1 = Snap("#motto1");
    var motto1t = motto1.transform();

    var motto2 = Snap("#motto2");
    var motto2t = motto2.transform();

    var scrollSign = Snap("#scrollSign");
    var scrollSignt = scrollSign.transform();

    welems = [];
    for(var i = 0; i < 12; i++) {
       var we = Snap("#w" + (i+1));
       welems[i] = we;
    }
    welems.reverse();

    var timers = [];

    var header = document.getElementById("header")

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

      ws.stop();
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

      scrollSign.stop();
      scrollSign.transform(scrollSignt.localMatrix);
      scrollSign.attr({opacity: 0});

      header.style.opacity = 0;
    }

    function animate() {
      var start = 600;

      var i = 0;
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

      function animateScrollSign(){
          var t = scrollSignt.localMatrix.translate(0, 2);
          scrollSign.animate({opacity: 1, transform: t}, 800, mina.backout, animateScrollSignReverse);
      }

      function animateScrollSignReverse(){
          var t = scrollSignt.localMatrix.translate(0, -2);
          scrollSign.animate({opacity: 1, transform: t}, 200, mina.backout, animateScrollSign);
      }

      timers.push(setTimeout(animateScrollSign, 5000 + start));

      timers.push(setTimeout(function(){
          header.style.opacity = 1;
      }, 5000 + start));
    }

    reset();
    animate();

    ifvisible.on("blur", function(){
      reset();
    });

    ifvisible.on("focus", function(){
      animate();
    });

    w.click(function(){
      reset();
      animate();
    });

    smoothScroll.init({
        selector: '[data-scroll]', // Selector for links (must be a valid CSS selector)
        selectorHeader: '#header', // Selector for fixed headers (must be a valid CSS selector)
        speed: 500, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        scrollOnLoad: true // Boolean. If true, animate to anchor on page load if URL has a hash
    });

    scrollSign.click(function(){
      smoothScroll.animateScroll('#firstSection')
    });
}

}

Snap.plugin( function( Snap, Element, Paper, global ) {
	Element.prototype.addTransform = function( t ) {
		return this.transform( this.transform().localMatrix.toTransformString() + t );
	};
});
