document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGridContainer');

    if (!productGrid) {
        console.log("productGridContainer not found. This script might be for a different page.");
        return;
    };

    fetch('data/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(products => {
            let productsToDisplay = products; // Default: tampilkan semua produk

            const isHomePage = document.body.classList.contains('home-page'); 

            if (isHomePage) {
                productsToDisplay = products
                    .sort((a, b) => a.id - b.id)
                    .slice(0, 4);
            }

            productsToDisplay.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                productCard.innerHTML = `
                    <img src="${product.gambar}" alt="${product.nama}" width="300">
                    <h4>${product.nama}</h4>
                    <p>${product.harga}</p>
                    <a href="detail.html?id=${product.id}" class="btn">Lihat Detail</a>
                `;

                productGrid.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Ada masalah saat mengambil data produk:', error);
            productGrid.innerHTML = '<p>Maaf, produk tidak dapat dimuat saat ini. Silakan coba lagi nanti.</p>';
        });
});