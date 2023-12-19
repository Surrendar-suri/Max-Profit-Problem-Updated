function calculateMaxProfit(units) {
    const buildTime = { T: 5, P: 4, C: 10 };

    const earningsPerUnit = { T: 1500, P: 1000, C: 3000 };

    let data = new Array(units + 1).fill(null).map(() => ({
        earnings: 0,
        combinations: {}
    }));

    for (let i = 4; i <= units; i++) {
        for (let buildType in buildTime) {
            if (i >= buildTime[buildType]) {
                const currentEarning = (units - i) * earningsPerUnit[buildType];
                const earnings = data[i - buildTime[buildType]].earnings + currentEarning;
                if (currentEarning && earnings > data[i].earnings) {
                    data[i].earnings = earnings;
                    data[i].combinations = {
                        ...data[i - buildTime[buildType]].combinations,
                        [buildType]: (data[i - buildTime[buildType]].combinations[buildType] || 0) + 1
                    };
                }
            }
        }
    }

    data = data.sort((a, b) => a.earnings - b.earnings).reverse();
    let i = 0;
    const topCombinations = [];
    while (i < data.length && data[i].earnings === data[0].earnings) {
        topCombinations.push({
            T: 0,
            P: 0,
            C: 0,
            ...data[i].combinations
        });
        i += 1;
    }
    return {
        earnings: data[0].earnings,
        combinations: topCombinations
    };
}

function displayResults() {
    const inputUnits = document.getElementById('unitsInput').value;
    const result = calculateMaxProfit(parseInt(inputUnits, 10));
    const outputContainer = document.getElementById('outputContainer');
    outputContainer.innerHTML = '';

    // Display earnings
    outputContainer.innerHTML += `<h3>Earnings : $ ${result.earnings}</h3>`

    // Display combinations
    if (parseInt(inputUnits, 10) <= 4) {
        outputContainer.innerHTML += ""
    } else {
        result.combinations.forEach((combination, index) => {
            outputContainer.innerHTML += `<h3>Solution ${index + 1}: T:${combination.T} P:${combination.P} C:${combination.C}</h3>`
        });
    }
}
