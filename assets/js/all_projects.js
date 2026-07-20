document.addEventListener("DOMContentLoaded", function () {
    fetch('./assets/json/projects.json')
        .then(response => response.json())
        .then(data => {
            let projectsContainer = document.getElementById("projects-list")

            Object.entries(data).forEach(([key, value]) => {
                let validItems = value.filter(v_value => Number.isInteger(v_value.id))
                if (validItems.length === 0) return

                let rowElement = document.createElement("div")
                rowElement.className += "row gy-4 mt-5"

                let projectCatHeaderContainer = document.createElement("div")

                let projectCatHeader = document.createElement("h3")
                projectCatHeader.className += "text-brand"
                projectCatHeader.textContent = key

                projectCatHeaderContainer.appendChild(projectCatHeader)
                rowElement.appendChild(projectCatHeaderContainer)

                validItems.forEach((v_value) => {
                    let firstDiv = document.createElement("div")
                    firstDiv.className += "col-md-6"

                    let secondDiv = document.createElement("div")
                    secondDiv.className += "card-custom rounded-4 bg-base"

                    let thirdDiv = document.createElement("div")
                    thirdDiv.className += "card-custom-image rounded-4"

                    let img = document.createElement("img")
                    img.className += "rounded-4"
                    img.src = v_value.title_image

                    let overlay = document.createElement("div")
                    overlay.className += "card-overlay"

                    let overlayText = document.createElement("p")
                    overlayText.className += "mb-0"
                    overlayText.textContent = v_value.description.short_desc

                    overlay.appendChild(overlayText)

                    let cardContainer = document.createElement("div")
                    cardContainer.className += "card-custom-content p-4"

                    let projectHeader = document.createElement("h4")
                    projectHeader.textContent = v_value.name

                    let readMoreLink = document.createElement("a")
                    readMoreLink.href = "./project_details.html?id=" + v_value.id
                    readMoreLink.className += "link-custom"
                    readMoreLink.textContent = "Read More"

                    thirdDiv.appendChild(img)
                    thirdDiv.appendChild(overlay)
                    secondDiv.appendChild(thirdDiv)

                    cardContainer.appendChild(projectHeader)
                    cardContainer.appendChild(readMoreLink)

                    secondDiv.appendChild(cardContainer)

                    firstDiv.appendChild(secondDiv)

                    rowElement.appendChild(firstDiv)
                })

                projectsContainer.appendChild(rowElement)
            })
        })
        .catch(error => console.error("Error fetching JSON data: ", error))
})
