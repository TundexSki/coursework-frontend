<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Create Account</h1>
          <p>Join our community and start your learning journey</p>
        </div>

        <form @submit.prevent="handleRegister" class="auth-form">
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
              placeholder="Enter your email"
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

          <div class="form-group">
            <label for="userType">I am a:</label>
            <select v-model="form.userType" id="userType" required class="form-input">
              <option value="">Select your role</option>
              <option value="parent">Parent/Guardian</option>
              <option value="student">Student (13+)</option>
            </select>
          </div>

          <!-- Children section for parents -->
          <div v-if="form.userType === 'parent'" class="children-section">
            <h3>Children Information</h3>
            <div 
              v-for="(child, index) in form.children" 
              :key="index"
              class="child-form"
            >
              <div class="form-row">
                <div class="form-group">
                  <label :for="`childName${index}`">Child's Name</label>
                  <input 
                    v-model="child.name" 
                    type="text" 
                    :id="`childName${index}`" 
                    required 
                    class="form-input"
                    placeholder="Child's name"
                  />
                </div>
                <div class="form-group">
                  <label :for="`childAge${index}`">Age</label>
                  <input 
                    v-model="child.age" 
                    type="number" 
                    :id="`childAge${index}`" 
                    required 
                    min="5" 
                    max="18"
                    class="form-input"
                    placeholder="Age"
                  />
                </div>
              </div>
              <button 
                v-if="form.children.length > 1" 
                @click="removeChild(index)" 
                type="button" 
                class="btn btn-danger btn-small"
              >
                Remove Child
              </button>
            </div>
            <button @click="addChild" type="button" class="btn btn-outline">
              + Add Another Child
            </button>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input 
              v-model="form.password" 
              type="password" 
              id="password" 
              required 
              class="form-input"
              placeholder="Create a password"
              minlength="8"
            />
            <div class="password-requirements">
              <p>Password must be at least 8 characters long</p>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input 
              v-model="form.confirmPassword" 
              type="password" 
              id="confirmPassword" 
              required 
              class="form-input"
              placeholder="Confirm your password"
            />
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.agreeTerms" required />
              <span class="checkmark"></span>
              I agree to the <a href="#" class="link">Terms of Service</a> and <a href="#" class="link">Privacy Policy</a>
            </label>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.newsletter" />
              <span class="checkmark"></span>
              Subscribe to our newsletter for updates and special offers
            </label>
          </div>

          <button type="submit" class="btn btn-primary btn-large" :disabled="isLoading || !isFormValid">
            {{ isLoading ? 'Creating Account...' : 'Create Account' }}
          </button>
        </form>

        <div class="auth-divider">
          <span>or</span>
        </div>

        <div class="social-login">
          <button class="btn btn-social btn-google">
            <span class="social-icon">🔍</span>
            Sign up with Google
          </button>
          <button class="btn btn-social btn-facebook">
            <span class="social-icon">📘</span>
            Sign up with Facebook
          </button>
        </div>

        <div class="auth-footer">
          <p>Already have an account? <router-link to="/login">Sign in here</router-link></p>
        </div>
      </div>

      <div class="auth-info">
        <h2>Why Join Us?</h2>
        <div class="info-features">
          <div class="feature">
            <span class="feature-icon">🎯</span>
            <h3>Expert Instructors</h3>
            <p>Learn from qualified professionals</p>
          </div>
          <div class="feature">
            <span class="feature-icon">👥</span>
            <h3>Small Classes</h3>
            <p>Personalized attention for every student</p>
          </div>
          <div class="feature">
            <span class="feature-icon">🏆</span>
            <h3>Proven Results</h3>
            <p>Thousands of successful students</p>
          </div>
          <div class="feature">
            <span class="feature-icon">💡</span>
            <h3>Diverse Programs</h3>
            <p>From STEM to arts, something for everyone</p>
          </div>
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

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  userType: '',
  children: [{ name: '', age: '' }],
  password: '',
  confirmPassword: '',
  agreeTerms: false,
  newsletter: false
})

const isLoading = ref(false)

const isFormValid = computed(() => {
  return form.value.firstName && 
         form.value.lastName && 
         form.value.email && 
         form.value.phone && 
         form.value.userType && 
         form.value.password && 
         form.value.confirmPassword &&
         form.value.password === form.value.confirmPassword &&
         form.value.agreeTerms &&
         (form.value.userType !== 'parent' || form.value.children.every(child => child.name && child.age))
})

const addChild = () => {
  form.value.children.push({ name: '', age: '' })
}

const removeChild = (index) => {
  form.value.children.splice(index, 1)
}

const handleRegister = async () => {
  isLoading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock user data - in real app, this would come from API
    const userData = {
      id: Date.now(),
      name: `${form.value.firstName} ${form.value.lastName}`,
      email: form.value.email,
      phone: form.value.phone,
      type: form.value.userType,
      children: form.value.userType === 'parent' ? form.value.children.map((child, index) => ({
        id: index + 1,
        name: child.name,
        age: parseInt(child.age)
      })) : []
    }
    
    store.login(userData)
    
    // Redirect to dashboard
    router.push('/dashboard')
  } catch (error) {
    console.error('Registration failed:', error)
    // Handle error (show toast, etc.)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.auth-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1000px;
  width: 100%;
  align-items: start;
}

.auth-card {
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header h1 {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.auth-header p {
  color: #7f8c8d;
  font-size: 1rem;
}

.auth-form {
  margin-bottom: 2rem;
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

.password-requirements {
  margin-top: 0.5rem;
}

.password-requirements p {
  color: #7f8c8d;
  font-size: 0.8rem;
  margin: 0;
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

.children-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.children-section h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.child-form {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.child-form:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
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
  width: 100%;
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

.btn-danger {
  background: #e74c3c;
  color: white;
  width: auto;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.btn-danger:hover {
  background: #c0392b;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  width: auto;
}

.btn-large {
  padding: 1.2rem 2rem;
  font-size: 1.1rem;
}

.auth-divider {
  text-align: center;
  margin: 2rem 0;
  position: relative;
}

.auth-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e9ecef;
}

.auth-divider span {
  background: white;
  padding: 0 1rem;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn-social {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: white;
  color: #2c3e50;
  border: 2px solid #e9ecef;
}

.btn-social:hover {
  background: #f8f9fa;
  border-color: #3498db;
}

.social-icon {
  font-size: 1.2rem;
}

.auth-footer {
  text-align: center;
}

.auth-footer p {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.auth-footer a {
  color: #3498db;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}

.auth-info {
  color: white;
  text-align: center;
}

.auth-info h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 700;
}

.info-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.feature p {
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .auth-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .auth-card {
    padding: 2rem;
  }
  
  .auth-info {
    order: -1;
  }
  
  .auth-info h2 {
    font-size: 2rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .info-features {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .feature-icon {
    font-size: 2rem;
  }
  
  .feature h3 {
    font-size: 1rem;
  }
  
  .feature p {
    font-size: 0.8rem;
  }
}
</style>
