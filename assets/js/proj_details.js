const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get("id")
console.log(id)

let projectHeader = document.getElementById("project-header")
let titleImage = document.getElementById("title-image")
let projectDescription = document.getElementById("project-description")
let featureList = document.getElementById("feature-list")
let benefitList = document.getElementById("benefit-list")
let disclaimerList = document.getElementById("disclaimer-list")
let techContainer = document.getElementsByClassName("tech-container")[0]
let linkContainer = document.getElementById("link-container")
let carousel = document.getElementById("carousel-wrapper")

fetch('./assets/json/projects.json')
    .then(response => response.json())
    .then(data => {

        Object.entries(data).forEach(([category, projects]) => {

            console.log("Key: ")
            console.log(category)
            console.log("Value: ")
            console.log(projects)

            Object.entries(projects).forEach(([_, project]) => {

                console.log("Project id: " + project.id)

                if (project.id === parseInt(id)) {
                    console.log("Id: " + project.name)

                    projectHeader.textContent = project.name
                    document.title = project.name

                    titleImage.src = project.title_image

                    projectDescription.textContent = project.description.short_desc

                    for (let feature in project.description.features) {
                        let featureItem = document.createElement("li")
                        featureItem.textContent = project.description.features[feature]
                        featureList.appendChild(featureItem)
                    }

                    for (let benefit in project.description.benefits) {
                        let benefitItem = document.createElement("li")
                        benefitItem.textContent = project.description.benefits[benefit]
                        benefitList.appendChild(benefitItem)
                    }

                    for (let disclaimer in project.description.disclaimers) {
                        let disclaimerItem = document.createElement("li")
                        disclaimerItem.textContent = project.description.disclaimers[disclaimer]
                        disclaimerList.appendChild(disclaimerItem)
                    }

                    Object.entries(project.tech_stack).forEach(([label, src]) => {
                        let techCard = document.createElement("div")
                        techCard.classList.add("tech-card", "bg-base", "rounded-4")
                        techCard.dataAos = "fade-up"
                        techCard.dataAosDelay = "400"

                        let techImg = document.createElement("img")
                        techImg.classList.add("rounded-4")
                        techImg.src = src

                        let techLabel = document.createElement("span")
                        techLabel.classList.add("tech-label", "fw-bold")
                        techLabel.textContent = label

                        techCard.appendChild(techImg)
                        techCard.appendChild(techLabel)

                        techContainer.appendChild(techCard)
                    })

                    let projectLink = project.link
                    if (projectLink !== "") {
                        console.log("Project Link: " + projectLink)

                        let linkHeader = document.createElement("h4")

                        let link = document.createElement("a")
                        link.classList.add("link-custom", "text-brand")
                        link.textContent = "View on Github"
                        link.href = projectLink
                        link.target = "_blank"

                        linkHeader.appendChild(link)
                        linkContainer.appendChild(linkHeader)
                        linkContainer.classList.add("mb-4", "ps-4", "pb-4")
                    }

                    for (let image in project.images) {
                        let carouselCell = document.createElement("div")
                        carouselCell.classList.add("carousel-item")
                        if (image === "0") {
                            carouselCell.classList.add("active")
                        }
                        carouselCell.style.height = "100%"

                        let carouselImg = document.createElement("img")
                        carouselImg.classList.add("d-block")
                        console.log("image: " + image + ": " + project.images[image])
                        carouselImg.src = project.images[image]
                        carouselImg.style.width = "100%"
                        carouselImg.style.height = "100%"
                        carouselImg.style.objectFit = "contain"

                        carouselCell.appendChild(carouselImg)
                        carousel.appendChild(carouselCell)
                    }

                    throw new Error("Stop Iterating!!")
                }
            })
        })
    })
        