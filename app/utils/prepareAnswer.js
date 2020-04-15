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
    let districtwise = body[stateName]
    let districtData = districtwise['districtData']

    let data = '\n\n\u{1F4C8} District-wise analysis'

    for (district in districtData) {
        let eachDistrictData = districtData[district]
        data += '\n<b>' + district + '</b>: ' + eachDistrictData['confirmed']
        let deltaData = eachDistrictData['delta']
        if (parseInt(deltaData['confirmed']) > 0) {
            data += '<i> (+' + deltaData['confirmed'] + ') </i>'
        }
    }
    return data
}

module.exports = {
    prepareStatsCompactAnswer,
    prepareStatsStateAnswer,
    prepareStatsDistrictAnswer
}