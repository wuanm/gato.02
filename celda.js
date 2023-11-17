class Celda{
    constructor(x,y,tamanoCelda,taVertiCelda){
        this.x=x;
        this.y=y;
        this.tamanoCelda=tamanoCelda;
        this.taVertiCelda=taVertiCelda;
        this.simbolo="";
    }
  colocarSimbolo(simbolo){
        if(this.simbolo===""){
          this.simbolo=simbolo;
          return true; // si se coloco el simbolo
        }else{
          return false; //si ya tiene simbolo
        }                                                      

}
  dibujar(){
    textSize(40);
    textAlign(CENTER,CENTER);
    text(this.simbolo, this.x + this.tamanoCelda / 2, this.y + this.taVertiCelda / 2);
  }
}