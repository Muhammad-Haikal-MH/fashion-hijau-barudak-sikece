AOS.init();

window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  setTimeout(function () {
    preloader.classList.add("fade-out");
    setTimeout(function () {
      preloader.style.display = "none";
    }, 500); // Tunggu 0.5 detik sebelum menghilangkan preloader
  }, 2000); // Tunggu 2 detik sebelum memulai transisi
});

window.onscroll = function(){
  const header = document.querySelector('header');
  const fixNav = header.offsetTop;
  const tutop = document.getElementById('tutop');

  if (window.pageYOffset > fixNav) {
      header.classList.add('navbar-fixed');
      tutop.classList.remove('hidden');
      tutop.classList.add('flex');
    } else{
      header.classList.remove('navbar-fixed');
      tutop.classList.remove('flex');
      tutop.classList.add('hidden');
      
  }
}

const products = {
    men: [
      {
        id: 'm1',
        name: 'Kemeja Koko',
        price: 'Rp 199.000',
        rating: '4.8',
        image: 'man/koko.webp',
        category: 'kaos',
        ukuran: 'M'
      },
      {
        id: 'm2',
        name: 'kemeja flannel',
        price: 'Rp 249.000',
        rating: '4.7',
        image: 'man/kemeja2.avif',
        category: 'kemeja',
        ukuran: 'L'
      },
      {
        id: 'm3',
        name: 'Sepatu Sneakers',
        price: 'Rp 349.000',
        rating: '4.6',
        image: 'man/sepatu1.webp',
        category: 'sepatu',
        ukuran: '42'
      },
      {
        id: 'm4',
        name: 'Kaos Oversize',
        price: 'Rp 279.000',
        rating: '4.5',
        image: 'man/kaos1.webp',
        category: 'kaos',
        ukuran: 'L'
      },
      {
        id: 'm5',
        name: 'Kaos Distro',
        price: 'Rp 59.000',
        rating: '4.9',
        image: 'man/kaos2.webp',
        category: 'kaos',
        ukuran: 'M'
      },
      {
        id: 'm6',
        name: 'Sepatu Sneaker',
        price: 'Rp 1.189.000',
        rating: '4.7',
        image: 'man/sepatu2.webp',
        category: 'sepatu',
        ukuran: '41'
      },
      {
        id: 'm7',
        name: 'Celana Pendek',
        price: 'Rp 79.000',
        rating: '4.5',
        image: 'man/celanapdk.webp',
        category: 'celana',
        ukuran: '30'
      },
      {
        id: 'm8',
        name: 'jersey Man United',
        price: 'Rp 999.000',
        rating: '4.9',
        image: 'man/kaos3.jpeg',
        category: 'kaos',
        ukuran: 'M'
      }
    ],
    women: [
      {
        id: 'w1',
        name: 'Celana panjang',
        price: 'Rp 299.000',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        category: 'celana',
        ukuran: 'S'
      },
      {
        id: 'w2',
        name: 'Kemeja Wanita',
        price: 'Rp 159.000',
        rating: '4.8',
        image: 'woman/kemeja.jpg',
        category: 'kemeja',
        ukuran: 'M'
      },
      {
        id: 'w3',
        name: 'Sepatu Sneakers',
        price: 'Rp 1.259.000',
        rating: '4.7',
        image: 'woman/sepatu.webp',
        category: 'sepatu',
        ukuran: 39
      },
      {
        id: 'w4',
        name: 'Sweater Oversize',
        price: 'Rp 189.000',
        rating: '4.9',
        image: 'woman/sweater.webp',
        category: 'sweater',
        ukuran: 'M'
      },
      {
        id: 'w5',
        name: 'Sweater Rajut',
        price: 'Rp 219.000',
        rating: '4.6',
        image: 'woman/sweater2.avif',
        category: 'sweater',
        ukuran: 'L'
      },
      {
        id: 'w6',
        name: 'Rok Hitam',
        price: 'Rp 199.000',
        rating: '4.8',
        image: 'woman/rok.webp',
        category: 'celana',
        ukuran: '28'
      },
      {
        id: 'w7',
        name: 'Rok pastel',
        price: 'Rp 179.000',
        rating: '4.5',
        image: 'woman/rok2.jpg',
        category: 'celana',
        ukuran: '26'
      },
      {
        id: 'w8',
        name: 'sepatu heels',
        price: 'Rp 579.000',
        rating: '4.7',
        image: 'woman/sepatu2.jpg',
        category: 'sepatu',
        ukuran:'37'
      }
    ]
  };

  
  
  // State variables
  let currentFilters = {
    men: 'all',
    women: 'all'
  };
  let searchTerm = '';
  
  // DOM elements
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearch');
  const menProductList = document.getElementById('menProductList');
  const womenProductList = document.getElementById('womenProductList');
  const noResultsDiv = document.getElementById('noResults');
  const clearFiltersBtn = document.getElementById('clearFilters');
  const categoryButtons = document.querySelectorAll('.category-filter');
  const modal = document.getElementById('modal');
  

  // Initialize the page
  document.addEventListener('DOMContentLoaded', () => {
    // Render all products initially
    renderProducts('men', products.men);
    renderProducts('women', products.women);
    
    // Set up event listeners
    setupEventListeners();
    
    // Set up banner slider
    setupBannerSlider();
  });
  
  // Set up event listeners
  function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', handleSearch);
    
    // Clear search button
    // clearSearchBtn.addEventListener('click', clearSearch);
    
    // Category filter buttons
    categoryButtons.forEach(button => {
      button.addEventListener('click', handleCategoryFilter);
    });
    
    // Clear filters button
    clearFiltersBtn.addEventListener('click', clearAllFilters);
  }
  
  // Handle search input
  function handleSearch() {
    searchTerm = searchInput.value.toLowerCase().trim();
    filterAndRenderProducts();
  }
  
  // Clear search
  function clearSearch() {
    searchInput.value = '';
    searchTerm = '';
    filterAndRenderProducts();
  }
  
  // Handle category filter button click
  function handleCategoryFilter(event) {
    const button = event.currentTarget;
    const category = button.dataset.category;
    const section = button.dataset.section;
    
    // Update current filter for this section
    currentFilters[section] = category;
    
    // Update button styles
    updateCategoryButtonStyles(section);
    
    // Filter and render products
    filterAndRenderProducts();
  }
  
  // Update category button styles
  function updateCategoryButtonStyles(section) {
    // Get all buttons for this section
    const buttons = document.querySelectorAll(`.category-filter[data-section="${section}"]`);
    
    // Update styles based on current filter
    buttons.forEach(button => {
      if (button.dataset.category === currentFilters[section]) {
        button.classList.remove('bg-gray-300');
        button.classList.add('bg-gray-800', 'text-white');
      } else {
        button.classList.remove('bg-gray-800', 'text-white');
        button.classList.add('bg-gray-300');
      }
    });
  }
  
  // Clear all filters
  function clearAllFilters() {
    // Reset search
    searchInput.value = '';
    searchTerm = '';
    
    // Reset category filters
    currentFilters.men = 'all';
    currentFilters.women = 'all';
    
    // Update button styles
    updateCategoryButtonStyles('men');
    updateCategoryButtonStyles('women');
    
    // Render all products
    filterAndRenderProducts();
  }
  
  // Filter and render products
  function filterAndRenderProducts() {
    // Filter men's products
    const filteredMenProducts = filterProducts(products.men, currentFilters.men);
    
    // Filter women's products
    const filteredWomenProducts = filterProducts(products.women, currentFilters.women);
    
    // Render filtered products
    renderProducts('men', filteredMenProducts);
    renderProducts('women', filteredWomenProducts);
    
    // Show/hide no results message
    const totalProducts = filteredMenProducts.length + filteredWomenProducts.length;
    if (totalProducts === 0 && (searchTerm !== '' || currentFilters.men !== 'all' || currentFilters.women !== 'all')) {
      noResultsDiv.classList.remove('hidden');
    } else {
      noResultsDiv.classList.add('hidden');
    }
  }
  
  // Filter products by category and search term
  function filterProducts(productList, categoryFilter) {
    return productList.filter(product => {
      // Filter by category
      const categoryMatch = categoryFilter === 'all' || product.category === categoryFilter;
      
      // Filter by search term
      const searchMatch = searchTerm === '' || 
                          product.name.toLowerCase().includes(searchTerm) || 
                          product.category.toLowerCase().includes(searchTerm) ||
                          product.price.toLowerCase().includes(searchTerm);
      
      return categoryMatch && searchMatch;
    });
  }
  
  // Render products to the DOM
  function renderProducts(section, productList) {
    const container = section === 'men' ? menProductList : womenProductList;
    
    // Clear container
    container.innerHTML = '';
    
    // Add products
    productList.forEach(product => {
      const productCard = createProductCard(product);
      container.appendChild(productCard);
    });
  }
  
 // Fungsi untuk membuat card produk
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card bg-white rounded-lg overflow-hidden h-full shadow-sm cursor-pointer';
  card.dataset.id = product.id;
  card.dataset.category = product.category;

  card.innerHTML = `
    <img
      src="${product.image}"
      alt="${product.name}"
      class="w-full md:h-56 h-44 object-cover"
    />
    <div class="p-2">
      <p class="text-md font-medium">${product.name}</p>
      <div class="flex justify-between items-center mt-1">
        <p class="text-lg md:text-xl font-semibold">${product.price}</p>
        <p class="text-lg md:text-xl text-gray-500">⭐ ${product.rating}</p>
      </div>
      <span class="inline-block mt-1 w text-xs px-2 py-1 bg-gray-100 rounded-full">${product.category}</span>
      <span class="inline-block mt-1 text-xs px-2 py-1 bg-gray-100 rounded-full">${product.ukuran}</span>
    </div>
  `;

  // Tambahkan event listener untuk menampilkan modal produk
  card.addEventListener('click', () => {
      modal.className = 'modal fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center';
      modal.innerHTML = `
        <div class="modal-content bg-white rounded-lg shadow-md p-4 w-1/2 md:w-1/3 relative animate-fade-in">
          <button class="close-modal absolute top-4 right-4 text-gray-500 font-extrabold hover:text-gray-900">
            X
          </button>
          <img
            src="${product.image}"
            alt="${product.name}"
            class="w-full md:h-72 h-40 object-cover rounded-md"
          />
          <h2 class="text-lg md:text-2xl font-semibold">${product.name}</h2>
          <p class="text-md md:text-lg font-medium">${product.price}</p>
          <p class="text-md md:text-lg font-medium">⭐ ${product.rating}</p>
          <button class="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg mt-4" onclick="showKeranjangModal()">Keranjang</button>
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-4" onclick="showBeliModal()">Beli</button>
        </div>
      `;

      // Tambahkan event listener untuk menutup modal
      modal.querySelector('.close-modal').addEventListener('click', () => {
          modal.querySelector('.modal-content').classList.remove('animate-fade-in');
          modal.querySelector('.modal-content').classList.add('animate-fade-out');
          setTimeout(() => {
              modal.remove();
          }, 500);
      });

      // Tambahkan event listener untuk menutup modal jika diklik di luar modal
      modal.addEventListener('click', (e) => {
          if (e.target === modal) {
              modal.querySelector('.modal-content').classList.remove('animate-fade-in');
              modal.querySelector('.modal-content').classList.add('animate-fade-out');
              setTimeout(() => {
                  modal.remove();
              }, 500);
          }
      });

      document.body.appendChild(modal);
  });

  return card;
}

// Fungsi untuk menampilkan modal keranjang
function showKeranjangModal() {
  modal.remove();
  modal.className = 'modal fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center';
  modal.innerHTML = `
    <div class="modal-content fixed inset-0  flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in-up">
        <div class="bg-emerald-50 p-6 flex justify-center">
          <div class="bg-emerald-100 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
        <div class="p-6 text-center">
          <h3 class="text-lg md:text-2xl font-bold text-gray-800 mb-2">Success!</h3>
          <p class="text-gray-600 mb-6">Proudk telah ditambahkan ke keranjang!</p>
          <button class="close-modal w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300">
            Continue
          </button>
        </div>
      </div>
    </div>
  `;

  // Tambahkan event listener untuk menutup modal
  modal.querySelector('.close-modal').addEventListener('click', () => {
      modal.remove();
  });

  // Tambahkan event listener untuk menutup modal jika diklik di luar modal
  modal.addEventListener('click', (e) => {
      if (e.target === modal) {
          modal.remove();
      }
  });

  document.body.appendChild(modal);
}

// Fungsi untuk menampilkan modal beli
function showBeliModal() {
  modal.remove();
  modal.className = 'modal fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center';
  modal.innerHTML = `

    <div class="modal-content fixed inset-0 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in-up">
        <div class="bg-emerald-50 p-6 flex justify-center">
          <div class="bg-emerald-100 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
        <div class="p-6 text-center">
          <h3 class="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
          <p class="text-gray-600 mb-6">produk telah dibeli!</p>
          <button class="close-modal w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300">
            Continue
          </button>
        </div>
      </div>
    </div>
  `;

  // Tambahkan event listener untuk menutup modal
  modal.querySelector('.close-modal').addEventListener('click', () => {
      modal.remove();
  });

  // Tambahkan event listener untuk menutup modal jika diklik di luar modal
  modal.addEventListener('click', (e) => {
      if (e.target === modal) {
          modal.remove();
      }
  });

  document.body.appendChild(modal);
}
document.addEventListener('DOMContentLoaded', function() {
      // Mobile carousel functionality
      const carousel = document.getElementById('carousel');
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      
      if (carousel && prevBtn && nextBtn) {
        let currentSlide = 0;
        const slides = carousel.children;
        const totalSlides = slides.length;
        
        function updateCarousel() {
          carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        prevBtn.addEventListener('click', function() {
          currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
          updateCarousel();
        });
        
        nextBtn.addEventListener('click', function() {
          currentSlide = (currentSlide + 1) % totalSlides;
          updateCarousel();
        });
        
        // Auto slide
        setInterval(function() {
          currentSlide = (currentSlide + 1) % totalSlides;
          updateCarousel();
        }, 5000);
      }
      
      // Desktop carousel functionality
      const desktopCarousel = document.getElementById('desktop-carousel');
      const desktopPrevBtn = document.getElementById('desktop-prevBtn');
      const desktopNextBtn = document.getElementById('desktop-nextBtn');
      const desktopDots = document.querySelectorAll('.desktop-dot');
      
      if (desktopCarousel && desktopPrevBtn && desktopNextBtn) {
        let desktopCurrentSlide = 0;
        const desktopSlides = desktopCarousel.children;
        const desktopTotalSlides = desktopSlides.length;
        
        function updateDesktopCarousel() {
          desktopCarousel.style.transform = `translateX(-${desktopCurrentSlide * 100}%)`;
          
          // Update dots
          desktopDots.forEach((dot, index) => {
            if (index === desktopCurrentSlide) {
              dot.classList.add('bg-white');
              dot.classList.remove('bg-white/50');
            } else {
              dot.classList.remove('bg-white');
              dot.classList.add('bg-white/50');
            }
          });
        }
        
        desktopPrevBtn.addEventListener('click', function() {
          desktopCurrentSlide = (desktopCurrentSlide - 1 + desktopTotalSlides) % desktopTotalSlides;
          updateDesktopCarousel();
        });
        
        desktopNextBtn.addEventListener('click', function() {
          desktopCurrentSlide = (desktopCurrentSlide + 1) % desktopTotalSlides;
          updateDesktopCarousel();
        });
        
        // Dot navigation
        desktopDots.forEach((dot, index) => {
          dot.addEventListener('click', function() {
            desktopCurrentSlide = index;
            updateDesktopCarousel();
          });
        });
        
        // Auto slide
        setInterval(function() {
          desktopCurrentSlide = (desktopCurrentSlide + 1) % desktopTotalSlides;
          updateDesktopCarousel();
        }, 5000);
      }
      
      console.log('E-commerce website loaded');
    });

    // swiper
    var swiper = new Swiper(".mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    var swiper2 = new Swiper(".mySwiper2", {
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });