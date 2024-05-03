document.addEventListener("DOMContentLoaded", function () {
    fetch('./assets/projects.json')
        .then(response => response.json())
        .then(data => {
            console.log(data)

            let projectsContainer = document.getElementsByClassName("container")[0]

            Object.entries(data).forEach(([key, value]) => {
                console.log(`${key}: ${value}`)

                let rowElement = document.createElement("div")
                rowElement.className += "row gy-4 mt-5"

                let projectCatHeaderContainer = document.createElement("div")

                let projectCatHeader = document.createElement("h3")
                projectCatHeader.className += "text-brand"
                projectCatHeader.textContent = key

                projectCatHeaderContainer.appendChild(projectCatHeader)
                rowElement.appendChild(projectCatHeaderContainer)

                Object.entries(value).forEach(([v_key, v_value]) => {
                    console.log(`${v_key} : ${v_value}`)

                    let firstDiv = document.createElement("div")
                    firstDiv.className += "col-md-6"

                    let secondDiv = document.createElement("div")
                    secondDiv.className += "card-custom rounded-4 bg-base shadow-effect"

                    let thirdDiv = document.createElement("div")
                    thirdDiv.className += "card-custom-image rounded-4"

                    let img = document.createElement("img")
                    img.className += "rounded-4"
                    img.src = v_value.title_image

                    let cardContainer = document.createElement("div")
                    cardContainer.className += "card-custom-content p-4"
                    
                    let projectHeader = document.createElement("h4")
                    projectHeader.textContent = v_value.name

                    let projectDescription = document.createElement("p")
                    projectDescription.textContent = v_value.projectDescription

                    let readMoreLink = document.createElement("a")
                    readMoreLink.href = "./project_details.html?id=" + v_value.id
                    readMoreLink.className += "link-custom"
                    readMoreLink.textContent = "Read More"

                    thirdDiv.appendChild(img)
                    secondDiv.appendChild(thirdDiv)

                    cardContainer.appendChild(projectHeader)
                    cardContainer.appendChild(projectDescription)
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