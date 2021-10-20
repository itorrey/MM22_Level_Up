const slider = document.getElementById('slider');
const resultsTable = document.querySelector('.resultsTable');

const resourceTypes = {
    "coins": "Coins",
    "trophies": "Trophies",
    "tp": "Training Points",
    "helmetsTier1": "Helmets",
    "helmetsTier2": "Helmets T2",
    "positionsTier1": "Position Patches",
    "positionsTier2": "Position Patches T2",
    "flags": "Flags"
}

const resourceValues = {
    "coins": {
        "uncommon": [200,400,600,800,1000,1200,1400,1600,1800,2000,2250,2500,2750,3000,3500,3500,3500,3500,3500,3500,4000,0,4000,0,8000,0,4000,0,4000,0,4000,0,4000,0,8000,0,4000,0,4000,0,4000,0,4000,0,8000,0,4000,0,4000,0],
        "rare": [400,800,1200,1600,2000,2400,2800,3200,3600,4000,4500,5000,5500,6000,7000,7000,7000,7000,7000,7000,8000,0,8000,0,16000,0,8000,0,8000,0,8000,0,8000,0,16000,0,8000,0,8000,0,8000,0,8000,0,16000,0,8000,0,8000,0],
        "epic": [800,1600,2400,3200,4000,4800,5600,6400,7200,8000,9000,10000,11000,12000,14000,14000,14000,14000,14000,14000,16000,0,16000,0,32000,0,16000,0,16000,0,16000,0,16000,0,32000,0,16000,0,16000,0,16000,0,16000,0,32000,0,16000,0,16000,0]
    },
    "trophies": {
        "uncommon": [0,0,0,0,0,0,0,0,0,0,50,55,60,65,70,75,80,85,90,100,120,0,140,0,160,0,180,0,200,0,0,150,0,150,0,150,0,150,0,300,0,150,0,150,0,150,0,150,0,300],
        "rare": [0,0,0,0,0,0,0,0,0,0,125,137,150,162,175,187,200,212,225,250,300,0,350,0,400,0,450,0,500,0,0,375,0,375,0,375,0,375,0,750,0,375,0,375,0,375,0,375,0,750],
        "epic": [0,0,0,0,0,0,0,0,0,0,250,275,300,325,350,375,400,425,450,500,600,0,700,0,800,0,900,0,1000,0,0,750,0,750,0,750,0,750,0,1500,0,750,0,750,0,750,0,750,0,1500]
    },
    "tp": [20,30,40,50,60,70,80,90,100,120,140,160,180,200,250,250,250,250,250,300,0,300,0,300,0,300,0,300,0,600,0,300,0,300,0,300,0,300,0,600,0,300,0,300,0,300,0,300,0,600],
    "helmetsTier1": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 75, 100, 150, 200, 0, 250, 0, 300, 0, 350, 0, 400, 0, 500, 500, 0, 500, 0, 1000, 0, 500, 0, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "helmetsTier2": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200, 0, 250, 0, 300, 0, 500, 0, 750, 0],
    "positionsTier1": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 75, 100, 150, 200, 0, 200, 0, 200, 300, 0, 300, 0, 300, 0, 400, 0, 400, 0, 800, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "positionsTier2": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,100, 0, 150, 0, 200, 0, 400, 0, 600],
    "flags": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,5,0,10,0,15,0,20,0,25,0,25,0,25,0,25,0,25,0]
}

function createSlider() {

    noUiSlider.create(slider, {
        start: [0, 20],
        connect: true,
        tooltips: [true, true],
        step: 1,
        range: {
            'min': 0,
            'max': 50
        },
        format: wNumb({
            decimals: 0,
        })
    });

    slider.noUiSlider.on('update', function(values) { updateResourceList(values[0], values[1]);});
    slider.noUiSlider.set([0, 20]);
}

function getResources(rarity, startLevel, endLevel) {
    let resourcesNeeded = {};
    
    for (const [key] of Object.entries(resourceTypes)) {
        resourcesNeeded[key] = 0;
        for(let i=startLevel; i< endLevel; i++) {
            if(key == "coins" || key == "trophies") {
                resourcesNeeded[key] += resourceValues[key][rarity][i];
            } else {
                resourcesNeeded[key] += resourceValues[key][i];
            }
        }
    }

    return resourcesNeeded;
}

function updateResourceList(startLevel, endLevel) {
    let results = getResources('rare', parseInt(startLevel), parseInt(endLevel));
    resultsTable.innerHTML = '';
    for (let [key, value] of Object.entries(results)) {
        if(value !== 0) {
            value = wNumb({
                thousand: ','
            }).to(value);
            resultsTable.innerHTML += '<div class="type">'+resourceTypes[key]+'</div><div class="value '+key+'">'+value+'</div>'
        }
    }
}

function init() {
    createSlider();
}

init();