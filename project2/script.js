const carousel = document.getElementById('carousel');
let index = 0;

function moveSlide(direction) {
    const total = carousel.children.length;
    index = (index + direction + total) % total;
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

// Autoplay every 4 seconds
setInterval(() => moveSlide(1), 4000);

// Open lightbox with clicked image
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
}

// Close lightbox
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Attach click event to each gallery image
window.onload = function () {
    const galleryImages = document.querySelectorAll('.grid-container img');
    galleryImages.forEach(img => {
        img.addEventListener('click', () => openLightbox(img));
    });
};
