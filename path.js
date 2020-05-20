

var cols =30;
var rows =30;
var grid = new Array(cols)
var closedSet =[]
var openSet =[]
var start;
var end;
var l;
var path=[];
var current;
var nosolution = false;
var cnv;
var running;

function spot(i,j)
{
  this.i =i;
  this.j =j;
  this.f =0;
  this.g =0;
  this.h =0;
  this.neighbours =[]
  this.previous;
  this.block = false;
  this.start = false;
  this.end = false;

  var rand = random(0,1)
  if (rand<0.3)
  {
    this.block = true
  }

   this.findNeighbours = function()
  {
   if (this.i<grid.length -1)
  {
    this.neighbours.push(grid[this.i + 1][this.j])
  }
  if (this.i>0)
 {
   this.neighbours.push(grid[this.i - 1][this.j])
 }
 if (this.j<grid[0].length-1)
{
  this.neighbours.push(grid[this.i][this.j + 1])
}
if (this.j>0)
{
 this.neighbours.push(grid[this.i][this.j -1])
}
if (this.i>0 && this.j>0)
{
 this.neighbours.push(grid[this.i-1][this.j -1])
}
if (this.i<cols-1 && this.j>0)
{
 this.neighbours.push(grid[this.i+1][this.j -1])
}
if (this.i<cols-1 && this.j<rows-1)
{
 this.neighbours.push(grid[this.i+1][this.j +1])
}
if (this.i>0 && this.j<cols-1)
{
 this.neighbours.push(grid[this.i-1][this.j +1])
}
return this.neighbours

}

  this.show = function(col)
  {
     stroke(0)
      fill(col)
    if (this.block)
      {
        fill(0)
      }
      if (this==start)
      {
        fill(0,255,0)
      }
      if (this==end)
      {
        fill(255,0,0)
      }

      square(this.i*l,this.j*l,l)
  }
}

function setup()
{
  play = false;
   cnv = createCanvas(800,800);
   start =0;
   end =0
   //cnv.mouseClicked(cnvClick())
  for(let i=0;i<cols;i++)
  {
    grid[i]= new Array(rows)
  }

  for(let i=0;i<cols;i++)
  {
     for (let j=0;j<rows;j++)
     grid[i][j]= new spot(i,j);
  }

  start = grid[0][0]
  end = grid[cols-1][rows-1]
//  start.start = true;
  //end.end = true;
  openSet.push(start)
  l = height/rows;
}

function draw()
{

console.log(play)
  background(255)
  for(let i=0;i<cols;i++)
  {
     for (let j=0;j<rows;j++)
     grid[i][j].show(255);
  }
if (play==true && start !=0 && end !=0)
{
    //console.log(play)
  //console.log("enter loop")
     running = true;

   $((document).getElementsByClassName("thinkGroup")).show()
   end.block = false;
   start.block = false;
if (openSet.length>0)
{

  var winner = 0;
  for(let i=0;i<openSet.length;i++)
  {
     if (openSet[i].f <openSet[winner].f)
        winner = i;
  }

  if (openSet[winner] == end)
  {
    running = false;
   //console.log("done")
    var temp = end// end doesn't have previious!!
    path.push(temp);
    $((document).getElementById("done")).show()
    $((document).getElementsByClassName("thinkGroup")).hide()
    while (temp.previous)
    {
      temp = temp.previous
        path.push(temp)
    }
    noLoop();
  }
   else {
         //console.log("entered else")
         closedSet.push(openSet[winner])
        current = openSet[winner]
        openSet.splice(winner,1);

        var neighbours = current.findNeighbours()
        for (var i=0;i<neighbours.length;i++)
        {
          var neighbour = neighbours[i]
          if (!closedSet.includes(neighbour) && !neighbour.block)
          {
            var tempG = current.g + 1 ;
            if (openSet.includes(neighbour))
          {
            if (tempG<neighbour.g)
            {
               neighbour.g = tempG
               neighbour.previous = current;
            }
           } else
           {
             neighbour.g = tempG
             openSet.push(neighbour)
             neighbour.previous = current;
           }
            neighbour.h = heuristic(neighbour,end);
            neighbour.f = neighbour.g + neighbour.h;
          }
        }
     }
  }
  else
   if (end!=0 && start !=0)
  {
    nosolution = true;
    $((document).getElementById("noSol")).show()
    $((document).getElementsByClassName("thinkGroup")).hide()
    running = false;
    noLoop();
  }
  for (let i=0;i<path.length;i++)
  {
    path[i].show(color(0,0,255))
  }

}
}
  function heuristic(a,b)
  {
    var d = dist(a.i,a.j,b.i,b.j)
    return d;
  }

  function mouseClicked()
  {
    if (mouseX<width && mouseY<height &&!running)
    {
      for (i=0;i<cols;i++)
      {
        for(j=0;j<rows;j++)
         {
           var x =grid[i][j].i *l
           var y =grid[i][j].j *l
          if (mouseX>x && mouseX<x+l && mouseY>y && mouseY<y+l)
           {
              var id = (document).querySelector('.active').id

               if (id =="start")
                {
                 start = grid[i][j];
                 openSet = []
                 openSet.push(start)
                 return;
                }
                if (id =="end")
                 {
                   end = grid[i][j];
                   return;
                  }
                 if (id =="blocks")
                  {
                    grid[i][j].block = true;
                  }
            }
         }
      }
    }
  }

  function mouseDragged()
  {
    if (mouseX<width && mouseY<height && !running)
    for (i=0;i<cols;i++)
    {
      for(j=0;j<rows;j++)
       {
         var x =grid[i][j].i *l
         var y =grid[i][j].j *l
        if (mouseX>x && mouseX<x+l && mouseY>y && mouseY<y+l)
         {
            var id = (document).querySelector('.active').id
            if (id =="blocks")
             {
               grid[i][j].block = true;
             }
         }
       }
     }
}
