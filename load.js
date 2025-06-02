async function showTable() {
    const urlParams = new URLSearchParams(window.location.search)
    const targetId = urlParams.get('id')

    if (!targetId) return

    await fetch ("data/data.json")
    .then((response) => response.json())
    .then((data) => {
        const filteredData = data.find(object => object.id == targetId)

        const tbody = document.getElementById("myTable").querySelector("tbody")
        tbody.innerHTML = ""

        if (filteredData) {
            for (let key in filteredData) {
                if (key !== 'id' && key !== "gambar") {
                    let tr = document.createElement("tr")

                    let tdKey = document.createElement("td")
                    tdKey.textContent = key
                    tr.appendChild(tdKey)

                    let tdValue = document.createElement("td")
                    tdValue.textContent = filteredData[key]
                    tr.appendChild(tdValue)

                    tbody.appendChild(tr)
                    }
                }

                if (filteredData.gambar) {
                    let img = document.createElement("img")
                    img.src = filteredData.gambar
                    img.alt = "Gambar " + filteredData.nama
                    img.style.width = "200px"
                    document.getElementById("imgContainer").appendChild(img)
                                
                }
            } else {
                tbody.innerHTML = "<tr><td colspan='2'>Data tidak ditemukan</td></tr>"
            }
        })
        .catch(err => console.log(err))
    }
window.onload = showTable