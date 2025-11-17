<template>
  <div class="checkout-page">
    <div class="container">
      <div class="page-header">
        <h1>Checkout</h1>
        <p>Complete your enrollment to secure your child's spot</p>
      </div>

      <div v-if="cart.length > 0" class="checkout-content">
        <div class="checkout-form">
          <!-- Student Information -->
          <div class="form-section">
            <h3>Student Information</h3>
            <div class="form-group">
              <label for="studentName">Student Name</label>
              <select v-model="selectedStudent" id="studentName" required class="form-input">
                <option value="">Select a student</option>
                <option 
                  v-for="student in availableStudents" 
                  :key="student.id" 
                  :value="student.id"
                >
                  {{ student.name }} (Age {{ student.age }})
                </option>
              </select>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="form-section">
            <h3>Contact Information</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input 
                  v-model="form.firstName" 
                  type="text" 
                  id="firstName" 
                  required 
                  class="form-input"
                  placeholder="First name"
                />
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input 
                  v-model="form.lastName" 
                  type="text" 
                  id="lastName" 
                  required 
                  class="form-input"
                  placeholder="Last name"
                />
              </div>
            </div>
            
            <div class="form-group">
              <label for="email">Email Address</label>
              <input 
                v-model="form.email" 
                type="email" 
                id="email" 
                required 
                class="form-input"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input 
                v-model="form.phone" 
                type="tel" 
                id="phone" 
                required 
                class="form-input"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <!-- Emergency Contact -->
          <div class="form-section">
            <h3>Emergency Contact</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="emergencyName">Emergency Contact Name</label>
                <input 
                  v-model="form.emergencyName" 
                  type="text" 
                  id="emergencyName" 
                  required 
                  class="form-input"
                  placeholder="Emergency contact name"
                />
              </div>
              <div class="form-group">
                <label for="emergencyPhone">Emergency Contact Phone</label>
                <input 
                  v-model="form.emergencyPhone" 
                  type="tel" 
                  id="emergencyPhone" 
                  required 
                  class="form-input"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>

          <!-- Payment Information -->
          <div class="form-section">
            <h3>Payment Information</h3>
            <div class="form-group">
              <label for="cardNumber">Card Number</label>
              <input 
                v-model="form.cardNumber" 
                type="text" 
                id="cardNumber" 
                required 
                class="form-input"
                placeholder="1234 5678 9012 3456"
                maxlength="19"
              />
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="expiryDate">Expiry Date</label>
                <input 
                  v-model="form.expiryDate" 
                  type="text" 
                  id="expiryDate" 
                  required 
                  class="form-input"
                  placeholder="MM/YY"
                  maxlength="5"
                />
              </div>
              <div class="form-group">
                <label for="cvv">CVV</label>
                <input 
                  v-model="form.cvv" 
                  type="text" 
                  id="cvv" 
                  required 
                  class="form-input"
                  placeholder="123"
                  maxlength="4"
                />
              </div>
            </div>
            
            <div class="form-group">
              <label for="billingAddress">Billing Address</label>
              <textarea 
                v-model="form.billingAddress" 
                id="billingAddress" 
                required 
                class="form-input"
                rows="3"
                placeholder="Street address, City, State, ZIP"
              ></textarea>
            </div>
          </div>

          <!-- Terms and Conditions -->
          <div class="form-section">
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.agreeTerms" required />
                <span class="checkmark"></span>
                I agree to the <a href="#" class="link">Terms of Service</a>, <a href="#" class="link">Privacy Policy</a>, and <a href="#" class="link">Cancellation Policy</a>
              </label>
            </div>
            
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.agreePhoto" />
                <span class="checkmark"></span>
                I consent to photos/videos of my child being taken during classes for promotional purposes
              </label>
            </div>
          </div>

          <div class="checkout-actions">
            <router-link to="/cart" class="btn btn-outline">
              Back to Cart
            </router-link>
            <button 
              @click="processPayment" 
              class="btn btn-primary btn-large"
              :disabled="!isFormValid || isProcessing"
            >
              {{ isProcessing ? 'Processing...' : `Complete Payment - £${total.toFixed(2)}` }}
            </button>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="order-summary">
          <div class="summary-card">
            <h3>Order Summary</h3>
            
            <div class="order-items">
              <div 
                v-for="item in cart" 
                :key="item.id"
                class="order-item"
              >
                <div class="item-info">
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.instructor }}</p>
                  <span class="quantity">Qty: {{ item.quantity }}</span>
                </div>
                <div class="item-price">
                  £{{ (item.price * item.quantity).toFixed(2) }}
                </div>
              </div>
            </div>
            
            <div class="summary-totals">
              <div class="summary-line">
                <span>Subtotal:</span>
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
            </div>

            <div class="security-info">
              <div class="security-badge">
                <span class="security-icon">🔒</span>
                <span>Secure Payment</span>
              </div>
              <p>Your payment information is encrypted and secure</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-checkout">
        <div class="empty-checkout-content">
          <h3>No items to checkout</h3>
          <p>Add some classes to your cart first</p>
          <router-link to="/classes" class="btn btn-primary">
            Browse Classes
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../stores/store'

const router = useRouter()
const store = useStore()

const selectedStudent = ref('')
const isProcessing = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  emergencyName: '',
  emergencyPhone: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  billingAddress: '',
  agreeTerms: false,
  agreePhoto: false
})

const cart = computed(() => store.cart)
const subtotal = computed(() => store.getCartTotal())
const processingFee = computed(() => subtotal.value * 0.03)
const total = computed(() => subtotal.value + processingFee.value)

const availableStudents = computed(() => {
  if (store.user && store.user.children) {
    return store.user.children
  }
  return []
})

const isFormValid = computed(() => {
  return form.value.firstName && 
         form.value.lastName && 
         form.value.email && 
         form.value.phone && 
         form.value.emergencyName && 
         form.value.emergencyPhone && 
         form.value.cardNumber && 
         form.value.expiryDate && 
         form.value.cvv && 
         form.value.billingAddress && 
         form.value.agreeTerms &&
         selectedStudent.value
})

const processPayment = async () => {
  isProcessing.value = true
  
  try {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Enroll student in all classes
    cart.value.forEach(item => {
      store.enrollInClass(item.id)
    })
    
    // Clear cart
    cart.value.forEach(item => {
      store.removeFromCart(item.id)
    })
    
    // Redirect to success page or dashboard
    router.push('/dashboard')
  } catch (error) {
    console.error('Payment failed:', error)
    // Handle error (show toast, etc.)
  } finally {
    isProcessing.value = false
  }
}
</script>

<style scoped>
.checkout-page {
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

.checkout-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
}

.checkout-form {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.form-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e9ecef;
}

.form-section:last-of-type {
  border-bottom: none;
  margin-bottom: 2rem;
}

.form-section h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  color: #5a6c7d;
  font-size: 0.9rem;
  line-height: 1.4;
}

.checkbox-label input {
  margin-right: 0.5rem;
  margin-top: 0.1rem;
}

.link {
  color: #3498db;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.checkout-actions {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.btn {
  padding: 1rem 1.5rem;
  border-radius: 8px;
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
  padding: 1.2rem 2rem;
  font-size: 1.1rem;
}

.order-summary {
  display: flex;
  flex-direction: column;
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

.order-items {
  margin-bottom: 2rem;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem 0;
  border-bottom: 1px solid #e9ecef;
}

.order-item:last-child {
  border-bottom: none;
}

.item-info h4 {
  color: #2c3e50;
  margin-bottom: 0.25rem;
  font-size: 1rem;
}

.item-info p {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.quantity {
  color: #5a6c7d;
  font-size: 0.8rem;
}

.item-price {
  color: #27ae60;
  font-weight: bold;
  font-size: 1rem;
}

.summary-totals {
  margin-bottom: 2rem;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  color: #5a6c7d;
}

.summary-line.total {
  border-top: 2px solid #e9ecef;
  padding-top: 0.75rem;
  margin-top: 0.75rem;
  font-weight: bold;
  font-size: 1.1rem;
  color: #2c3e50;
}

.security-info {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

.security-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #27ae60;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.security-icon {
  font-size: 1.2rem;
}

.security-info p {
  color: #7f8c8d;
  font-size: 0.8rem;
  margin: 0;
}

.empty-checkout {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-checkout-content h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.empty-checkout-content p {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .checkout-actions {
    flex-direction: column;
  }
  
  .summary-card {
    position: static;
  }
}
</style>
