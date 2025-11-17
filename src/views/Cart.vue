<template>
  <div class="cart-page">
    <div class="container">
      <div class="page-header">
        <h1>Shopping Cart</h1>
        <p v-if="cart.length > 0">Review your selected classes before checkout</p>
        <p v-else>Your cart is empty</p>
      </div>

      <div v-if="cart.length > 0" class="cart-content">
        <div class="cart-items">
          <div 
            v-for="item in cart" 
            :key="item.id"
            class="cart-item"
          >
            <div class="item-image">
              <img :src="item.image" :alt="item.title" />
            </div>
            
            <div class="item-details">
              <h3>{{ item.title }}</h3>
              <p class="instructor">by {{ item.instructor }}</p>
              <div class="item-meta">
                <span class="category">{{ item.category }}</span>
                <span class="age-group">Ages {{ item.ageGroup }}</span>
                <span class="duration">{{ item.duration }}</span>
              </div>
              <p class="schedule">{{ item.schedule }}</p>
            </div>

            <div class="item-quantity">
              <label>Quantity:</label>
              <div class="quantity-controls">
                <button @click="updateQuantity(item.id, item.quantity - 1)" class="quantity-btn">-</button>
                <input 
                  v-model.number="item.quantity" 
                  @change="updateQuantity(item.id, item.quantity)"
                  type="number" 
                  min="1" 
                  class="quantity-input"
                />
                <button @click="updateQuantity(item.id, item.quantity + 1)" class="quantity-btn">+</button>
              </div>
            </div>

            <div class="item-price">
              <span class="unit-price">£{{ item.price }}</span>
              <span class="total-price">£{{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>

            <div class="item-actions">
              <button @click="removeFromCart(item.id)" class="btn btn-danger btn-small">
                Remove
              </button>
            </div>
          </div>
        </div>

        <div class="cart-summary">
          <div class="summary-card">
            <h3>Order Summary</h3>
            
            <div class="summary-line">
              <span>Subtotal ({{ totalItems }} items):</span>
              <span>£{{ subtotal.toFixed(2) }}</span>
            </div>
            
            <div class="summary-line">
              <span>Processing Fee:</span>
              <span>£{{ processingFee.toFixed(2) }}</span>
            </div>
            
            <div class="summary-line total">
              <span>Total:</span>
              <span>£{{ total.toFixed(2) }}</span>
            </div>

            <div class="summary-actions">
              <router-link to="/classes" class="btn btn-outline">
                Continue Shopping
              </router-link>
              <router-link to="/checkout" class="btn btn-primary btn-large">
                Proceed to Checkout
              </router-link>
            </div>

            <div class="payment-methods">
              <p>We accept:</p>
              <div class="payment-icons">
                <span class="payment-icon">💳</span>
                <span class="payment-icon">🏦</span>
                <span class="payment-icon">📱</span>
                <span class="payment-icon">💰</span>
              </div>
            </div>
          </div>

          <div class="cart-benefits">
            <h4>Why Choose Us?</h4>
            <ul>
              <li>✅ Expert instructors with proven track records</li>
              <li>✅ Small class sizes for personalized attention</li>
              <li>✅ Flexible scheduling options</li>
              <li>✅ Money-back guarantee if not satisfied</li>
              <li>✅ Free materials and supplies included</li>
              <li>✅ Progress reports for parents</li>
            </ul>
          </div>
        </div>
      </div>

      <div v-else class="empty-cart">
        <div class="empty-cart-content">
          <div class="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Discover amazing classes and activities for your child</p>
          <router-link to="/classes" class="btn btn-primary btn-large">
            Browse Classes
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '../stores/store'

const store = useStore()

const cart = computed(() => store.cart)
const subtotal = computed(() => store.getCartTotal())
const processingFee = computed(() => subtotal.value * 0.03) // 3% processing fee
const total = computed(() => subtotal.value + processingFee.value)
const totalItems = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))

const updateQuantity = (itemId, newQuantity) => {
  store.updateCartQuantity(itemId, newQuantity)
}

const removeFromCart = (itemId) => {
  store.removeFromCart(itemId)
}
</script>

<style scoped>
.cart-page {
  padding: 2rem 0;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cart-item {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  display: grid;
  grid-template-columns: 120px 1fr auto auto auto;
  gap: 2rem;
  align-items: center;
}

.item-image {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.cart-item:hover .item-image img {
  transform: scale(1.05);
}

.item-details h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.instructor {
  color: #7f8c8d;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.item-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
}

.category {
  background: #3498db;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
}

.age-group,
.duration {
  color: #7f8c8d;
}

.schedule {
  color: #5a6c7d;
  font-size: 0.9rem;
  margin: 0;
}

.item-quantity {
  text-align: center;
}

.item-quantity label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
  font-size: 0.9rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #e9ecef;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: all 0.3s;
}

.quantity-btn:hover {
  background: #f8f9fa;
  border-color: #3498db;
}

.quantity-input {
  width: 50px;
  height: 30px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
}

.quantity-input:focus {
  outline: none;
  border-color: #3498db;
}

.item-price {
  text-align: center;
}

.unit-price {
  display: block;
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.total-price {
  display: block;
  color: #27ae60;
  font-weight: bold;
  font-size: 1.1rem;
}

.item-actions {
  text-align: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
  display: inline-block;
  text-align: center;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover {
  background: #2980b9;
}

.btn-outline {
  background: transparent;
  color: #3498db;
  border: 2px solid #3498db;
}

.btn-outline:hover {
  background: #3498db;
  color: white;
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background: #c0392b;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.btn-large {
  padding: 1.2rem 2rem;
  font-size: 1.1rem;
}

.cart-summary {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.summary-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  position: sticky;
  top: 2rem;
}

.summary-card h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #5a6c7d;
}

.summary-line.total {
  border-top: 2px solid #e9ecef;
  padding-top: 1rem;
  margin-top: 1rem;
  font-weight: bold;
  font-size: 1.1rem;
  color: #2c3e50;
}

.summary-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
}

.payment-methods {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

.payment-methods p {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.payment-icons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.payment-icon {
  font-size: 1.5rem;
}

.cart-benefits {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
}

.cart-benefits h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.cart-benefits ul {
  list-style: none;
  padding: 0;
}

.cart-benefits li {
  padding: 0.5rem 0;
  color: #5a6c7d;
  font-size: 0.9rem;
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-cart-content {
  max-width: 400px;
  margin: 0 auto;
}

.empty-cart-icon {
  font-size: 4rem;
  margin-bottom: 2rem;
}

.empty-cart-content h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.empty-cart-content p {
  color: #7f8c8d;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  
  .cart-item {
    grid-template-columns: 1fr;
    gap: 1rem;
    text-align: center;
  }
  
  .item-image {
    width: 100%;
    height: 200px;
    margin: 0 auto;
  }
  
  .item-meta {
    justify-content: center;
  }
  
  .summary-card {
    position: static;
  }
  
  .summary-actions {
    flex-direction: column;
  }
}
</style>
