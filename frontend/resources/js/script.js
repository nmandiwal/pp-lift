$(document).ready(function () {
    
    getLiftStatus();
    
    $('a#left').click(function() {
        //$(this).toggleClass("btn-ghost");
        changeLiftStatus("left", $(this).text());
    });
    
    $('a#right').click(function() {
        changeLiftStatus("right", $(this).text());
    });

});

function changeLiftStatus(leftOrRight, text){
        text = (text === "Working") ? "Broken" : "Working";
    
        $.get('https://us-central1-my-project-86472-23march.cloudfunctions.net/function-1-pp?'+leftOrRight+'='+ text,  // url
            function (data, textStatus, jqXHR) {  // success callback
                updateButtons(data);
            }
        );    
        
        
}

function getLiftStatus(){
    $.get('https://us-central1-my-project-86472-23march.cloudfunctions.net/function-1-pp',  // url
      function (data, textStatus, jqXHR) {  // success callback
        updateButtons(data);
    });
}

function updateButtons(data){
    $('a#left').text(data.left);    
    $('a#right').text(data.right);    
    
    if(data.left == "Working"){
        $('a#left').addClass('btn-full').removeClass('btn-ghost');
    }else{
        $('a#left').addClass('btn-ghost').removeClass('btn-full');
    } 
    
    if(data.right == "Working"){
        $('a#right').addClass('btn-full').removeClass('btn-ghost');
    } else {
        $('a#right').addClass('btn-ghost').removeClass('btn-full');
    }
}
