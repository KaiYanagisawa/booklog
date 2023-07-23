const express = require('express')
const app = express()
const port = 3000

// getがpostより先に実行された場合undefinedを避けて空オブジェクトを入れておく
let booklog = {} // NOTE: 本当は複数形が望ましいが、複雑になるため単数形で処理する

app.use(express.json())

app.post('/booklog', (req, res) => {
    booklog = req.body
    
    if (!(booklog.name && booklog.text)) {
        return res.json({
            "ok": false,
            "error": "invalid parameter"
        })
    }
    res.json({
        "ok": true,
        "booklog": booklog
    })
})

app.get("/booklog", (req, res) => {
    res.json({
        "ok": true,
        "booklog": [
            booklog
        ]
    })
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})