<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>After-School Lessons Hub</h1>
        <p>Enriching after-school programs in Science, Arts, Music, and more. Book your spot today!</p>
        <div class="hero-actions">
          <router-link to="/lessons" class="btn btn-primary btn-large">Browse Lessons</router-link>
        </div>
      </div>
    </section>

    <!-- Featured Lessons -->
    <section class="featured-lessons">
      <div class="container">
        <h2>Featured Lessons</h2>
        
        <div v-if="loading" class="loading">Loading lessons...</div>
        
        <div v-else class="lessons-grid">
          <div 
            v-for="lesson in featuredLessons" 
            :key="lesson.id"
            class="lesson-card"
          >
            <div class="lesson-image">
              <img :src="getImageUrl(lesson.image)" :alt="lesson.subject" />
              <div class="spaces-badge">{{ lesson.spaces }} spaces</div>
            </div>
            <div class="lesson-content">
              <h3>{{ lesson.subject }}</h3>
              <p class="location">{{ lesson.location }}</p>
              <p class="description">{{ lesson.description }}</p>
              <div class="lesson-footer">
                <span class="price">£{{ lesson.price }}</span>
                <router-link :to="`/lesson/${lesson.id}`" class="btn btn-primary">View Details</router-link>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center">
          <router-link to="/lessons" class="btn btn-outline">View All Lessons</router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2>Why Choose Us?</h2>
        <div class="features-grid">
          <div class="feature">
            <div class="feature-icon">📚</div>
            <h3>Expert Teachers</h3>
            <p>Learn from qualified professionals passionate about education.</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🎯</div>
            <h3>Small Classes</h3>
            <p>Limited spaces ensure personalized attention for every student.</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🌟</div>
            <h3>Diverse Subjects</h3>
            <p>From Science to Arts, find the perfect lesson for your interests.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from '../stores/store'

const API_URL = import.meta.env.VITE_API_URL || 'https://tundeh-backend.onrender.com'

const store = useStore()

onMounted(() => {
  if (store.state.lessons.length === 0) {
    store.fetchLessons()
  }
})

const loading = computed(() => store.state.loading)

const featuredLessons = computed(() => {
  return store.state.lessons.slice(0, 3)
})

const getImageUrl = (imageName) => {
  return `${API_URL}/images/${imageName}`
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
  min-height: 50vh;
  display: flex;
  align-items: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.featured-lessons {
  padding: 4rem 0;
  background: #f8f9fa;
}

.features {
  padding: 4rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.featured-lessons h2,
.features h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #2c3e50;
}

.features h2 {
  color: white;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
}

.lessons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
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
}

.lesson-content {
  padding: 1.5rem;
}

.lesson-content h3 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
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

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature {
  text-align: center;
  padding: 1.5rem;
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature h3 {
  margin-bottom: 0.5rem;
  color: white;
}

.feature p {
  color: rgba(255,255,255,0.9);
  line-height: 1.5;
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

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

.text-center {
  text-align: center;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .lessons-grid {
    grid-template-columns: 1fr;
  }
}
</style>
