document.addEventListener("DOMContentLoaded", function () {
    fetch('./assets/json/projects.json')
        .then(response => response.json())
        .then(data => {
            let projectsContainer = document.getElementById("projects-list")

            Object.entries(data).forEach(([key, value]) => {
                let validItems = value.filter(v_value => typeof v_value.id === "string" && v_value.id.length > 0)
                if (validItems.length === 0) return

                let categorySection = document.createElement("div")
                categorySection.classList.add("projects-category", "mt-5")

                let categoryHeader = document.createElement("h3")
                categoryHeader.classList.add("text-brand")
                categoryHeader.textContent = key
                categorySection.appendChild(categoryHeader)

                let gridElement = document.createElement("div")
                gridElement.classList.add("projects-grid")

                validItems.forEach((v_value) => {
                    let cardDiv = document.createElement("div")
                    cardDiv.classList.add("card-custom", "rounded-4", "bg-base")

                    let imageDiv = document.createElement("div")
                    imageDiv.classList.add("card-custom-image", "rounded-4")

                    let img = document.createElement("img")
                    img.classList.add("rounded-4")
                    img.src = v_value.title_image
                    img.alt = v_value.name

                    let overlay = document.createElement("div")
                    overlay.classList.add("card-overlay")

                    let overlayText = document.createElement("p")
                    overlayText.classList.add("mb-0")
                    overlayText.textContent = v_value.description.short_desc

                    overlay.appendChild(overlayText)

                    let cardContainer = document.createElement("div")
                    cardContainer.classList.add("card-custom-content", "p-4")

                    let projectHeader = document.createElement("h4")
                    projectHeader.textContent = v_value.name

                    let readMoreLink = document.createElement("a")
                    readMoreLink.href = "./project_details.html?id=" + encodeURIComponent(v_value.id)
                    readMoreLink.classList.add("link-custom")
                    readMoreLink.textContent = "Read More"

                    imageDiv.appendChild(img)
                    imageDiv.appendChild(overlay)
                    cardDiv.appendChild(imageDiv)

                    cardContainer.appendChild(projectHeader)
                    cardContainer.appendChild(readMoreLink)

                    cardDiv.appendChild(cardContainer)

                    gridElement.appendChild(cardDiv)
                })

                categorySection.appendChild(gridElement)
                projectsContainer.appendChild(categorySection)
            })
        })
        .catch(error => console.error("Error fetching JSON data: ", error))
})
