<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <router-link to="/" class="logo">
          <h1>AfterSchool Hub</h1>
        </router-link>
        
        <nav class="main-nav">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/classes" class="nav-link">Classes</router-link>
          <router-link to="/dashboard" class="nav-link" v-if="isLoggedIn">Dashboard</router-link>
        </nav>
        
        <div class="header-actions">
          <router-link to="/cart" class="cart-link">
            <span class="cart-icon">🛒</span>
            <span class="cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
          </router-link>
          
          <div class="auth-buttons" v-if="!isLoggedIn">
            <router-link to="/login" class="btn btn-outline">Login</router-link>
            <router-link to="/register" class="btn btn-primary">Register</router-link>
          </div>
          
          <div class="user-menu" v-else>
            <span class="user-name">Welcome, {{ userName }}</span>
            <button @click="logout" class="btn btn-outline">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '../stores/store'

const store = useStore()

const isLoggedIn = computed(() => store.isLoggedIn)
const userName = computed(() => store.user?.name || 'User')
const cartCount = computed(() => store.cart.length)
</script>

<style scoped>
.app-header {
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.logo {
  text-decoration: none;
  color: #2c3e50;
}

.logo h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
}

.main-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #3498db;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cart-link {
  position: relative;
  text-decoration: none;
  color: #2c3e50;
  font-size: 1.2rem;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
}

.auth-buttons {
  display: flex;
  gap: 0.5rem;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  color: #2c3e50;
  font-weight: 500;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
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
  border: 1px solid #3498db;
}

.btn-outline:hover {
  background: #3498db;
  color: white;
}

@media (max-width: 768px) {
  .header-content {
    flex-wrap: wrap;
    height: auto;
    padding: 1rem 0;
  }
  
  .main-nav {
    order: 3;
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
  }
  
  .header-actions {
    margin-left: auto;
  }
}
</style>
