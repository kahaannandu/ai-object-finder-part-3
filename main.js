var status = "";
objects = [];

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function model_loaded(){
    status = true;
}

function start(){
    object_detector = ml5.objectDetector("cocossd", model_loaded);
    document.getElementById("status").innerHTML = "status: object detecting";
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        object_detector.detect(video, got_result);
        for(var i = 0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "status: object detected";

            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);

            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "cell phone"){
                video.stop();
                document.getElementById("status").innerHTML = "status: cell phone found";
            }
        }
    }
}

function got_result(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}