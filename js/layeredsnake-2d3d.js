function draw(){
    buffer.clearRect(
      0,
      0,
      width,
      height
    );

    var loop_counter = layers.length - 1;
    do{
        if(loop_counter > 0){
            // calculate move towards target
            var dx = Math.abs(layers[loop_counter][0] - layers[loop_counter][3]);
            var dy = Math.abs(layers[loop_counter][1] - layers[loop_counter][4]);

            if(dx > dy){
                dy = dy / dx * 5;
                dx = 5;

            }else if(dy > dx){
                dx = dx / dy * 5;
                dy = 5;

            }else{
                dx = 2;
                dy = 2;
            }

            // move
            layers[loop_counter][0] += layers[loop_counter][0] > layers[loop_counter][3]
              ? -dx
              : dx;
            layers[loop_counter][1] += layers[loop_counter][1] > layers[loop_counter][4]
              ? -dy
              : dy;

            // set new target
            layers[loop_counter][3] = layers[loop_counter - 1][0];
            layers[loop_counter][4] = layers[loop_counter - 1][1];

            // draw
            buffer.fillStyle = layers[loop_counter][2];
            buffer.fillRect(
              layers[loop_counter][0],
              layers[loop_counter][1],
              100,
              100
            );
        }
    }while(loop_counter--);

    canvas.clearRect(
      0,
      0,
      width,
      height
    );
    canvas.drawImage(
      document.getElementById('buffer'),
      0,
      0
    );
}

function generate_layers(){
    layers.length = 0;

    var loop_counter = 99;
    do{
        layers.push([
          random_number(width) - 50,
          random_number(height) - 50,
          '#' + random_hex() + random_hex() + random_hex(),
          0,
          0
        ]);
    }while(loop_counter--);

    layers[0][0] = mouse_x - 50;
    layers[0][1] = mouse_y - 50;
}

function random_hex(){
    return '0123456789abcdef'.charAt(random_number(16));
}

function random_number(i){
    return Math.floor(Math.random() * i);
}

function resize(){
    height = window.innerHeight;
    document.getElementById('buffer').height = height;
    document.getElementById('canvas').height = height;

    width = window.innerWidth;
    document.getElementById('buffer').width = width;
    document.getElementById('canvas').width = width;
}

var buffer = document.getElementById('buffer').getContext('2d');
var canvas = document.getElementById('canvas').getContext('2d');
var height = 0;
var layers = [];
var mouse_x = 0;
var mouse_y = 0;
var width = 0;

window.onresize = resize;
resize();

generate_layers();

setInterval(
  'draw()',
  50
);

window.onkeydown = generate_layers;

window.onmousemove = function(e){
    layers[0][0] = mouse_x - 50;
    layers[0][1] = mouse_y - 50;

    mouse_x = e.pageX;
    mouse_y = e.pageY;
};
