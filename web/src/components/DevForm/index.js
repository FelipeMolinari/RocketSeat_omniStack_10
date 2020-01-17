import React, { useState, useEffect } from 'react'

function DevForm({ onSubmit }) {
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState("")

    const [github_username, setGitHubUsername] = useState("")
    const [techs, setTechs] = useState("")


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords
                setLatitude(latitude)
                setLongitude(longitude)
            },
            (err) => {
                console.log(err)
            },
            {
                timeout: 30000,
            }
        )
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        
        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        })
        console.log(github_username)
        setGitHubUsername('')
        setTechs('')

    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do github</label>
                <input name="github_username" id="github_username" required
                    onChange={e => setGitHubUsername(e.target.value)}
                />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input name="techs" id="techs" required
                    onChange={e => setTechs(e.target.value)}
                />
            </div>

            <div className="input-group">

                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input name="latitude" id="latitude" required value={latitude}
                        onChange={e => setLatitude(e.target.value)} />
                </div>

                <div className="input-block">
                    <label htmlFor="Longitude">Longitude</label>
                    <input name="Longitude" id="Longitude" required value={longitude}
                        onChange={e => setLongitude(e.target.value)} />
                </div>

            </div>
            <button type="submit">Salvar</button>
        </form>
    )
}

export default DevForm