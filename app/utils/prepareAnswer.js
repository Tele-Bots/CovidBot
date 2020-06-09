function numberWithIndianCommas(x) {
    var y = x.toString()
    if (y.length > 3) {
        var z = y.substr(y.length - 3, 3)
        y = y.substr(0, y.length - 3)
        y = y.replace(/\B(?=(\d{2})+(?!\d))/g, ",")
        return y + ',' + z
    }
    else return y
}

function prepareStatsCompactAnswer(body, index, nameState) {
    let statewise = body['statewise']
    let statedata = statewise[index]
    let data = '<b>' + nameState + '</b>'
    data += "\n\u{1F534} Confirmed: " + numberWithIndianCommas(statedata['confirmed'])
    if (parseInt(statedata['deltaconfirmed']) > 0) {
        data += '<i> (+' + numberWithIndianCommas(statedata['deltaconfirmed']) + ')</i>'
    }
    data += "\n\u{1F7E0} Active: " + numberWithIndianCommas(statedata['active'])
    data += "\n\u{1F7E2} Recovered: " + numberWithIndianCommas(statedata['recovered'])
    if (parseInt(statedata['deltarecovered']) > 0) {
        data += '<i> (+' + numberWithIndianCommas(statedata['deltarecovered']) + ')</i>'
    }
    data += "\n\u{26AB} Deaths: " + numberWithIndianCommas(statedata['deaths'])
    if (parseInt(statedata['deltadeaths']) > 0) {
        data += '<i> (+' + numberWithIndianCommas(statedata['deltadeaths']) + ')</i>'
    }
    return data
}

function prepareAllIndiaCasesTested(body) {
    let noOfTests = body['tested'].reverse()[0]['totalsamplestested'];
    data = '\n\u{26AA} ' + numberWithIndianCommas(noOfTests) + ' citizens tested';
    return data;
}

function prepareStatsStateAnswer(body) {
    let statewise = body['statewise']
    let data = '\n\n\u{1F4C8} Top 15 states with most cases'

    // Sorting the data
    statewise.sort(function (a, b) {
        return b.confirmed - a.confirmed;
    });

    statewise.forEach((object, index) => {
        if (index == 0 || index > 15)
            return
        data += '\n<b>' + object['state'] + '</b>: ' + numberWithIndianCommas(object['confirmed'])
        if (parseInt(object['deltaconfirmed']) > 0) {
            data += '<i> (+' + numberWithIndianCommas(object['deltaconfirmed']) + ') </i>'
        }
    });
    return data
}

function prepareStatsDistrictAnswer(body, stateName) {
    if (body == undefined || stateName == undefined || body[stateName] == undefined)
        return

    let districtwise = body[stateName]
    let districtData = districtwise['districtData']

    // Preparing a sorted array to use it later to
    // access names in sorted order
    let sortedData = []
    for (let key in districtData) {
        sortedData.push({ name: key, confirmed: districtData[key].confirmed, delta: districtData[key].delta })
    }
    sortedData.sort(function (x, y) { return y.confirmed - x.confirmed })

    let data = '\n\n\u{1F4C8} District-wise analysis'
    for (var i = 0; i < sortedData.length; i++) {
        let eachDistrictData = districtData[sortedData[i].name]
        data += '\n<b>' + sortedData[i].name + '</b>: ' + numberWithIndianCommas(eachDistrictData['confirmed'])
        let deltaData = eachDistrictData['delta']
        if (parseInt(deltaData['confirmed']) > 0) {
            data += '<i> (+' + numberWithIndianCommas(deltaData['confirmed']) + ') </i>'
        }
    }
    return data
}

function prepareStateTestStat(body, stateName) {

    let stateWise = body['states_tested_data'], stateDataIndex = -1
    for (let index = stateWise.length-1; index >=0; index--) {
        let currentData = stateWise[index]
        if (currentData['state'].toLowerCase() === stateName.toLowerCase()){
            stateDataIndex = index
            break
        }
    }
    if (stateDataIndex === -1)
        return ''
    else {
        let stateData = stateWise[stateDataIndex]
        let data = '\n\u{26AA} ' + numberWithIndianCommas(stateData['totaltested']) + ' citizens tested'
        return data
    }

}

function prepareDailyStatsAnswer(body, n) {
    let dailyData = body['cases_time_series']
    n = Math.min(n, dailyData.length)
    let data = `\n\n\u{1F55C} Daily change analysis for past ${n} days (<i>All India</i>)\n`
    dailyData.reverse()
    for (let i = 0; i < n; i++) {
        let date = dailyData[i].date
        date = date.substring(0, date.length - 1);
        data += '\n<b>' + date + '</b>: ' + numberWithIndianCommas(dailyData[i].dailyconfirmed) + ' new cases.'
    }
    return data
}

function prepareTestingResourceAnswer(stateResources) {
    if (stateResources.length === 0) {
        return `\n\n\u{1F9EA} No COVID-19 Testing Labs found`
    }

    var data = `\n\n\u{1F9EA} COVID-19 Testing Labs in ${stateResources[0].state}, found ${stateResources.length} results\n`

    stateResources.forEach(stateResource => {
        data += `\n<b>${stateResource.nameoftheorganisation}, ${stateResource.city}\n` +
            `</b>Description: ${stateResource.descriptionandorserviceprovided}.\n` +
            `<i>Phone Number: ${stateResource.phonenumber}</i>\n` +
            `<i>Website: ${stateResource.contact}</i>\n`
    })

    return data
}

function prepareNewTopStatesStat(body) {
    let statesData = body['statewise'], storeIndex = new Map, sortedData = []
    for (let index = 0; index < statesData.length; index++) {
        let currentState = statesData[index]
        if (parseInt(currentState['deltaconfirmed']) > 0 &&
            currentState['state'] !== 'State Unassigned' &&
            currentState['state'] !== 'Total')
            storeIndex.set(index, parseInt(currentState['deltaconfirmed']))

    }
    storeIndex[Symbol.iterator] = function* () {
        yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
    }
    for (let [key, value] of storeIndex) { 
        sortedData.push(key)
    }
    let data = '<b>\u{1F4C8}Top States With Most New Confirmed Cases</b>\n'
    var len
    if (sortedData.length === 0)
        return data += '\nNo data for new cases available right now!!'
    else if (sortedData.length > 15)
        len = 15
    else
        len = sortedData.length

    sortedData.reverse()
    
    for (let i = 0; i < len; i++) {
        let currentState = statesData[sortedData[i]]
        data += '\n<b>' + currentState['state'] + ': </b>' + 
        numberWithIndianCommas(currentState['confirmed']) + 
        ' <i>(+' + numberWithIndianCommas(currentState['deltaconfirmed']) + ')</i>'
    }
    return data
}

module.exports = {
    prepareStatsCompactAnswer,
    prepareAllIndiaCasesTested,
    prepareStatsStateAnswer,
    prepareStatsDistrictAnswer,
    prepareDailyStatsAnswer,
    prepareTestingResourceAnswer,
    prepareStateTestStat,
    prepareNewTopStatesStat
}
