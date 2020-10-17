
let barraAltura,
    barraLargura,
    playerPosX,
    playerPosY,
    playerSpeed,
    bolaDiametro,
    bolaX,
    bolaY,
    vidas,
    bolaSpeed,
    pontos,
    colisao;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d')

function inicializar() {
  barraAltura = 15;
  barraLargura = 90;
  playerSpeed = 30;
  playerPosX = (canvas.width - barraLargura) / 2;

  bolaDiametro = 10;
  bolaSpeed = 10;
  bolaX = canvas.width / 2;
  bolaY = 20;

  pontos = 0;
  colisao = null;
  vidas = 3;
  ctx.fillRect(playerPosX, canvas.height-barraAltura, barraLargura,barraAltura)
  document.addEventListener("keydown", keydown)
  setInterval(gameLoop, 60)
}

function keydown(e){
    if(e.keyCode == 37 || e.keyCode == 65){
        if(playerPosX > 0){
            playerPosX -= playerSpeed
        }
    }
    if(e.keyCode == 39 || e.keyCode == 68){
        if(playerPosX < canvas.width-barraLargura){
            playerPosX += playerSpeed
        }
    }
}

function gameLoop(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillRect(playerPosX,canvas.height-barraAltura,barraLargura,barraAltura)
    if(bolaY <= canvas.height){
        bolaY+=bolaSpeed
    } else {
        bolaX = Math.floor(Math.random()*600)
        bolaY = -10
        colisao = false
    }
    
    ctx.beginPath()
    ctx.arc(bolaX,bolaY,bolaDiametro,0,Math.PI*2,true)
    ctx.fill()

    if( ( bolaX > playerPosX && bolaX < playerPosX + barraLargura ) && bolaY >= canvas.height - barraAltura && colisao == false ) {
        pontos++
        colisao = true
        bolaSpeed += bolaSpeed * (pontos/500)
    }
    if ((bolaX < playerPosX || bolaX > playerPosX + barraLargura) && bolaY >= canvas.height && colisao == false ){
        vidas--
        colisao = true

    }
    if(vidas <= 0){
        ctx.font = '30pt Comic Sans MS'
        ctx.fillText(`Pontos: ${pontos} | G a m e o v e r`, 0, 50)
        bolaSpeed = 0
    } else {
        ctx.font = '30pt Comic Sans MS'
        ctx.fillText(`Pontos: ${pontos} | Vidas: ${vidas}`, 0, 50)

    }
}
function restart(){
    window.location.reload()
}