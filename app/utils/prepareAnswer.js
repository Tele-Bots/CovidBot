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

module.exports = {
    prepareStatsCompactAnswer
}