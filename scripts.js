document.addEventListener("DOMContentLoaded", function() {
    const panels = document.querySelectorAll(".tier");
    const table = document.querySelector("#compare table");
    const roadmapPanels = document.querySelectorAll(".timeline-item");
    const isMobile = window.matchMedia("(max-width: 600px)").matches;

    // Check if it's a mobile device
    if (!isMobile) {
        // Attach event listeners to panels
        panels.forEach(panel => {
            panel.addEventListener("mouseover", function() {
                const tier = panel.id === "tier1"? 1 : (panel.id === "tier2"? 2 : 3);
                switch(tier) {
                    case 1:
                        panel.style.transform = "translateY(-10px) scale(1.1)";
                        panels.forEach(otherPanel => {
                            if (otherPanel!== panel) {
                                otherPanel.style.transform = "translateX(50px)";
                            }
                        });
                        break;
                    case 2:
                        panel.style.transform = "translateY(-10px) scale(1.1)";
                        panels.forEach(otherPanel => {
                            if (otherPanel!== panel) {
                                if (otherPanel.id === "tier1") {
                                    otherPanel.style.transform = "translateX(-60px)";
                                } else if (otherPanel.id === "tier3") {
                                    otherPanel.style.transform = "translateX(60px)";
                                }
                            }
                        });
                        break;
                    case 3:
                        panel.style.transform = "translateY(-10px) scale(1.1)";
                        panels.forEach(otherPanel => {
                            if (otherPanel!== panel) {
                                otherPanel.style.transform = "translateX(-50px)";
                            }
                        });
                        break;
                }
            });

            // Restore styles on mouseout
            panel.addEventListener("mouseout", function() {
                panel.style.transform = "translateY(0) scale(1)";
                panels.forEach(otherPanel => {
                    otherPanel.style.transform = "translateX(0)";
                });
            });
        });

        // Attach event listeners to roadmap panels
        roadmapPanels.forEach(panel => {
            panel.addEventListener("mouseover", function() {
                this.style.transform = "scale(1.1)";
            });

            panel.addEventListener("mouseout", function() {
                this.style.transform = "scale(1)";
            });
        });

        // Attach event listeners to table
        table.addEventListener("mouseover", function() {
            table.style.transform = "scale(1.1)";
        });

        table.addEventListener("mouseout", function() {
            table.style.transform = "scale(1)";
        });
    }
});


// Attach event listeners to links
document.addEventListener("DOMContentLoaded", function() {
    const isMobile = window.matchMedia("(max-width: 600px)").matches;
    const navLinks = document.querySelectorAll('nav ul li a,.cta-button');

    // Check if it's a mobile device
    if (!isMobile) {
        // Attach event listeners to links
        navLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                const headerOffset = document.querySelector('header').offsetHeight;
                const additionalOffset = 120; // Add additional offset as needed
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset - additionalOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }
});
