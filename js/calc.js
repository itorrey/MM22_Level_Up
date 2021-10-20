const slider = document.getElementById('slider');
const resultsTable = document.querySelector('.resultsTable');
const teamSelect = document.getElementById('team');
const raritySelect = document.getElementById('rarity');
const positionSelect = document.getElementById('position');

const resourceTypes = {
    "coins": "Coins",
    "trophies": "Trophies",
    "tp": "Training Points",
    "helmetsTier1": "Helmets",
    "helmetsTier2": "Helmets Tier 2",
    "positionsTier1": "Patches",
    "positionsTier2": "Patches Tier 2",
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

const teams = {
    "49ers": ["NFC", "West"],
    "Bears": ["NFC", "North"],
    "Bengals": ["AFC", "North"],
    "Bills": ["AFC", "East"],
    "Broncos": ["AFC", "West"],
    "Browns": ["AFC", "North"],
    "Buccaneers": ["NFC", "South"],
    "Cardinals": ["NFC", "West"],
    "Chargers": ["AFC", "West"],
    "Chiefs": ["AFC", "West"],
    "Colts": ["AFC", "South"],
    "Cowboys": ["NFC", "East"],
    "Dolphins": ["AFC", "East"],
    "Eagles": ["NFC", "East"],
    "Falcons": ["NFC", "South"],
    "Football Team": ["NFC", "East"],
    "Giants": ["NFC", "East"],
    "Jaguars": ["AFC", "South"],
    "Jets": ["AFC", "East"],
    "Lions": ["NFC", "North"],
    "Packers": ["NFC", "North"],
    "Panthers": ["NFC", "South"],
    "Patriots": ["AFC", "East"],
    "Raiders": ["AFC", "West"],
    "Rams": ["NFC", "West"],
    "Ravens": ["AFC", "North"],
    "Saints": ["NFC", "South"],
    "Seahawks": ["NFC", "West"],
    "Steelers": ["AFC", "North"],
    "Texans": ["AFC", "South"],
    "Titans": ["AFC", "South"],
    "Vikings": ["NFC", "North"]
}

const positionValues = {
    "passOffense": {
        "label": "Pass Off.",
        "positions": ['QB', 'WR', 'TE', 'P']
    },
    "rushOffense": {
        "label": "Rush Off.",
        "positions": ['HB','FB', 'OT', 'OG', 'C', 'K']
    },
    "passDefense": {
        "label": "Pass Def.",
        "positions": ['CB','S','PR']
    },
    "rushDefense": {
        "label": "Rush Def.",
        "positions": ['DE', 'DT', 'LB', 'MLB', 'KR']
    }
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

    slider.noUiSlider.on('update', function(values) { updateResourceList();});
    slider.noUiSlider.set([0, 20]);
}

function populateTeamSelect() {
    for (const [key] of Object.entries(teams)) {
        teamSelect.innerHTML += `<option value="${key}">${key}</option>`;
    }
}

function populatePositionSelect() {
    for (const [key, value] of Object.entries(positionValues)) {
        let group = document.createElement("optgroup");
        group.label = positionValues[key].label;
        
        positionValues[key].positions.forEach((item) => {
            let pos = document.createElement("option");
            pos.value = key;
            pos.innerHTML = item;
            group.append(pos);
        });
        positionSelect.append(group);
    }
}

function getConference(division = false) {
    if(division) {
        return `${teams[teamSelect.value][0]} ${teams[teamSelect.value][1]}`;
    } else {
        return teams[teamSelect.value][0];
    }
}

function getPosition(pretty=true) {
    let val = positionSelect.value;
    
    if(val) {
        if(pretty) {
            return positionValues[val].label + " ";
        } else {
            return val;
        }
    } else {
        return "Position ";
    }
}

function getResourceNeeds() {
    let needs = {};

    //Get the start and end levels of the slider
    let range = slider.noUiSlider.get();
    let startLevel = parseInt(range[0]);
    let endLevel = parseInt(range[1]);

    let rarity = raritySelect.value;
    
    for (const [key] of Object.entries(resourceTypes)) {
        needs[key] = 0;
        for(let i=startLevel; i< endLevel; i++) {
            if(key == "coins" || key == "trophies") {
                needs[key] += resourceValues[key][rarity][i];
            } else {
                needs[key] += resourceValues[key][i];
            }
        }
    }

    return needs;
}

function updateResourceList() {
    let results = getResourceNeeds();
    resultsTable.innerHTML = '';
    for (let [key, value] of Object.entries(results)) {
        if(value !== 0) {
            value = wNumb({
                thousand: ','
            }).to(value);
            
            let label = "";
            let valueClass = key;

            if(key.includes("helmet")){
                valueClass += ` ${getConference(false)}`;
                let conference = getConference();
                label = `${conference} ${resourceTypes[key]}`;
            } else if(key.includes("flag")){
                valueClass += ` ${getConference(false)}`;
                let conference = getConference(true);
                label = `${conference} ${resourceTypes[key]}`;
            } else if(key.includes("position")){
                label = getPosition() + `${resourceTypes[key]}`
                valueClass += ` ${getPosition(false)}`;
            } else {
                label = resourceTypes[key];
            }

            resultsTable.innerHTML += `<div class="type">${label}</div><div class="value ${valueClass}">${value}</div>`;
        }
    }
}

function init() {
    populateTeamSelect();
    populatePositionSelect();
    createSlider();
    teamSelect.addEventListener('change', updateResourceList);
    raritySelect.addEventListener('change', updateResourceList);
    positionSelect.addEventListener('change', updateResourceList);
}

init();