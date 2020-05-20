var play = false;
var start;
$ (document).ready(function()
{

$("button").on("click",function()
  {
     $ (".active").removeClass("active");
     $(this).addClass("active");
     if (!running)
       {
         play = false;
       }
  });




$("#go").on("click",function()
{
  $((document).getElementById("noSol")).hide()
   play = true;
   console.log("clicked")
});
$("#empty").on("click",function()
{
  console.log("enter")
  $((document).getElementById("noSol")).hide()
  $((document).getElementById("done")).hide()
  $((document).getElementsByClassName("thinkGroup")).hide()
  for(let i=0;i<cols;i++)
  {
     for (let j=0;j<rows;j++)
     grid[i][j].block = false;
  }
  openSet =[]
  closedSet =[]
  path =[]
  start= 0;
  end =0;
  //play = false
  loop();
});



})
