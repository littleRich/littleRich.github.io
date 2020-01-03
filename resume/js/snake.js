var c = document.querySelector("#c");
var ctx = c.getContext('2d');
var W = window.innerWidth;
var H = window.innerHeight;

ctx.globalAlpha=1

c.width = W;
c.height = H;

var DOT_SIZE = 17;
var i,
    _this,
    next,
    x,y,
    map = [],
    len;
for(y = 0; y < H / DOT_SIZE; y++) {
  map[y] = [];
  for(x = 0; x < W / DOT_SIZE; x++) {
    map[y][x] = {};
  }
}
var snake = {
  body: [[0,0]],
  food: [1,3],
  path: [],
  render: function() {
    _this = this;
    ctx.fillStyle = getRandomColor();
    _this.body.forEach(function(arr) {
      map[arr[1]][arr[0]].closed = true;
    });
    _this.path = _this.findPath({
      x: _this.food[0],
      y: _this.food[1]
    });
    if(_this.path) {
      _this.path = _this.path.map(function(obj){
            return [obj.x,obj.y]}
      );
      if(_this.path.length !== 0) {
        // _this.path.forEach(function(point) {
        //   _this.drawDot(point);
        // });
        _this.getPath(_this.path);
      } else if(getManhattan(_this.body[0], _this.food) === 1) {
        _this.getPoint();
      }
    } else {
      // 如果找不到路了，尝试跳点
      // var tmpPoint = getRandomPoint();
      // while(!_this.findPath(tmpPoint)) {
      //   tmpPoint = getRandomPoint();
      // }
    }

    ctx.fillStyle = "#000";
    _this.body.forEach(function(point) {
      _this.drawDot(point);
    });
    ctx.fillStyle = getRandomColor();
    _this.drawDot(_this.food);
  },
  getPoint: function() {
    this.body.unshift(this.food);

    while(1) {
      this.food = getRandomPoint();
      if(this.isContain(this.food)) {
        this.food = getRandomPoint();
      } else {
        break;
      }
    }
  },
  getPath: function(path) {
    this.body.unshift(path[0]);
    this.body.pop();
  },
  findPath: function(target) {
    return AStarSearch({
      x: _this.body[0][0],
      y: _this.body[0][1]
    }, target, map, this.body);
  },
  drawDot: function(position) {
    ctx.fillRect(position[0]*DOT_SIZE, position[1]*DOT_SIZE, DOT_SIZE, DOT_SIZE);
  },
  isContain: function(point) {
    var checkResult = false;;
    this.body.forEach(function(body) {
      if(body[0] == point[0] && body[1] == point[1]) {
        checkResult = true;
      }
    });
    return checkResult;
  },
}

function render() {
  ctx.clearRect(0,0,W,H);
  snake.render();
  requestAnimationFrame(render);
}

function getRandomColor() {
  return "#"+Math.floor(Math.random()*0xFFFFFF).toString(16);
}
function getRandomPoint() {
  return [~~(Math.random()*W/DOT_SIZE), ~~(Math.random()*H/DOT_SIZE)];
}
// 计算曼哈顿距离
function getManhattan (start, end) {
  return Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);
}

render()
// var timer = setInterval(render,400);