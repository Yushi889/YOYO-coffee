/**
 * 1. Data Configuration
 */
const products = [
    { id: 1, name: 'Americano', price: 22.0, baseCal: 15, emoji: '☕' },
    { id: 2, name: 'Coconut Latte', price: 28.0, baseCal: 190, emoji: '🥥' },
    { id: 3, name: 'Oat Latte', price: 30.0, baseCal: 135, emoji: '🌾' },
    { id: 4, name: 'Caramel Macchiato', price: 32.0, baseCal: 250, emoji: '🍯' }
];

// App State
let cartCount = 0;
let currentBaseCal = 0;
let currentExtraCal = 0;

/**
 * 2. Initialize App
 */
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    initModalLogic();
});

/**
 * 3. Render Product List
 */
function renderMenu() {
    const list = document.getElementById('menuList');
    if (!list) return;

    list.innerHTML = products.map(p => `
        <div class="item" onclick="openModal('${p.name}', ${p.baseCal})">
            <div class="item-img">${p.emoji}</div>
            <div class="item-info">
                <h4>${p.name}</h4>
                <span class="price">$${p.price.toFixed(2)}</span>
            </div>
            <button class="add-btn">+</button>
        </div>
    `).join('');
}

/**
 * 4. Modal & Calorie Logic
 */
const overlay = document.getElementById('modalOverlay');

function openModal(name, cal) {
    document.getElementById('m-title').innerText = name;
    currentBaseCal = cal;
    currentExtraCal = 0; // Reset extra sugar cal
    
    resetSelection();
    updateCalorieDisplay();
    
    overlay.style.display = 'flex';
}

function initModalLogic() {
    // Sugar options click handler
    document.getElementById('sugarOpts').addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (chip) {
            document.querySelectorAll('#sugarOpts .chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            // Get calorie from data-cal attribute
            currentExtraCal = parseInt(chip.dataset.cal) || 0;
            updateCalorieDisplay();
        }
    });

    // Temperature options click handler
    document.getElementById('tempOpts').addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (chip) {
            document.querySelectorAll('#tempOpts .chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        }
    });

    // Close modal when clicking background
    overlay.onclick = (e) => {
        if (e.target === overlay) closeModal();
    };
}

function updateCalorieDisplay() {
    const total = currentBaseCal + currentExtraCal;
    document.getElementById('total-cal').innerText = total;
}

/**
 * 5. Cart Logic
 */
function addToCart() {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    
    // Add a simple "bounce" animation to the cart bar
    const cartBar = document.querySelector('.cart-bar');
    cartBar.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.05)' },
        { transform: 'scale(1)' }
    ], {
        duration: 200,
        easing: 'ease-in-out'
    });

    closeModal();
}

function closeModal() {
    overlay.style.display = 'none';
}

// Reset UI state inside modal
function resetSelection() {
    document.querySelectorAll('.chips').forEach(group => {
        const chips = group.querySelectorAll('.chip');
        chips.forEach((c, idx) => {
            idx === 0 ? c.classList.add('active') : c.classList.remove('active');
        });
    });
}
