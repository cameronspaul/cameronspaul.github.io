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

    // Check if it's a mobile device
    const isMobile = window.matchMedia("(max-width: 600px)").matches;

    panels.forEach(panel => {
        if (!isMobile) { // Check if it's not a mobile device
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
        }
    });
});


// Animated Background Script
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let points = [];
let isMobile = false; // Declare isMobile as a global variable

const maxDistance = 100;
const lineColor = 'rgba(255, 255, 255, 0.3)';
const pointColor = 'rgba(255, 255, 255, 0.3)';

function init() {
    // Adjust canvas size to match page
    canvas.width = document.body.offsetWidth;
    canvas.height = document.body.offsetHeight;

    // Set the number of points based on the device type
    const numPoints = isMobile ? 50 : 100;

    points = []; // Clear existing points array

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


function copyText(text) {
    // Create a dummy textarea element to hold the text temporarily
    var dummy = document.createElement("textarea");
    // Set its value to the text that needs to be copied
    dummy.value = text;
    // Append the dummy textarea to the body
    document.body.appendChild(dummy);
    // Select the text in the textarea
    dummy.select();
    // Execute the copy command
    document.execCommand("copy");
    // Remove the dummy textarea from the body
    document.body.removeChild(dummy);
  }

// Check if it's a mobile device
isMobile = window.matchMedia("(max-width: 600px)").matches;

init();

window.addEventListener('resize', init);
