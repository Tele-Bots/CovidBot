function prepareStatsCompactAnswer(body, index, nameState) {
    let statewise = body['statewise']
    let statedata = statewise[index]
    let data = '<b>' + nameState + '</b>'
    data += "\nConfirmed: " + statedata['confirmed']
    if (parseInt(statedata['deltaconfirmed']) > 0) {
        if (parseInt(statedata['deltaconfirmed']) > 1) {
            data += '<i> (' + statedata['deltaconfirmed'] + ' new cases)</i>'
        } else {
            data += '<i> (' + statedata['deltaconfirmed'] + ' new case)</i>'
        }
    }
    data += "\nActive: " + statedata['active']
    data += "\nRecovered: " + statedata['recovered']
    if (parseInt(statedata['deltarecovered']) > 0) {
        if (parseInt(statedata['deltarecovered']) > 1) {
            data += '<i> (' + statedata['deltarecovered'] + ' new recoveries)</i>'
        } else {
            data += '<i> (' + statedata['deltarecovered'] + ' new recovery)</i>'
        }
    }
    data += "\nDeaths: " + statedata['deaths']
    if (parseInt(statedata['deltadeaths']) > 0) {
        if (parseInt(statedata['deltadeaths']) > 1) {
            data += '<i> (' + statedata['deltadeaths'] + ' new deaths)</i>'
        } else {
            data += '<i> (' + statedata['deltadeaths'] + ' new death)</i>'
        }
    }
    return data
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
        data += '\n<b>' + object['state'] + '</b>: ' + object['confirmed']
        if (parseInt(object['deltaconfirmed']) > 0) {
            data += '<i> (+' + object['deltaconfirmed'] + ') </i>'
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
        data += '\n<b>' + sortedData[i].name + '</b>: ' + eachDistrictData['confirmed']
        let deltaData = eachDistrictData['delta']
        if (parseInt(deltaData['confirmed']) > 0) {
            data += '<i> (+' + deltaData['confirmed'] + ') </i>'
        }
    }
    return data
}

function prepareDailyStatsAnswer(body, n) {
    let dailyData = body['cases_time_series']
    n = Math.min(n, dailyData.length)
    let data = `\n\n\u{1F55C} Daily change analysis for past ${n} days (<i>All India</i>)\n`
    dailyData.reverse()
    for (let i = 0; i < n; i++) {
        let date = dailyData[i].date
        date = date.substring(0, date.length - 1);
        data += '\n<b>' + date + '</b>: ' + dailyData[i].dailyconfirmed + ' new cases.'
    }
    return data
}

module.exports = {
    prepareStatsCompactAnswer,
    prepareStatsStateAnswer,
    prepareStatsDistrictAnswer,
    prepareDailyStatsAnswer
}
