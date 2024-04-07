// scripts.js
document.addEventListener("DOMContentLoaded", function() {
    const panels = document.querySelectorAll(".panel");

    // Function to add fade-in animation to a panel with specified delay
    function fadeInPanel(panel, delay) {
        setTimeout(function() {
            panel.classList.add("fade-in");
        }, delay);
    }

    // Apply fade-in animation with specified delays to each panel
    fadeInPanel(panels[1], 200); // Tier 2 comes in first
    fadeInPanel(panels[0], 300); // Tier 1 comes in after 500ms
    fadeInPanel(panels[2], 450); // Tier 3 comes in after 1000ms
});

document.addEventListener("DOMContentLoaded", function() {
    const panels = document.querySelectorAll(".panel");

    panels.forEach(panel => {
        panel.addEventListener("mouseover", function() {
            const tier = panel.classList.contains("tier1") ? 1 : (panel.classList.contains("tier2") ? 2 : 3);
            switch(tier) {
                case 1:
                    panel.style.transform = "translateY(-10px) scale(1.1)";
                    panels.forEach(otherPanel => {
                        if (otherPanel !== panel) {
                            otherPanel.style.transform = "translateX(50px)";
                        }
                    });
                    break;
                case 2:
                    panel.style.transform = "translateY(-10px) scale(1.1)";
                    panels.forEach(otherPanel => {
                        if (otherPanel !== panel) {
                            if (otherPanel.classList.contains("tier1")) {
                                otherPanel.style.transform = "translateX(-60px)";
                            } else if (otherPanel.classList.contains("tier3")) {
                                otherPanel.style.transform = "translateX(60px)";
                            }
                        }
                    });
                    break;
                case 3:
                    panel.style.transform = "translateY(-10px) scale(1.1)";
                    panels.forEach(otherPanel => {
                        if (otherPanel !== panel) {
                            otherPanel.style.transform = "translateX(-50px)";
                        }
                    });
                    break;
            }
        });

        panel.addEventListener("mouseout", function() {
            panel.style.transform = "translateY(0) scale(1)";
            panels.forEach(otherPanel => {
                otherPanel.style.transform = "translateX(0)";
            });
        });
    });
});


// Animated Background Script
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let points = [];
const numPoints = 100;
const maxDistance = 100;
const lineColor = 'rgba(255, 255, 255, 0.3)';
const pointColor = 'rgba(255, 255, 255, 0.3)';

function init() {
    // Adjust canvas size to match page
    canvas.width = document.body.offsetWidth;
    canvas.height = document.body.offsetHeight;

    for (let i = 0; i < numPoints; i++) {
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: Math.random() * 2 - 1,
            vy: Math.random() * 2 - 1
        });
    }

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        ctx.fillStyle = pointColor;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < points.length; j++) {
            const otherPoint = points[j];
            const dx = otherPoint.x - point.x;
            const dy = otherPoint.y - point.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                ctx.strokeStyle = lineColor;
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(otherPoint.x, otherPoint.y);
                ctx.stroke();
            }
        }

        point.x += point.vx;
        point.y += point.vy;

        if (point.x < 0 || point.x > canvas.width) {
            point.vx *= -1;
        }
        if (point.y < 0 || point.y > canvas.height) {
            point.vy *= -1;
        }
    }
}

init();

window.addEventListener('resize', init);


document.addEventListener("DOMContentLoaded", function() {
    // Check if it's a mobile device
    const isMobile = window.matchMedia("(max-width: 600px)").matches;

    if (isMobile) {
        // Initialize Swiper
        const swiper = new Swiper(".swiper-container", {
            slidesPerView: "auto",
            spaceBetween: 20,
            loop: false,
        });
    }
});