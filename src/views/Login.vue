<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <form @submit.prevent="handleLogin" class="auth-form">
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
            <label for="password">Password</label>
            <input 
              v-model="form.password" 
              type="password" 
              id="password" 
              required 
              class="form-input"
              placeholder="Enter your password"
            />
          </div>

          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.rememberMe" />
              <span class="checkmark"></span>
              Remember me
            </label>
            <a href="#" class="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" class="btn btn-primary btn-large" :disabled="isLoading">
            {{ isLoading ? 'Signing In...' : 'Sign In' }}
          </button>
        </form>

        <div class="auth-divider">
          <span>or</span>
        </div>

        <div class="social-login">
          <button class="btn btn-social btn-google">
            <span class="social-icon">🔍</span>
            Continue with Google
          </button>
          <button class="btn btn-social btn-facebook">
            <span class="social-icon">📘</span>
            Continue with Facebook
          </button>
        </div>

        <div class="auth-footer">
          <p>Don't have an account? <router-link to="/register">Sign up here</router-link></p>
        </div>
      </div>

      <div class="auth-info">
        <h2>Join Our Community</h2>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../stores/store'

const router = useRouter()
const store = useStore()

const form = ref({
  email: '',
  password: '',
  rememberMe: false
})

const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock user data - in real app, this would come from API
    const userData = {
      id: 1,
      name: 'John Doe',
      email: form.value.email,
      type: 'parent', // or 'student'
      children: [
        { id: 1, name: 'Emma Doe', age: 9 },
        { id: 2, name: 'Jake Doe', age: 11 }
      ]
    }
    
    store.login(userData)
    
    // Redirect to dashboard or home
    router.push('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
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
  align-items: center;
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

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #5a6c7d;
  font-size: 0.9rem;
}

.checkbox-label input {
  margin-right: 0.5rem;
}

.forgot-password {
  color: #3498db;
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-password:hover {
  text-decoration: underline;
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
  display: flex;
  flex-direction: column;
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
  
  .info-features {
    flex-direction: row;
    gap: 1rem;
  }
  
  .feature {
    flex: 1;
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
