window.onload=()=>{

//CUANDO USAMOS SETTIMEOUT, LOS DELAY SE EJECURAN TODOS AL MISMO TIEMPO OCACIONANDO
//QUE SE LLEGUE A 60 EN UN SEGUNDO ES POR ESO QUE PARA EL CASO 0 ES
//0 * 1000 LUEGO PARA EL  CASO 1: 1 * 1000 Y ASI SUCESIVAMENTE   
const seg = document.getElementById('seg-card')
const min =document.getElementById('min-card')
const hrs = document.getElementById('hrs-card')
const vhrs = document.getElementById('hrs')
const vmins =document.getElementById('mins')
const vseg = document.getElementById('segs')
const form = document.getElementById('form')
let flagx=true
let flagy=true
let flagz=true   


//COMO LA EJECUCION SE DA AL MISMO TIEMPO PUES
//TIMEOUT ES UNA FUNCION ASICRONA ES NECESARIO ESTABLECER DESDE LAS HORAS
//CUANTO DURARAN Y CONFORME VAMOS BAJANDO IREMOS DETERMINANDO LSO LAPSOS
//YA QUE EN ESTA FRACCION ESTAMOS DICIENDO QUE TODOS LOS VALORES DE K
//DEBEN EJECUTARSE SIGUIENTE LA SIGUIENTE FORMUAL DE TIEMPO
//SI FUERAN SOLO K * 1000 ENTONCES TODAS SE EJECUTARIAN EN UN SEGUNDO PERO NO 
//SECUENCIALMENTE YA QUE ES ASINCRONA SINO TODAS ESPERARAN UN SEGUNDO Y  SE EJCUTARAN
//A LA VEZ VEZ LEUGO LO QUE PERJUDICA A LOS MINUTOS Y PEOR A LOS SEGUNDOS POR ESO
//LAS HRS DEMORARAN MAS EN EJECUTARSE Y LOS MINUTOS DEMORARAN SU TIEMPO MAS EL TIMEPO
//DE LAS HRS YA QUE SI SOLO FUESEN J*60*1000 ENTONCES COMENZARA A CONTAR  Y DESUES DE UN TIEMPO
//CONTARA A LA VEZ AMBOS YA QUE ESTAN DESINCRONIZADOS, POR EJEMPLO LOS SEGUNDOS SE MEUVEN MAS RAPIDO
//QUE LOS MINUTOS ASI QUE ESTOS AVANZARAN Y SI NO TIENES AGREGADOS EL PERODO DE LOS MINUTOS ENTONCES
//LLEGARA UN MOMENTO DONDE AMBOS CONTARAN A LA VEZ

/*
form.onsubmit=(e)=>{
    e.preventDefault();    
    for(let k=vhrs.value; k>0 ; k-- ){
            setTimeout(()=>{
                hrs.innerHTML=k
            },k * 60 * 60*1000)
            for(let j = vmins.value; j > 0; j--){
                  setTimeout(()=>{
                      min.innerText = j
                  },k*60*60*1000 + j * 60 * 1000)
              for( let i = vseg.value;i>0;i--){
                  setTimeout(()=>{
                      seg.innerText= i;
                  }, k*60*60*1000 + j*60*1000 + i*1000 )
              
              }
          
            }
        }
    }
*/
const sleep=()=>{
    return new Promise(resolve => setTimeout(resolve,1000))
}

const mins=async(value)=>{
    for(let j = value || vmins.value; j >=0; j--){
        min.innerText = j
      if(!flagx){
          for( let i = 59;i>=0;i--){
              seg.innerText= i;
              await sleep()
          }
      }else{  
          for (let a = vseg.value; a>=0; a-- ){
              seg.innerText= a;
              await sleep()
          }
          flagx = false
      }

}
}

form.onsubmit=async(e)=>{
    e.preventDefault();
 
    for(let k=vhrs.value ; k >=0 ; k-- ){
        hrs.innerText = k 
                if(flagy){
                  await  mins()
                    flagy = false
                }else{
                   await mins(59)
                }
                
            }
    }

//const seg = document.getElementById('seg-card');
//const min = document.getElementById('min-card');
//const hrs = document.getElementById('hrs-card');
//
//let totalSeconds = 0;
//
//setInterval(() => {
//    let currentSeconds = totalSeconds % 60;
//    let currentMinutes = Math.floor(totalSeconds / 60) % 60;
//
//    seg.innerText = currentSeconds;
//    min.innerText = currentMinutes;
//
//    totalSeconds++;
//}, 1000);

}
