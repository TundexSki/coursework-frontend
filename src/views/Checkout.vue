<template>
  <div class="checkout-page">
    <div class="container">
      <div class="page-header">
        <h1>Checkout</h1>
        <p>Complete your booking</p>
      </div>

      <!-- Success Message -->
      <div v-if="orderSuccess" class="success-message">
        <div class="success-icon">✓</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your booking. You will receive a confirmation shortly.</p>
        <router-link to="/lessons" class="btn btn-primary">Browse More Lessons</router-link>
      </div>

      <!-- Checkout Form -->
      <div v-else-if="cart.length > 0" class="checkout-content">
        <div class="checkout-form">
          <div class="form-section">
            <h3>Your Details</h3>
            
            <div class="form-group">
              <label for="name">Name (letters only)</label>
              <input 
                v-model="form.name" 
                type="text" 
                id="name" 
                class="form-input"
                :class="{ 'invalid': form.name && !isNameValid }"
                placeholder="Your full name"
              />
              <span v-if="form.name && !isNameValid" class="error-text">
                Name must contain only letters and spaces
              </span>
            </div>
            
            <div class="form-group">
              <label for="phone">Phone (numbers only)</label>
              <input 
                v-model="form.phone" 
                type="tel" 
                id="phone" 
                class="form-input"
                :class="{ 'invalid': form.phone && !isPhoneValid }"
                placeholder="Your phone number"
              />
              <span v-if="form.phone && !isPhoneValid" class="error-text">
                Phone must contain only numbers
              </span>
            </div>
          </div>

          <div class="order-summary">
            <h3>Order Summary</h3>
            <div class="order-items">
              <div v-for="item in cart" :key="item.id" class="order-item">
                <span class="item-name">{{ item.subject }}</span>
                <span class="item-qty">x{{ item.quantity }}</span>
                <span class="item-price">£{{ item.price * item.quantity }}</span>
              </div>
            </div>
            <div class="order-total">
              <span>Total:</span>
              <span>£{{ cartTotal }}</span>
            </div>
          </div>

          <div class="checkout-actions">
            <router-link to="/cart" class="btn btn-outline">Back to Cart</router-link>
            <button 
              @click="placeOrder" 
              class="btn btn-primary btn-large"
              :disabled="!isFormValid || isProcessing"
            >
              {{ isProcessing ? 'Processing...' : 'Place Order' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="empty-cart">
        <p>Your cart is empty.</p>
        <router-link to="/lessons" class="btn btn-primary">Browse Lessons</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from '../stores/store'

const store = useStore()

const form = ref({
  name: '',
  phone: ''
})

const isProcessing = ref(false)
const orderSuccess = ref(false)

const cart = computed(() => store.state.cart)
const cartTotal = computed(() => store.getCartTotal())

// Validation: name must be letters and spaces only
const isNameValid = computed(() => {
  return /^[A-Za-z\s]+$/.test(form.value.name)
})

// Validation: phone must be numbers only
const isPhoneValid = computed(() => {
  return /^[0-9]+$/.test(form.value.phone)
})

// Form is valid when both fields are valid
const isFormValid = computed(() => {
  return form.value.name.length > 0 && 
         form.value.phone.length > 0 && 
         isNameValid.value && 
         isPhoneValid.value
})

const placeOrder = async () => {
  if (!isFormValid.value) return

  isProcessing.value = true

  const result = await store.placeOrder({
    name: form.value.name,
    phone: form.value.phone
  })

  isProcessing.value = false

  if (result.success) {
    orderSuccess.value = true
  } else {
    alert('Failed to place order. Please try again.')
  }
}
</script>

<style scoped>
.checkout-page {
  padding: 2rem 0;
  min-height: 100vh;
  background: #f8f9fa;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #7f8c8d;
}

.success-message {
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.success-icon {
  width: 80px;
  height: 80px;
  background: #27ae60;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 1.5rem;
}

.success-message h2 {
  color: #27ae60;
  margin-bottom: 1rem;
}

.success-message p {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.checkout-content {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.form-section {
  margin-bottom: 2rem;
}

.form-section h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e9ecef;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
}

.form-input.invalid {
  border-color: #e74c3c;
}

.error-text {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: block;
}

.order-summary {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.order-summary h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.order-items {
  margin-bottom: 1rem;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e9ecef;
}

.item-name {
  flex: 1;
  color: #2c3e50;
}

.item-qty {
  color: #7f8c8d;
  margin: 0 1rem;
}

.item-price {
  color: #27ae60;
  font-weight: 500;
}

.order-total {
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: #2c3e50;
}

.checkout-actions {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.3s;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2980b9;
}

.btn-primary:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
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

.btn-large {
  padding: 1rem 2rem;
}

.empty-cart {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 10px;
}

.empty-cart p {
  color: #7f8c8d;
  margin-bottom: 1rem;
}
</style>
