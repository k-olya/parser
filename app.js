const req = require('request')
const che = require('cheerio')

const url = process.argv[2]
const sel = process.argv[3]

url && sel
    || console.error("usage: app.js <url> <root selector>")
    || process.exit(-1)

req(url, (err, res, b) => {
    !err
        || console.error(err)
        || process.exit(1)

    const $ = che.load(b)

    // escape md inline syntax characters
    const esc = s => s
        .replace(/\\/g, "\\")
        .replace(/`/g, "\\`")
        .replace(/\*/g, "\\*")
        .replace(/_/g, "\\_")
        .replace(/~/g, "\\~")
        .replace(/\ *\n\ */g, " ")
    
    // pad cells in a table to make it readable
    const t = m => {
        let l = m[0].map((v, i) => 
            m.reduce((a, b) => a[i].length > b[i].length ? a : b)[i].length
        )
        m.splice(1, 0, l.map(v => '| -'.padEnd(v - 1, '-') + ' '))
        return m.map(r => r.map((c, i) => c.padEnd(l[i])).join('')).join('|\n')
    }
        
    // html to markdown tag map
    const mdt = {
        'p': el => `${c(el)}\n\n`,
        'div': el => c(el),
        'body': el => c(el),
        // nsl.com uses blockquotes to wrap code snippets
        'blockquote': el => c(el),
        'font': el => c(el),
        'ul': el => `${c(el)}\n`,
        'li': el => `- ${c(el)}\n`,
        'h1': el => `# ${c(el)}\n\n`,
        'h2': el => `## ${c(el)}\n\n`,
        'h3': el => `### ${c(el)}\n\n`,
        'h4': el => `#### ${c(el)}\n\n`,
        'h5': el => `##### ${c(el)}\n\n`,
        'h6': el => `###### ${c(el)}\n\n`,
        // backticks in inline code require special treatment
        'code': el => $(el).html().includes('`') ? `\`\` ${$(el).text()} \`\`` : `\`${$(el).text()}\``,
        'pre': el => `\`\`\`q\n${$(el).text()}\n\`\`\`\n\n`,
        'a': el => `[${c(el)}](${$(el).attr('href')||'#'})`,
        'br': el => `  \n`,
        'hr': el => `\n---\n\n`,
        'i': el => `*${c(el)}*`,
        'em': el => `*${c(el)}*`,
        'b': el => `**${c(el)}**`,
        'strong': el => `**${c(el)}**`,
        'img': el => `![${$(el).attr('alt') || 'image'}](${$(el).attr('src')})\n`,
        'table': el => `${t($(el).find('tr').toArray().map((v, k) => md(v)))}|\n\n`,
        'th': el => `| ${c(el)} `,
        'td': el => `| ${c(el)} `,
        // this one returns an array
        'tr': el => $(el).find('th,td').toArray().map((v, k) => md(v))
    }
    // convert dom node children recursively
    const c = el =>
        [].join.call($(el).contents().map((k, v) => md(v)), '')
    // convert html element contents to a markdown string
    const md = el =>
        el.name ?
            mdt[el.name.toLowerCase()]
                && mdt[el.tagName.toLowerCase()](el)
                || console.error($.html($(el)))
                || $.html($(el)) :
            el.type != 'comment' && el.data.trim() != '' ? esc(el.data) : ''
    // convert html and remove unnecessary whitespace
    const parse = sel =>
        md($(sel)[0]).split('\n').map(s => s.trimRight()).join('\n')
    
    console.log(parse(sel))
})
