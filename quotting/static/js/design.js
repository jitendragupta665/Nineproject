var config = {
    trace: true,
    spiralResolution: 1,
    spiralLimit: 360 * 8,
    lineHeight: 0.8,
    xWordPadding: 0,
    yWordPadding: 3,
    font: "sans-se3if"
}

var words =[];
for(var i in fr)
words.push([i,fr[i]])
words.sort(function(a, b) {
    return  -1 * (a[1] - b[1]);
});

var cloud = document.getElementById("word-cloud");
cloud.style.position = "relative";
cloud.style.fontFamily = config.font;
var traceCanvas = document.createElement("canvas");
traceCanvas.width = cloud.offsetWidth;
traceCanvas.height = cloud.offsetHeight;
var traceCanvasCtx = traceCanvas.getContext("2d");
cloud.appendChild(traceCanvas);

var startPoint = {
    x: cloud.offsetWidth / 2,
    y: cloud.offsetHeight / 2
};

var wordsDown = [];

function createWordObject(word, freq) {
    var wordContainer = document.createElement("div");
    wordContainer.style.position = "absolute";
    wordContainer.style.fontSize = 4*freq + "px";
    if(freq < 4)
    wordContainer.style.fontSize = 15*freq + "px";
    wordContainer.style.lineHeight = config.lineHeight;
    wordContainer.style.lineHeight = config.lineHeight;
    wordContainer.style.color = getRandomColor();
    wordContainer.appendChild(document.createTextNode(word));
    return wordContainer;
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function placeWord(word, x, y) {

    cloud.appendChild(word);
    word.style.left = x - word.offsetWidth/2 + "px";
    word.style.top = y - word.offsetHeight/2 + "px";

    wordsDown.push(word.getBoundingClientRect());
}

function trace(x, y) {
traceCanvasCtx.fillRect(x, y, 1, 1);
}

function spiral(i, callback) {
    angle = config.spiralResolution * i;
    x = (1 + angle) * Math.cos(angle);
    y = (1 + angle) * Math.sin(angle);
    return callback ? callback() : null;
}

function intersect(word, x, y) {
    cloud.appendChild(word);

    word.style.left = x - word.offsetWidth/2 + "px";
    word.style.top = y - word.offsetHeight/2 + "px";
    var currentWord = word.getBoundingClientRect();
    cloud.removeChild(word);

    for(var i = 0; i < wordsDown.length; i+=1){
        var comparisonWord = wordsDown[i];

        if(!(currentWord.right + config.xWordPadding < comparisonWord.left - config.xWordPadding ||
             currentWord.left - config.xWordPadding > comparisonWord.right + config.wXordPadding ||
             currentWord.bottom + config.yWordPadding < comparisonWord.top - config.yWordPadding ||
             currentWord.top - config.yWordPadding > comparisonWord.bottom + config.yWordPadding)){

            return true;
        }
    }

    return false;
}
(function placeWords() {
    for (var i = 0; i < words.length; i += 1) {

        var word = createWordObject(words[i][0], words[i][1]);

        for (var j = 0; j < config.spiralLimit; j++) {
            if (spiral(j, function() {
                    if (!intersect(word, startPoint.x + x, startPoint.y + y)) {
                        placeWord(word, startPoint.x + x, startPoint.y + y);
                        return true;
                    }
                })) {
                break;
            }
        }
    }
})();
(function traceSpiral() {

    traceCanvasCtx.beginPath();

    if (config.trace) {
        var frame = 1;

        function animate() {
            spiral(frame, function() {
                trace(startPoint.x + x, startPoint.y + y);
            });

            frame += 1;

            if (frame < config.spiralLimit) {
                window.requestAnimationFrame(animate);
            }
        }

        animate();
    }
})();
