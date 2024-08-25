import * as tf from '@tensorflow/tfjs';
const MODEL_JSON = 'model/model.json';

const textData = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a');
var model = undefined;

function cleanText(inputText) {
    const text = inputText.map(data=>{
        return data.textContent.trim();
    })
    return text;
}

async function loadAndPredict(inputText) {
    model = await tf.loadLayersModel(MODEL_JSON);
    const result = model.predict(inputText)
}

function isSpoilerPresent(text) {
    if(text.length<1){
        return false;
    }
    const cleanedData = cleanText(text)
    const results = loadAndPredict(cleanedData);
    for(let i=0; i<results.length; i++){
        if(results[i]){
            return true;
        }
    }
    return false;
}


