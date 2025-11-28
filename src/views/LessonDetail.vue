<template>
  <div class="lesson-detail-page">
    <div class="container">
      <router-link to="/lessons" class="back-link">← Back to Lessons</router-link>
      
      <div v-if="lesson" class="lesson-detail">
        <div class="lesson-image">
          <img :src="getImageUrl(lesson.image)" :alt="lesson.subject" />
        </div>
        
        <div class="lesson-info">
          <h1>{{ lesson.subject }}</h1>
          <p class="location">{{ lesson.location }}</p>
          
          <div class="spaces-info" :class="{ 'low-spaces': lesson.spaces <= 2 }">
            <span class="spaces-count">{{ lesson.spaces }}</span>
            <span class="spaces-label">{{ lesson.spaces === 1 ? 'space' : 'spaces' }} available</span>
          </div>
          
          <p class="description">{{ lesson.description }}</p>
          
          <div class="price-section">
            <span class="price">£{{ lesson.price }}</span>
            <span class="price-label">per session</span>
          </div>
          
          <button 
            @click="handleAddToCart" 
            class="btn btn-primary btn-large"
            :disabled="lesson.spaces <= 0"
          >
            {{ lesson.spaces <= 0 ? 'Class Full' : 'Add to Cart' }}
          </button>
        </div>
      </div>
      
      <div v-else class="not-found">
        <h2>Lesson not found</h2>
        <p>The lesson you're looking for doesn't exist.</p>
        <router-link to="/lessons" class="btn btn-primary">Browse Lessons</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '../stores/store'

const API_URL = import.meta.env.VITE_API_URL || 'https://tundeh-backend.onrender.com'

const route = useRoute()
const store = useStore()

onMounted(() => {
  if (store.state.lessons.length === 0) {
    store.fetchLessons()
  }
})

const lesson = computed(() => {
  return store.getLessonById(route.params.id)
})

const getImageUrl = (imageName) => {
  return `${API_URL}/images/${imageName}`
}

const handleAddToCart = () => {
  if (lesson.value) {
    store.addToCart(lesson.value)
  }
}
</script>

<style scoped>
.lesson-detail-page {
  padding: 2rem 0;
  min-height: 100vh;
  background: #f8f9fa;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.back-link {
  display: inline-block;
  color: #3498db;
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}

.lesson-detail {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.lesson-image {
  height: 300px;
  background: #e9ecef;
}

.lesson-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lesson-info {
  padding: 2rem;
}

.lesson-info h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.location {
  color: #3498db;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.spaces-info {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #27ae60;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  margin-bottom: 1.5rem;
}

.spaces-info.low-spaces {
  background: #e74c3c;
}

.spaces-count {
  font-size: 1.25rem;
  font-weight: bold;
}

.description {
  color: #5a6c7d;
  line-height: 1.7;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.price-section {
  margin-bottom: 1.5rem;
}

.price {
  font-size: 2.5rem;
  font-weight: bold;
  color: #27ae60;
}

.price-label {
  color: #7f8c8d;
  margin-left: 0.5rem;
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

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

.not-found {
  text-align: center;
  padding: 4rem;
  background: white;
  border-radius: 15px;
}

.not-found h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.not-found p {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .lesson-info h1 {
    font-size: 1.5rem;
  }
  
  .price {
    font-size: 2rem;
  }
}
</style>
