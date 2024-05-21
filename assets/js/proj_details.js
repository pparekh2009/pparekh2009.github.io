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
        let carousel = document.querySelector('.carousel')
        
        // var flkty = new Flickity(carousel, {
        //     imagesLoaded: true,
        //     percentPosition: false,
        // });

        // var imgs = carousel.querySelectorAll('.carousel-cell img');
        // // get transform property
        // var docStyle = document.documentElement.style;
        // var transformProp = typeof docStyle.transform == 'string' ?
        //     'transform' : 'WebkitTransform';

        // flkty.on( 'scroll', function() {
        //     flkty.slides.forEach( function( slide, i ) {
        //         var img = imgs[i];
        //         var x = ( slide.target + flkty.x ) * -1/2;
        //         img.style[ transformProp ] = 'translateX(' + x  + 'px)';
        //     });
        // });

        fetch('./assets/json/projects.json')
            .then(response => response.json())
            .then(data => {
                Object.entries(data).forEach(([key, value]) => {
                    console.log("Key: " + key)
                    console.log("Value: " + value)

                    Object.entries(value).forEach(([v_key, v_value]) => {
                        console.log("Project id: " + v_value.id)
                        if (v_value.id == id) {
                            console.log("Id: " + v_value.name)
                            
                            projectHeader.textContent = v_value.name
                            
                            titleImage.src = v_value.title_image
                            
                            projectDescription.textContent = v_value.description.short_desc
                            
                            for (let feature in v_value.description.features) {
                                let featureItem = document.createElement("li")
                                featureItem.textContent = v_value.description.features[feature]
                                featureList.appendChild(featureItem)
                            }

                            for (let benefit in v_value.description.benefits) {
                                let benefitItem = document.createElement("li")
                                benefitItem.textContent = v_value.description.benefits[benefit]
                                benefitList.appendChild(benefitItem)
                            }

                            for (let disclaimer in v_value.description.disclaimers) {
                                let disclaimerItem = document.createElement("li")
                                disclaimerItem.textContent = v_value.description.disclaimers[disclaimer]
                                disclaimerList.appendChild(disclaimerItem)
                            }

                            Object.entries(v_value.tech_stack).forEach(([label, src]) => {
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

                            let projectLink = v_value.link
                            if (projectLink != "") {
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

                            // for (let image in v_value.images) {
                            //     let carouselCell = document.createElement("div")
                            //     carouselCell.classList.add("carousel-cell")

                            //     let carouselImg = document.createElement("img")
                            //     carouselImg.src = v_value.images[image]

                            //     carouselCell.appendChild(carouselImg)
                            //     carousel.appendChild(carouselCell)
                            // }

                            loadImages(v_value.images).then(() => {
                                console.log("inside then")
                                let flickity = new Flickity(carousel, {
                                    cellAlign: 'center',
                                    imagesLoaded: true,
                                    percentPosition: false,
                                    pageDots: true,
                                    laztLoad: true
                                });

                                var imgs = carousel.querySelectorAll('.carousel-cell img');
                                // get transform property
                                var docStyle = document.documentElement.style;
                                var transformProp = typeof docStyle.transform == 'string' ?
                                    'transform' : 'WebkitTransform';

                                flickity.on( 'scroll', function() {
                                    flickity.slides.forEach( function( slide, i ) {
                                        var img = imgs[i];
                                        var x = ( slide.target + flickity.x ) * -1/2;
                                        img.style[ transformProp ] = 'translateX(' + x  + 'px)';
                                    });
                                });
                            })

                            throw new Error("Stop Iterating!!")
                        }
                    })
                })
            })

        function loadImages(images) {
            return new Promise((resolve) => {
                for (let image in images) {
                    let carouselCell = document.createElement("div")
                    carouselCell.classList.add("carousel-cell")
    
                    let carouselImg = document.createElement("img")
                    carouselImg.src = images[image]
    
                    carouselCell.appendChild(carouselImg)
                    carousel.appendChild(carouselCell)
                }
                resolve()
            })
        }

        