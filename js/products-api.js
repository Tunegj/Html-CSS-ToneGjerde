const API_URL = "https://v2.api.noroff.dev/rainy-days";

const grid = document.querySelector("[data-product-grid]");
const productCount = document.querySelector("[data-product-count]");

async function fetchProducts() {
  if (!grid) return;

  grid.innerHTML = "<p class='loading'>Loading products...</p>";

  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const json = await res.json();
    const products = json.data;

    if (productCount) {
      productCount.textContent = `Showing ${products.length} out of ${json.meta.totalCount} products`;
    }

    grid.innerHTML = products
      .map((product) => {
        const imageUrl = product.image?.url || "";
        const imageAlt = product.image?.alt || product.title;

        return `
    <article class ="product-card">
      <div class="image-container">  
        <img src="${imageUrl}" alt="${imageAlt}" class="product-img"/>
      </div>
      <div class="product-info">
        <h3 class="product-details">${product.title}</h3>
        <p class="price">${product.price}</p>
      </div>
    </article>
    `;
      })
      .join("");
  } catch (err) {
    console.error(err);
    grid.innerHTML =
      "<p class='error'>Failed to load products. Please try again later.</p>";
  }
}

fetchProducts();
