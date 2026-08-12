const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get("id")

let projectHeader = document.getElementById("project-header")
let titleImage = document.getElementById("title-image")
let projectDescription = document.getElementById("project-description")
let featureList = document.getElementById("feature-list")
let benefitList = document.getElementById("benefit-list")
let disclaimerList = document.getElementById("disclaimer-list")
let techContainer = document.getElementById("tech-stack-grid")
let linkContainer = document.getElementById("link-container")
let carousel = document.getElementById("carousel-wrapper")

fetch('./assets/json/projects.json')
    .then(response => response.json())
    .then(data => {

        Object.entries(data).forEach(([category, projects]) => {

            Object.entries(projects).forEach(([_, project]) => {

                if (project.id === id) {

                    projectHeader.textContent = project.name
                    document.title = project.name

                    titleImage.src = project.title_image
                    titleImage.alt = project.name

                    projectDescription.textContent = project.description.short_desc

                    for (let feature in project.description.features) {
                        let featureCard = document.createElement("div")
                        featureCard.classList.add("feature-card")
                        featureCard.setAttribute("data-aos", "fade-up")

                        let featureIcon = document.createElement("i")
                        featureIcon.classList.add("las", "la-check-circle")

                        let featureText = document.createElement("span")
                        featureText.textContent = project.description.features[feature]

                        featureCard.appendChild(featureIcon)
                        featureCard.appendChild(featureText)
                        featureList.appendChild(featureCard)
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
                        techCard.setAttribute("data-aos", "fade-up")
                        techCard.setAttribute("data-aos-delay", "400")

                        let techImg = document.createElement("img")
                        techImg.classList.add("rounded-4")
                        techImg.src = src
                        techImg.alt = label

                        let techLabel = document.createElement("span")
                        techLabel.classList.add("tech-label", "fw-bold")
                        techLabel.textContent = label

                        techCard.appendChild(techImg)
                        techCard.appendChild(techLabel)

                        techContainer.appendChild(techCard)
                    })

                    let projectLink = project.link
                    if (projectLink !== "") {
                        let link = document.createElement("a")
                        link.classList.add("btn", "btn-brand")
                        link.textContent = "View on GitHub"
                        link.href = projectLink
                        link.target = "_blank"

                        linkContainer.appendChild(link)
                        linkContainer.classList.add("mt-4")
                    }

                    for (let image in project.images) {
                        let carouselCell = document.createElement("div")
                        carouselCell.classList.add("carousel-item")
                        if (image === "0") {
                            carouselCell.classList.add("active")
                        }

                        let carouselImg = document.createElement("img")
                        carouselImg.classList.add("d-block")
                        carouselImg.src = project.images[image]
                        carouselImg.alt = project.name + " screenshot " + (parseInt(image) + 1)

                        carouselCell.appendChild(carouselImg)
                        carousel.appendChild(carouselCell)
                    }

                    throw new Error("Stop Iterating!!")
                }
            })
        })
    })
    .catch(error => console.error("Error fetching JSON data: ", error))
