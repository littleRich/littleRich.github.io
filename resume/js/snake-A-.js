(function () {
  // A*
  // 通过遍历目标点附近的点，把各个点到目标和起点的距离总和得到的值，找到最小的点，加入结果中
  // 再把这个点作为目标点，计算附近的点，然后得到最佳路径

  // from [0,0]
  // to [99,99]
  // map [[0,0],[0,1]....[99,99]]
  var resultList = [];
  var openList = [];
  var _map;
  var H;
  var W;
  var x,
      y,
      i,
      l,
      current, // 当前需要计算的点
      children, // 当前点附近的点
      neighbor, // 邻居点
      step, 
      start,
      end,
      path;


  function AStarSearch (start, end, map, stones) {
    _map = map;
    H = map.length;
    W = map[0].length;
    start = start;
    end = end;
    openList = [];

    // console.log(stones)
    // 初始化 地图各个点
    for( x = 0; x < W; x++ ) {
      for ( y = 0; y < H; y++ ) {
        // console.log(W, H, x,y)
        _map[y][x].x = x;
        _map[y][x].y = y;
        _map[y][x].cost = Infinity;
        _map[y][x].open = false;
        _map[y][x].closed = false;
        _map[y][x].parent = null;
      }
    }

    stones.forEach(function(stone) {
      _map[stone[1]][stone[0]].closed = true;
    });
    start.cost = 0;
    start.open = true;
    openList.push(start);
    // console.log(openList,start)
    while( openList.length ) {
      
      // 得到周围点总分最低的点
      current = openList.sort( function (a, b) {
        return a.sum - b.sum;
      }).shift();
      // console.log(current);
      // 获取周围的点
      children = getChildren( current, end );
      current.closed = true;
      for(i = 0, l = children.length;i < l; i++) {
        // 到达终点
        if(children[i].toTarget === 0) {
          step = children[i].parent;
          path = [];
          while(step.cost !== 0) {
            path.push(step);
            step = step.parent;
            // console.log(step.y,step.x)
          }

          return path.reverse();
        }

        // 如果这个点不是在openlist中，加入到数组中
        if(!children[i].open) {
          children[i].open = true;
          openList.push(children[i]);
        }
      }
    }

    // 没有路径
    return null;
    
  }

  // 获取周围的点
  // 由于只需要求上下左右四个点（贪吃蛇只能上下左右）
  function getChildren (parent, end) {
    children = [];

    // left
    // 如果这个点是最左边的点，那么不计算这个点
    if(parent.x > 0) {
      neighbor = _map[parent.y][parent.x - 1];
      if( !neighbor.closed && neighbor.cost > parent.cost + 10) {
        neighbor.parent = parent;
        neighbor.cost = parent.cost + 10;
        neighbor.toTarget = getManhattan( neighbor, end);
        neighbor.sum = getSum( neighbor.cost, neighbor.toTarget );
        children.push(neighbor);
      }
    }
    // right
    // 如果这个点是最右边的点，那么不计算这个点
    if(parent.x < W - 1) {
      neighbor = _map[parent.y][parent.x + 1];
      if( !neighbor.closed && neighbor.cost > parent.cost + 10) {
        neighbor.parent = parent;
        neighbor.cost = parent.cost + 10;
        neighbor.toTarget = getManhattan( neighbor, end);
        neighbor.sum = getSum( neighbor.cost, neighbor.toTarget );
        children.push(neighbor);
      }
    }
    // top
    // 如果这个点是最顶部的点，那么不计算这个点
    if(parent.y > 0) {
      neighbor = _map[parent.y - 1][parent.x];
      if( !neighbor.closed && neighbor.cost > parent.cost + 10) {
        neighbor.parent = parent;
        neighbor.cost = parent.cost + 10;
        neighbor.toTarget = getManhattan( neighbor, end);
        neighbor.sum = getSum( neighbor.cost, neighbor.toTarget );
        children.push(neighbor);
      }
    }
    // right
    // 如果这个点是最低部的点，那么不计算这个点
    if(parent.y < H - 1) {
      neighbor = _map[parent.y + 1][parent.x];
      if( !neighbor.closed && neighbor.cost > parent.cost + 10) {
        neighbor.parent = parent;
        neighbor.cost = parent.cost + 10;
        neighbor.toTarget = getManhattan( neighbor, end);
        neighbor.sum = getSum( neighbor.cost, neighbor.toTarget );
        children.push(neighbor);
      }
    }
    // console.log(neighbor.cost, parent.cost)
    
    // ctx.fillStyle = '#ccc'
    // ctx.fillRect(neighbor.y*10, neighbor.x*10, 10, 10)
    // ctx.fillStyle = '#439423'
    // ctx.fillRect(parent.y*10, parent.x*10, 10, 10)
    // ctx.fillStyle = "#000"
    // console.log(neighbor)
    return children;
  }

  // 计算曼哈顿距离
  function getManhattan (start, end) {
    // console.log(start.x +' '+start.y,end.x +' '+ end.y)
    return Math.abs(start.x - end.x) + Math.abs(start.y - end.y);
  }

  // 计算综合
  function getSum ( a, b ) {
    return a + b;
  }

  window.AStarSearch = AStarSearch;
})();