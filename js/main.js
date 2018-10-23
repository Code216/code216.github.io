      /* canvas start */
      var canvas = document.getElementById('canvas');
      canvas.width = "550";
      canvas.height = "480";
      //var winMin = Math.min(window.innerWidth,window.innerHeight);
      //canvas.width = winMin;
      //canvas.height = winMin;
      var ctx = canvas.getContext('2d');
      ctx.globalCompositeOperation = 'multiply';
      //burnt orange
      ctx.fillStyle = 'rgb(214,113,43)';
      ctx.beginPath();
      ctx.arc(100, 100, 100, 0, Math.PI*2, true);
      ctx.font = "30px Arial";
      ctx.fillText("JavaScript", 30, 60);
      ctx.closePath();
      ctx.fill();
      //blue
      ctx.fillStyle = 'rgb(0,128,138)';
      ctx.beginPath();
      ctx.arc(260, 100, 100, 0, Math.PI*2, true); 
      ctx.font = "30px Arial";
      ctx.fillText("C#", 230, 78);
      ctx.closePath();
      ctx.fill();
      //purple
      ctx.fillStyle = 'rgb(127,48,214)';
      ctx.beginPath();
      ctx.arc(150, 230, 100, 0, Math.PI*2, true); 
      ctx.font = "30px Arial";
      ctx.fillText("SQL", 125, 250);
      ctx.closePath();
      ctx.fill();
      //yellow-green
      ctx.fillStyle = 'rgb(188,214,72)';
      ctx.beginPath();
      ctx.arc(305, 230, 100, 0, Math.PI*2, true); 
      ctx.font = "30px Arial";
      ctx.fillText("HTML", 287, 270);
      ctx.closePath();
      ctx.fill();
      //pearl
      ctx.fillStyle = 'rgb(197,197,203)';
      ctx.beginPath();
      ctx.arc(410, 130, 100, 0, Math.PI*2, true); 
      ctx.font = "30px Arial";
      ctx.fillText("CSS", 390, 140);
      ctx.closePath();
      ctx.fill();
      //another color
      ctx.fillStyle = 'rgb(214,135,174)';
      ctx.beginPath();
      ctx.arc(190, 360, 100, 0, Math.PI*2, true); 
      ctx.font = "30px Arial";
      ctx.fillText("Unity", 170, 380);
      ctx.closePath();
      ctx.fill();
      /* canvas end */
      /* form start */
      $('#contact-form').submit(function(e){
        var name = document.getElementById('inputName'),
            email = document.getElementById('inputEmail'),
            message = document.getElementById('inputMessage');
        if (!name.value || !email.value || !message.value) {
          alertify.error('Please check your entries')
        }
        else {
          $.ajax({
            url:"https://formspree.io/alexiscchandler@gmail.com",
            method: "POST",
            data: $(this).serialize(),
            dataType: "json"
          });
          e.preventDefault()
          $(this).get(0).reset()
          alertify.success('Message sent')
        }
      });
      /* form end */
      /* color particles start - The majority of this I found on a code pen and modifyed to fit my customized
	     colors, height, and width. Not sure of the original author, please dont be mad */
      function Particle( x, y, radius ) {
        this.init( x, y, radius );
      }
      Particle.prototype = {
        init: function( x, y, radius ) {
          this.alive = true;
          this.radius = radius || 10;
          this.wander = 0.15;
          this.theta = random( TWO_PI );
          this.drag = 0.92;
          this.color = '#fff';
          this.x = x || 0.0;
          this.y = y || 0.0;
          this.vx = 0.0;
          this.vy = 0.0;
        },
        move: function() {
          this.x += this.vx;
          this.y += this.vy;
          this.vx *= this.drag;
          this.vy *= this.drag;
          this.theta += random( -0.5, 0.5 ) * this.wander;
          this.vx += sin( this.theta ) * 0.1;
          this.vy += cos( this.theta ) * 0.1;
          this.radius *= 0.96;
          this.alive = this.radius > 0.5;
        },
        draw: function( ctx ) {
          ctx.beginPath();
          ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
          ctx.fillStyle = this.color;
          ctx.fill();
        }
      };
      var MAX_PARTICLES = 280;
    /*  var COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ]; */
      var COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#FFC729', '#A17805', '#382a03', '#F9D423']
      var particles = [];
      var pool = [];
      var demo = Sketch.create({
        container: document.getElementById( 'bubbles' )
      });
      demo.setup = function() {
        // Set off some initial particles.
        var i, x, y;
        for ( i = 0; i < 20; i++ ) {
          x = ( demo.width * 0.3 ) + random( -90, 90 );
          y = ( demo.height * 0.3 ) + random( -90, 90 );
          demo.spawn( x, y );
        }
      };
      demo.spawn = function( x, y ) {
        if ( particles.length >= MAX_PARTICLES )
          pool.push( particles.shift() );
        particle = pool.length ? pool.pop() : new Particle();
        particle.init( x, y, random( 5, 40 ) );
        particle.wander = random( 0.5, 2.0 );
        particle.color = random( COLOURS );
        particle.drag = random( 0.9, 0.99 );
        theta = random( TWO_PI );
        force = random( 2, 8 );
        particle.vx = sin( theta ) * force;
        particle.vy = cos( theta ) * force;
        particles.push( particle );
      }
      demo.update = function() {
        var i, particle;
        for ( i = particles.length - 1; i >= 0; i-- ) {
          particle = particles[i];
          if ( particle.alive ) particle.move();
          else pool.push( particles.splice( i, 1 )[0] );
        }
      };
      demo.draw = function() {
        demo.globalCompositeOperation  = 'lighter';
        for ( var i = particles.length - 1; i >= 0; i-- ) {
          particles[i].draw( demo );
        }
      };
      demo.mousemove = function() {
        var particle, theta, force, touch, max, i, j, n;
        for ( i = 0, n = demo.touches.length; i < n; i++ ) {
          touch = demo.touches[i], max = random( 1, 4 );
          for ( j = 0; j < max; j++ ) demo.spawn( touch.x, touch.y );
        }
      };
      /* color particles end */
