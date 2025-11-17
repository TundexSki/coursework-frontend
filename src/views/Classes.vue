<template>
  <div class="classes-page">
    <div class="container">
      <div class="page-header">
        <h1>All Classes</h1>
        <p>Discover amazing after-school activities for your child</p>
      </div>

      <!-- Search and Filters -->
      <div class="filters-section">
        <div class="search-bar">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search classes..." 
            class="search-input"
          />
          <span class="search-icon">🔍</span>
        </div>

        <div class="filters">
          <select v-model="selectedCategory" class="filter-select">
            <option value="">All Categories</option>
            <option value="STEM">STEM</option>
            <option value="Arts">Arts</option>
            <option value="Sports">Sports</option>
            <option value="Music">Music</option>
            <option value="Strategy">Strategy</option>
            <option value="Dance">Dance</option>
          </select>

          <select v-model="selectedAgeGroup" class="filter-select">
            <option value="">All Ages</option>
            <option value="5-7">Ages 5-7</option>
            <option value="6-10">Ages 6-10</option>
            <option value="7-11">Ages 7-11</option>
            <option value="8-12">Ages 8-12</option>
            <option value="8-14">Ages 8-14</option>
            <option value="5-12">Ages 5-12</option>
          </select>

          <select v-model="sortBy" class="filter-select">
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="duration">Duration</option>
          </select>
        </div>
      </div>

      <!-- Results Count -->
      <div class="results-info">
        <p>{{ filteredClasses.length }} class{{ filteredClasses.length !== 1 ? 'es' : '' }} found</p>
      </div>

      <!-- Classes Grid -->
      <div class="classes-grid" v-if="filteredClasses.length > 0">
        <div 
          v-for="classItem in filteredClasses" 
          :key="classItem.id"
          class="class-card"
        >
          <div class="class-image">
            <img :src="classItem.image" :alt="classItem.title" />
            <div class="class-category">{{ classItem.category }}</div>
            <div class="availability" :class="{ 'low-spots': classItem.maxStudents - classItem.enrolled <= 3 }">
              {{ classItem.maxStudents - classItem.enrolled }} spots left
            </div>
          </div>
          
          <div class="class-content">
            <h3>{{ classItem.title }}</h3>
            <p class="instructor">by {{ classItem.instructor }}</p>
            <p class="description">{{ classItem.description }}</p>
            
            <div class="class-meta">
              <div class="meta-item">
                <span class="meta-label">Age Group:</span>
                <span class="meta-value">{{ classItem.ageGroup }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Duration:</span>
                <span class="meta-value">{{ classItem.duration }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Schedule:</span>
                <span class="meta-value">{{ classItem.schedule }}</span>
              </div>
            </div>

            <div class="class-footer">
              <div class="price-info">
                <span class="price">£{{ classItem.price }}</span>
                <span class="price-period">per session</span>
              </div>
              <div class="class-actions">
                <router-link :to="`/class/${classItem.id}`" class="btn btn-outline">View Details</router-link>
                <button @click="addToCart(classItem)" class="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-else class="no-results">
        <div class="no-results-content">
          <h3>No classes found</h3>
          <p>Try adjusting your search criteria or browse all categories.</p>
          <button @click="clearFilters" class="btn btn-primary">Clear Filters</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from '../stores/store'

const store = useStore()

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedAgeGroup = ref('')
const sortBy = ref('name')

const filteredClasses = computed(() => {
  let classes = [...store.classes]

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    classes = classes.filter(classItem => 
      classItem.title.toLowerCase().includes(query) ||
      classItem.instructor.toLowerCase().includes(query) ||
      classItem.description.toLowerCase().includes(query) ||
      classItem.category.toLowerCase().includes(query)
    )
  }

  // Category filter
  if (selectedCategory.value) {
    classes = classes.filter(classItem => classItem.category === selectedCategory.value)
  }

  // Age group filter
  if (selectedAgeGroup.value) {
    classes = classes.filter(classItem => classItem.ageGroup === selectedAgeGroup.value)
  }

  // Sorting
  switch (sortBy.value) {
    case 'price-low':
      classes.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      classes.sort((a, b) => b.price - a.price)
      break
    case 'duration':
      classes.sort((a, b) => {
        const aDuration = parseInt(a.duration)
        const bDuration = parseInt(b.duration)
        return aDuration - bDuration
      })
      break
    default:
      classes.sort((a, b) => a.title.localeCompare(b.title))
  }

  return classes
})

const addToCart = (classItem) => {
  store.addToCart(classItem)
  // You could add a toast notification here
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedAgeGroup.value = ''
  sortBy.value = 'name'
}
</script>

<style scoped>
.classes-page {
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

.filters-section {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.search-bar {
  position: relative;
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #3498db;
}

.search-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #7f8c8d;
}

.filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-select {
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 5px;
  background: white;
  font-size: 1rem;
  min-width: 150px;
  transition: border-color 0.3s;
}

.filter-select:focus {
  outline: none;
  border-color: #3498db;
}

.results-info {
  margin-bottom: 2rem;
  color: #7f8c8d;
}

.classes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
}

.class-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(255,255,255,0.2);
}

.class-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.class-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.class-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.class-card:hover .class-image img {
  transform: scale(1.05);
}

.class-category {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.availability {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #27ae60;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.availability.low-spots {
  background: #e74c3c;
}

.class-content {
  padding: 1.5rem;
}

.class-content h3 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-size: 1.3rem;
}

.instructor {
  color: #7f8c8d;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.description {
  color: #5a6c7d;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 0.95rem;
}

.class-meta {
  margin-bottom: 1.5rem;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.meta-label {
  color: #7f8c8d;
  font-weight: 500;
}

.meta-value {
  color: #2c3e50;
}

.class-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

.price-info {
  display: flex;
  flex-direction: column;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #27ae60;
}

.price-period {
  font-size: 0.8rem;
  color: #7f8c8d;
}

.class-actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
  display: inline-block;
  font-size: 0.9rem;
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

.no-results {
  text-align: center;
  padding: 4rem 2rem;
}

.no-results-content h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.no-results-content p {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .classes-grid {
    grid-template-columns: 1fr;
  }
  
  .filters {
    flex-direction: column;
  }
  
  .filter-select {
    min-width: auto;
  }
  
  .class-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .class-actions {
    justify-content: center;
  }
}
</style>
