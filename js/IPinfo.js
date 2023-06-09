var title = '        🔎 IP 查询'

$task.fetch({
    url: 'http://ip.343.re/info',
    timeout: 4000,
    opts: {
        policy: $environment.params
    }
}).then(response => {
    $done({
        'title': title,
        'htmlMessage': response ? format(JSON.parse(response.body)) : ''
    });
}, reason => {
    $done({
        'title': title,
        'htmlMessage': errMsg('🛑 查询超时')
    });
})

function errMsg(reason) {
    return `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;"></br></br>` + reason + `</p>`
}

function format(info) {
    if (info['status'] !== 'T') {
        return errMsg('🛑 查询失败')
    }
    field = {
        'ip': 'IP',
        'as': 'AS',
        'city': '城市',
        'region': '地区',
        'country': '国家',
        'timezone': '时区',
        'loc': '位置',
        'isp': 'ISP',
        'scope': '范围',
        'detail': '细节'
    }
    var html = ''
    for (index in field) {
        html += '</br></br><b><font>' + field[index] + '</font> : </b><font>' + info[index] + '</font>'
    }
    return `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin">` + html + `</p>`
}
