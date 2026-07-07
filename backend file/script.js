
p=console.log;
p("Atharva Boy");
const board_matrix = Array(20).fill().map(() => Array(10).fill(0));// main  board matrix everthing starts from here 
const grid_box=document.getElementById("grid-box");
const start=document.getElementById("start");
const paus=document.getElementById("pause");
const playin=document.getElementById("play");
const fast=document.getElementById("fast");
const lefti=document.getElementById("left");
const righti=document.getElementById("right");
let interval=500;
let fast_flag=false;
let side_control=false;
let popie=0;
let score=0;
const result=document.getElementById("result");
result.innerHTML="Your score is "+score;
const first_page=document.getElementById("game-play");
const result_page=document.getElementById("result-page");
fast.addEventListener("click",()=>{
    if(fast_flag==false){
        fast_flag=true;
        interval=500;
    }
    else{
        fast_flag=false;
        interval=1000;
    }

});

let game=null;
let pause=false;
var piece_type=1;
var pieces={
     piece1:{
     x:1,y:1
    },
     piece2:{
    x:1,y:1
    },
     piece3:{
         x:1,y:1
    },
     piece4:{
        x:1,y:1
    }
};
var check_piece={
     piece1:{
         x:1,y:1
    },
     piece2:{
      x:1,y:1
    },
     piece3:{
      x:1,y:1
    }
   
}
var generator_point={
    x:1,
    y:1
};
function getInt(min,max){
    const min_no=Math.ceil(min);
    const max_no=Math.floor(max);

    return Math.floor(Math.random()*(max_no-min_no+1)+min_no);

}
p(getInt(1,10));
// generating the point and the piece type to be played on 
function generator(){
    generator_point.y=2;
    generator_point.x=getInt(1,8);
     check_piece={

     piece1:{
        x:1,
        y:1
    },
     piece2:{
        x:1,
        y:1
    },
     piece3:{
        x:1,
        y:1
    }
}

    pieces={
     piece1:{
        x:1,
        y:1
    },
     piece2:{
        x:1,
        y:1
    },
     piece3:{
        x:1,
        y:1
    },
     piece4:{
        x:1,
        y:1
    }
};

    
}
p(generator_point);

// assigning the pieces variable via generator point 
function block_pieces(){
    

    switch (piece_type){
        case 1:
            pieces.piece3=generator_point;
            pieces.piece1={
                x:generator_point.x,
                y:generator_point.y -1
            }
             pieces.piece2={
                x:generator_point.x+1,
                y:generator_point.y -1
            },
             pieces.piece4={
                x:generator_point.x+1,
                y:generator_point.y 
            }
            break;
        case 2:
            pieces.piece2=generator_point;
            pieces.piece1={
                x:generator_point.x,
                y:generator_point.y -1
            }
             pieces.piece3={
                x:generator_point.x,
                y:generator_point.y+1
            },
             pieces.piece4={
                x:generator_point.x,
                y:generator_point.y+2 
            }
            break;
        case 3:
            pieces.piece4=generator_point;
            pieces.piece1={
                x:generator_point.x,
                y:generator_point.y -1
            }
             pieces.piece3={
                x:generator_point.x-1,
                y:generator_point.y
            },
             pieces.piece2={
                x:generator_point.x+1,
                y:generator_point.y-1
            }
            break;
        case 4:
            pieces.piece3=generator_point;
            pieces.piece1={
                x:generator_point.x-1,
                y:generator_point.y -1
            }
             pieces.piece2={
                x:generator_point.x,
                y:generator_point.y-1
            },
             pieces.piece4={
                x:generator_point.x+1,
                y:generator_point.y
            }
            break;
        case 5:
            pieces.piece2=generator_point;
            pieces.piece1={
                x:generator_point.x,
                y:generator_point.y -1
            }
             pieces.piece3={
                x:generator_point.x,
                y:generator_point.y+1
            },
             pieces.piece4={
                x:generator_point.x+1,
                y:generator_point.y+1
            }
            break;
        case 6:

           pieces.piece2=generator_point;
            pieces.piece1={
                x:generator_point.x-1,
                y:generator_point.y 
            }
             pieces.piece3={
                x:generator_point.x+1,
                y:generator_point.y
            },
             pieces.piece4={
                x:generator_point.x,
                y:generator_point.y+1
            }
            break;
        case 7:
            pieces.piece2=generator_point;
            pieces.piece1={
                x:generator_point.x,
                y:generator_point.y -1
            }
             pieces.piece3={
                x:generator_point.x,
                y:generator_point.y+1
            },
             pieces.piece4={
                x:generator_point.x-1,
                y:generator_point.y+1
            }
    }

}

function allocating(){
    board_matrix[pieces.piece1.y][pieces.piece1.x]=1;
    board_matrix[pieces.piece2.y][pieces.piece2.x]=1;
    board_matrix[pieces.piece3.y][pieces.piece3.x]=1;
    board_matrix[pieces.piece4.y][pieces.piece4.x]=1;
}
function generate_matrix(){
    piece_type=getInt(1,7); 
    generator();
    block_pieces();
    allocating();
}
// generate_matrix();

function remvove_trail(obj){
     board_matrix[obj.y-1][obj.x]=0;

}
function de_allocation(){
    board_matrix[pieces.piece1.y][pieces.piece1.x]=0;
    board_matrix[pieces.piece2.y][pieces.piece2.x]=0;
    board_matrix[pieces.piece3.y][pieces.piece3.x]=0;
    board_matrix[pieces.piece4.y][pieces.piece4.x]=0;
}


function moving_pieces(){
    // de_allocation(); 
   
    generator_point.y=generator_point.y+1;
   
        switch (piece_type){
        case 1:
            pieces.piece3=generator_point;
            pieces.piece1={
                x:generator_point.x,
                y:generator_point.y -1
            }
             pieces.piece2={
                x:generator_point.x+1,
                y:generator_point.y -1
            },
             pieces.piece4={
                x:generator_point.x+1,
                y:generator_point.y 
            }
            check_piece.piece1=pieces.piece3;
            check_piece.piece2=pieces.piece4;
            allocating();
            coloring();
            break;
        case 2:
            pieces.piece2=generator_point;
            pieces.piece1={
                x:generator_point.x,
                y:generator_point.y -1
            }
             pieces.piece3={
                x:generator_point.x,
                y:generator_point.y+1
            },
             pieces.piece4={
                x:generator_point.x,
                y:generator_point.y+2 
            }
            check_piece.piece1=pieces.piece4;

            allocating();
            coloring();
            break;
        case 3:
            pieces.piece4=generator_point;
            pieces.piece1={
                x:generator_point.x,
                y:generator_point.y -1
            }
             pieces.piece3={
                x:generator_point.x-1,
                y:generator_point.y
            },
             pieces.piece2={
                x:generator_point.x+1,
                y:generator_point.y-1
            }
            check_piece.piece1=pieces.piece3;
            check_piece.piece2=pieces.piece4;
            check_piece.piece3=pieces.piece2;

            allocating();
            coloring();
            break;
        case 4:
            pieces.piece3=generator_point;
            pieces.piece1={
                x:generator_point.x-1,
                y:generator_point.y -1
            }
             pieces.piece2={
                x:generator_point.x,
                y:generator_point.y-1
            },
             pieces.piece4={
                x:generator_point.x+1,
                y:generator_point.y
            }
            check_piece.piece1=pieces.piece1;
            check_piece.piece2=pieces.piece3;
            check_piece.piece3=pieces.piece4;
             
            allocating();
            coloring();
            break;
        case 5:
            pieces.piece2=generator_point;
            pieces.piece1={
                x:generator_point.x,
                y:generator_point.y -1
            }
             pieces.piece3={
                x:generator_point.x,
                y:generator_point.y+1
            },
             pieces.piece4={
                x:generator_point.x+1,
                y:generator_point.y+1
            }
            check_piece.piece1=pieces.piece3;
            check_piece.piece2=pieces.piece4;
        
            allocating();
            coloring();
            break;
        case 6:

           pieces.piece2=generator_point;
            pieces.piece1={
                x:generator_point.x-1,
                y:generator_point.y 
            }
             pieces.piece3={
                x:generator_point.x+1,
                y:generator_point.y
            },
             pieces.piece4={
                x:generator_point.x,
                y:generator_point.y+1
            }
            check_piece.piece1=pieces.piece1;
            check_piece.piece2=pieces.piece4;
            check_piece.piece3=pieces.piece3;
           
            allocating();
            coloring();
            break;
        case 7:
            pieces.piece2=generator_point;
            pieces.piece1={
                x:generator_point.x,
                y:generator_point.y -1
            }
             pieces.piece3={
                x:generator_point.x,
                y:generator_point.y+1
            },
             pieces.piece4={
                x:generator_point.x-1,
                y:generator_point.y+1
            }
            check_piece.piece1=pieces.piece3;
            check_piece.piece2=pieces.piece4;
 
            allocating();
            coloring();
            break;

      
    }
    
   

}

function checking_piece(x,y){
    if(y==19||board_matrix[y+1][x]==1){
        return false;
    
    }
    return true;
    
}
function pase(){
    p("pause is called ")
    pause=true;
}
function contnue(){
    pause=false;
}

function game_over(){
    for(let i=0;i<10;i++){
        if(board_matrix[3][i]==1){
            first_page.style.display = "none";
        result_page.style.display = "block";

         return false;  
         

        }
    }
}

function play(){
    
    // de_allocation();// it will deallocate all the previous cell to 0 it won't interfere with the all_check() function
    game=setInterval(() => {
        if(pause){
            p(pause);
            return;
        }
        de_allocation();

        if(all_check()==false){ 
            allocating();// calling it here to trigger the reset_block;
            pop();// it will pop the blocks if they are full occupied the row entirely 
            if(game_over()==false){
                p("game is over");
                p("all_check()")
                pase();
                clearInterval(game);

            } else{

             reset_block(); 
             p("rerun");  

            }         
        } 
        else{
        moving_pieces();
        }
     
    }, interval);
}


// checking the all condition to move the block piece or not 
function all_check(){
       switch (piece_type){
        case 1:
          if(!checking_piece(check_piece.piece1.x,check_piece.piece1.y))return false;
          if(!checking_piece(check_piece.piece2.x,check_piece.piece2.y))return false;
            break;
        case 2:
           if(!checking_piece(check_piece.piece1.x,check_piece.piece1.y))return false; 
            
            break;
        case 3:
           if(!checking_piece(check_piece.piece1.x,check_piece.piece1.y)) return false;
           if(!checking_piece(check_piece.piece2.x,check_piece.piece2.y)) return false;
            if(! checking_piece(check_piece.piece3.x,check_piece.piece3.y)) return false;
           
            break;
        case 4:
           if (!checking_piece(check_piece.piece1.x,check_piece.piece1.y))return false ;
            if(!checking_piece(check_piece.piece2.x,check_piece.piece2.y)) return false;
            if(!checking_piece(check_piece.piece3.x,check_piece.piece3.y)) return false;
            break;
        case 5:
            if (!checking_piece(check_piece.piece1.x,check_piece.piece1.y))return false ;
            if(!checking_piece(check_piece.piece2.x,check_piece.piece2.y)) return false;
            
            
            break;
        case 6:
           if (!checking_piece(check_piece.piece1.x,check_piece.piece1.y))return false ;
            if(!checking_piece(check_piece.piece2.x,check_piece.piece2.y)) return false;
            if(!checking_piece(check_piece.piece3.x,check_piece.piece3.y)) return false;
        
            break;
        case 7:
          if (!checking_piece(check_piece.piece1.x,check_piece.piece1.y))return false ;
         if(!checking_piece(check_piece.piece2.x,check_piece.piece2.y)) return false;
            
            break;
        default:
            return true;
            break;

      
    }
    return true;
    
}
/// making of the grid 
function create_container(){// creating the container and assigning the id to the cell element 
    for(var i=0;i<20;i++){
        for(var j=0;j<10;j++){
            const cell=document.createElement("div");
            cell.id=("values"+i+"value"+j);
            cell.classList.add("item");
            grid_box.appendChild(cell);
        }

    }

}

// checking and coloring the box 
function coloring(){
      for(var i=0;i<20;i++){
        for(var j=0;j<10;j++){
            if(board_matrix[i][j]==1){
                const cell_l=document.getElementById("values"+i+"value"+j);
               cell_l.style.backgroundColor="red";
            }
            else{
                const cell_u=document.getElementById("values"+i+"value"+j);
                cell_u.style.backgroundColor="yellow";
            }
         
        }

    }

}
start.addEventListener("click",()=>{
    piece_type=1;// developing the piece type 

    generator();// developing the pieces and the spawn point values and also reassign the checkpoint and pieces ;

    block_pieces();// assignes the generator point values to the piece accordingly 

    allocating();// allocating the '1' to the board matrix acc to the x and y of pieces ;

    create_container();// this create container and assign the id to the cell 

    coloring();// coloring the cell acc to the '1' and 0' 

    play();// starts moving the piece untill the bottom 


});
paus.addEventListener("click",()=>{
    if(pause==false){
        pause=true;
        paus.innerText="play";
    }
    else{
        pause=false;
        paus.innerText="pause";
    }
})

function reset_block(){
    clearInterval(game);

    piece_type=getInt(1,7);

    generator();

    block_pieces();

    allocating();

    coloring();

    play();


}
function left_move(){
    p("clicked");
   if(left_sideways()==true){
    p("moved");
    de_allocation();
    generator_point.x--;
    block_pieces();
    allocating();
    coloring();
   }
}
function right_move(){
      p("clicked");
    if(right_sideways()==true){
    p("moved");
    de_allocation();
    generator_point.x++;
    block_pieces();
    allocating();
    coloring();
   }
}

lefti.addEventListener("click",()=>{
    left_move();

});
righti.addEventListener("click",()=>{
    right_move()
});
lefti.addEventListener("keydown",(event)=>{
    if(event.key=="ArrowLeft"){
        left_move();
    }
    
});
righti.addEventListener("keydown",(event)=>{
    if(event.key=="ArrowRight"){
        right_move();
    }
});


function right_sideways(){
    switch (piece_type){
        case 1:
          if(pieces.piece2.x<9){
            return true;
          }
            break;
        case 2:
             if(pieces.piece2.x<9){
            return true;
          }
            break;
        case 3:
            if(pieces.piece2.x<9){
            return true;
          }
            break;
        case 4:
         if(pieces.piece4.x<9){
            return true;
          }
            break;
        case 5:
             if(pieces.piece4.x<9){
            return true;
          }
            break;
        case 6:

           if(pieces.piece3.x<9){
            return true;
          }
            break;
        case 7:
        if(pieces.piece3.x<9){
            return true;
          }
          break;
        default:
            return false;
            break;
    }
    return false;
}
function left_sideways(){
    switch (piece_type){
        case 1:
          if(pieces.piece1.x>0){
            return true;
          }
            break;
        case 2:
             if(pieces.piece1.x>0){
            return true;
          }
            break;
        case 3:
            if(pieces.piece3.x>0){
            return true;
          }
            break;
        case 4:
         if(pieces.piece1.x>0){
            return true;
          }
            break;
        case 5:
             if(pieces.piece3.x>0){
            return true;
          }
            break;
        case 6:

           if(pieces.piece1.x>0){
            return true;
          }
            break;
        case 7:
        if(pieces.piece4.x>0){
            return true;
          }
          break;
        default:
            return false;
            break;
    }
    return false;
}
function pop(){
    
    for (let i=19;i>=0;i--){
        popie=0;
        for(let j=0;j<10;j++){
          if(board_matrix[i][j]==1){
            popie++;
            p("trig")
          }
        }
        if(popie==10){
            erase(i);
            score=score+10;

        }
        
    
    }
}
function erase(i){
    p("trigered");
    for(let j=0;j<10;j++){
      board_matrix[i][j]=0;
    }
}

game_data={
    
}
