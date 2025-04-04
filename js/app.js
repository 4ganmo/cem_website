document.addEventListener("DOMContentLoaded", () => {
    const contentArea = document.getElementById("main-content");

    function loadPage(page) {
        fetch(`pages/${page}.html`)
            .then((res) => {
                if (!res.ok) throw new Error("Page not found");
                return res.text();
            })
            .then((html) => {
                contentArea.innerHTML = html;
                initCarousel(); // ⬅️ Call this after content is loaded
            })
            .catch(() => {
                contentArea.innerHTML = `<p>Sorry, that section couldn't be loaded.</p>`;
            });
    }

    function initCarousel() {
        const imageElement = document.getElementById("slider-image");
        if (!imageElement) return;

        const imagePaths = [
            "assets/images/home/slide1.webp",
            "assets/images/home/slide2.webp",
            "assets/images/home/slide3.webp",
            "assets/images/home/slide4.webp"
        ];

        let currentIndex = 0;

        function showImage(index) {
            imageElement.src = imagePaths[index];
        }

        // Initial image
        showImage(currentIndex);

        // Button event handlers
        const prevBtn = document.querySelector(".prev");
        const nextBtn = document.querySelector(".next");

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + imagePaths.length) % imagePaths.length;
                showImage(currentIndex);
            });

            nextBtn.addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % imagePaths.length;
                showImage(currentIndex);
            });
        }
    }



    // Load home page by default
    loadPage("home");

    // Event listeners for nav
    document.querySelectorAll("nav a, .top-nav a").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const page = link.getAttribute("data-page");
            if (page) loadPage(page);
        });
    });
});
// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('.top-nav a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');

            // Set a class on the <body> like 'page-contact'
            document.body.className = `page-${page}`;

            // Load page content here (if you're doing AJAX or similar)
            // Example: loadContent(page);
        });
    });
});