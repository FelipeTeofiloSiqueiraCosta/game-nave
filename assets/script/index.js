var interval=[];
var createEnemyinterval;
var distanceInterval;
var best=0;
function moveEnemy(pos){
    var rigth=0;
    
        interval.push(setInterval(function(){
            right = parseInt(($(".enemy")[pos].style.right).replace("%", ""));
            
            var col = $("#nave").collision( $(".enemy")[pos] );
            if(col.length>0){
                for(let y=0;y<interval.length;y++){
                    $(".enemy")[y].style.right=`${(Math.random()*50) * -1}%`;
                    $(".enemy")[y].style.top=`${(Math.random()* 80)+10}%`;
                    clearInterval(interval[y]);
                }
                if(best < parseInt($("#info h1 span").html())){
                    best = parseInt($("#info h1 span").html());
                    $("#info h3 span").html(best);
                }
                interval=[];
                $(".start h1").html("Você Colidiu!");
                $(".container")[0].style.opacity="1";
                $("#nave")[0].style.left="-100px";
                $("body")[0].style.animation="none";
                clearInterval(createEnemyinterval);
                clearInterval(distanceInterval);
                return;
            }
            if(right>=100){
                rigth= (Math.random()*50) * -1;
                $(".enemy")[pos].style.top=`${(Math.random()* 80)+10}%`;

                $(".enemy")[pos].style.right=`${rigth}%`;
            }else{
                rigth+=3.2;
                $(".enemy")[pos].style.right=`${rigth}%`;
            }
        },50));
   
}

function distance(){
    var distance;
    $("#info h1 span").html('0');
     distanceInterval = setInterval(function(){
        distance = parseInt($("#info h1 span").html());
        distance+=1;
        $("#info h1 span").html(distance);
     },300);
}


function createEnemy(){
    let style = `style="
    top: ${(Math.random()* 80)+10}%;
    right: ${(Math.random()*50) * -1}%
    "`;
    let enemy = `<img src="./assets/image/enemy.png" class="enemy" ${style}/>`;
    $("body").append(enemy);
}


$(document).ready(function(){
    var topNave=0;
    var nave = $("#nave")[0];
    var menu = $(".container")[0];
    var qteEnemy= $(".enemy").length;
    $("body").on("keypress", function(e){
        
        switch(e.key.toUpperCase()){
            case 'W':
                topNave < 5 ? topNave=0 : topNave-=5;
                nave.style.top= `${topNave}%`;
                break;
            case 'S':
                topNave > 85 ? topNave=90 : topNave+=5;
                nave.style.top= `${topNave}%`;
                break;
            
        }
    });

    $(".start button").on("click", function(){
        menu.style.opacity="0";
        qteEnemy=2;
        $("body")[0].style.animation="animeBack 14s linear infinite";
        nave.style.left="0px";
        for(let i=2;i<$(".enemy").length;i++){
            $(".enemy")[i].remove();
        }
       
        setTimeout(function(){
           
            for(let i=0;i<2;i++){
                moveEnemy(i);
            }
            
        },700);
        distance();

        createEnemyinterval = setInterval(function(){
            createEnemy();
            moveEnemy(qteEnemy);
            qteEnemy+=1;
        },15000);
        
    });

})