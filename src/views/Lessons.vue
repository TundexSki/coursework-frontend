<template>
  <div class="lessons-page">
    <div class="container">
      <div class="page-header">
        <h1>After-School Lessons</h1>
        <p>Browse and enroll in our enriching after-school programs</p>
      </div>

      <!-- Search and Sort Controls -->
      <div class="controls-section">
        <div class="search-bar">
          <input 
            v-model="searchQuery" 
            @input="handleSearch"
            type="text" 
            placeholder="Search lessons..." 
            class="search-input"
          />
        </div>

        <div class="sort-controls">
          <label>Sort by:</label>
          <select v-model="sortField" class="sort-select">
            <option value="subject">Subject</option>
            <option value="location">Location</option>
            <option value="price">Price</option>
            <option value="spaces">Spaces</option>
          </select>
          <button @click="toggleSortOrder" class="sort-order-btn">
            {{ sortOrder === 'asc' ? '↑ Asc' : '↓ Desc' }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="store.state.loading" class="loading">
        <p>Loading lessons...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="store.state.error" class="error">
        <p>Error: {{ store.state.error }}</p>
        <button @click="store.fetchLessons()" class="btn btn-primary">Retry</button>
      </div>

      <!-- Lessons Grid -->
      <div v-else class="lessons-grid">
        <div 
          v-for="lesson in sortedLessons" 
          :key="lesson.id"
          class="lesson-card"
        >
          <div class="lesson-image">
            <img :src="getImageUrl(lesson.image)" :alt="lesson.subject" />
            <div class="spaces-badge" :class="{ 'low-spaces': lesson.spaces <= 2 }">
              {{ lesson.spaces }} {{ lesson.spaces === 1 ? 'space' : 'spaces' }} left
            </div>
          </div>
          
          <div class="lesson-content">
            <h3>{{ lesson.subject }}</h3>
            <p class="location">{{ lesson.location }}</p>
            <p class="description">{{ lesson.description }}</p>

            <div class="lesson-footer">
              <div class="price">£{{ lesson.price }}</div>
              <div class="actions">
                <router-link :to="`/lesson/${lesson.id}`" class="btn btn-outline">Details</router-link>
                <button 
                  @click="handleAddToCart(lesson)" 
                  class="btn btn-primary"
                  :disabled="lesson.spaces <= 0"
                >
                  {{ lesson.spaces <= 0 ? 'Full' : 'Add to Cart' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="!store.state.loading && sortedLessons.length === 0" class="no-results">
        <p>No lessons found. Try a different search term.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from '../stores/store'

const API_URL = import.meta.env.VITE_API_URL || 'https://tundeh-backend.onrender.com'

const store = useStore()
const searchQuery = ref('')
const sortField = ref('subject')
const sortOrder = ref('asc')

onMounted(() => {
  store.fetchLessons()
})

const getImageUrl = (imageName) => {
  return `${API_URL}/images/${imageName}`
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    store.searchLessons(searchQuery.value)
  } else {
    store.fetchLessons()
  }
}

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const sortedLessons = computed(() => {
  const lessons = [...store.state.lessons]
  
  lessons.sort((a, b) => {
    let aVal = a[sortField.value]
    let bVal = b[sortField.value]
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase()
      bVal = bVal.toLowerCase()
    }
    
    if (sortOrder.value === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })
  
  return lessons
})

const handleAddToCart = (lesson) => {
  store.addToCart(lesson)
}
</script>

<style scoped>
.lessons-page {
  padding: 2rem 0;
  min-height: 100vh;
  background: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
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

.controls-section {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.search-bar {
  flex: 1;
  min-width: 200px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 5px;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #3498db;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-controls label {
  color: #7f8c8d;
}

.sort-select {
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 5px;
  background: white;
}

.sort-order-btn {
  padding: 0.75rem 1rem;
  border: 2px solid #3498db;
  background: white;
  color: #3498db;
  border-radius: 5px;
  cursor: pointer;
}

.sort-order-btn:hover {
  background: #3498db;
  color: white;
}

.loading, .error, .no-results {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 10px;
}

.lessons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.lesson-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.lesson-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.lesson-image {
  position: relative;
  height: 180px;
  background: #e9ecef;
}

.lesson-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.spaces-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #27ae60;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.spaces-badge.low-spaces {
  background: #e74c3c;
}

.lesson-content {
  padding: 1.5rem;
}

.lesson-content h3 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-size: 1.25rem;
}

.location {
  color: #3498db;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.description {
  color: #7f8c8d;
  margin-bottom: 1rem;
  line-height: 1.5;
  font-size: 0.9rem;
}

.lesson-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #27ae60;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  border: none;
  font-size: 0.9rem;
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
  border: 1px solid #3498db;
}

.btn-outline:hover {
  background: #3498db;
  color: white;
}

@media (max-width: 768px) {
  .controls-section {
    flex-direction: column;
  }
  
  .lessons-grid {
    grid-template-columns: 1fr;
  }
}
</style>
