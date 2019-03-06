function makeArray2D(col,fil){
    
    let arr = new Array(col);

    for(let i=0; i<arr.length;i++){
        arr[i] = new Array(fil);
       
    }

    return arr;
   
}
var grid;
let col;
let fil;
let resolucion=5;

function setup(){
    createCanvas(1200,800);
    col= width/resolucion;
    fil= height/resolucion;
    
    grid = makeArray2D(col,fil);
    for(let i=0; i< col ;i++){
            for(let j=0; j<fil;j++){
                grid[i][j] = floor(random(3));
            }
        }
}

function draw(){
    background(0)

    for(let i=0; i< col ;i++){
        for(let j=0; j<fil;j++){
            let x= i*resolucion;
            let y = j*resolucion;

            if(grid[i][j]==1){
                fill(color(250,0,0));
                stroke(0);
                rect(x,y,resolucion-1,resolucion-1);
            }else if(grid[i][j]==2){
                fill(color(0,250,0));
                stroke(0);
                rect(x,y,resolucion-1,resolucion-1);
            }
            
        }
    }

    let next = makeArray2D(col,fil);

        for (let i = 0; i < col; i++) {
            for (let j = 0; j < fil; j++) {
                let state = grid[i][j];
                
                //vecinos con vida
                let vecinos = ContVecinos(grid, i, j);
                let virus = contVirus(grid, i, j);
            
                let bool = virusCerca(grid, i, j);

                if (state == 0 && vecinos == 3) {
                    next[i][j] = 1;
                }else if(state == 0 && virus == 4){
                    next[i][j] = 2;
                    }else if (state == 1 && (vecinos < 2 || vecinos > 3)) {
                        next[i][j] = 0;
                        }else if(state == 2 && (virus < 2 || virus > 5)) {
                                next[i][j] = 0;
                            }else if(state == 1 && bool){
                                next[i][j] = 2;
                            }/*else if(state == 1 && virus>vecinos){
                                    next[i][j] = 2;
                                }else if(state == 2 && virus<vecinos){
                                        next[i][j] = 1;
                                    }else if(state== 2|| state ==1 &&virus ==vecinos){
                                            next[i][j] = 0;
                                        }*/
                    
                    else {
                        next[i][j] = state;
                    }   
            }
       
    }
    grid = next;
}

function ContVecinos(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let colum = (x + i + col) % col;
        let filas = (y + j + fil) % fil;
        sum += grid[colum][filas];
      }
    }
    sum -= grid[x][y];
    return sum;
  }

  function contVirus(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let colum = (x + i + col) % col;
        let filas = (y + j + fil) % fil;
        if(grid[colum][filas]==2);
                sum ++;
        }
    }
    sum --;
    return sum;
  }

  function virusCerca(grid, x, y){
    let bool = false;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let colum = (x + i + col) % col;
        let filas = (y + j + fil) % fil;
        if(grid[colum][filas]==2){
            bool=true;    
            return bool
        }
      }
    }
    
    return bool;
  }   
