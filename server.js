import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.post('/claim', async (req, res) => {
    const { username, code } = req.body

    if (!username || !code) {
        return res.status(400).json({ success: false, message: "Dati mancanti" })
    }

    // verifica codice corretto
    if (code !== "Natale25") {
        return res.status(400).json({ success: false, message: "Codice non valido" })
    }

    try {
        await fetch("https://discordapp.com/api/webhooks/1419628004484579328/HTIqFgsFChR3JIxOa_qvZ4mNvFm96CGfHOVZNVwj2N99UHlFZ6pfuq2jke3QfoGW0eyT", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: `Nuovo claim SilentNotes\nUsername: ${username}\nCodice: ${code}`
            })
        })

        res.json({ success: true, message: "Claim inviato con successo" })
    } catch (e) {
        res.status(500).json({ success: false, message: "Errore invio claim" })
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server attivo su http://localhost:${PORT}`))
