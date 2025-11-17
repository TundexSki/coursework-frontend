<template>
  <div class="class-detail-page" v-if="classItem">
    <div class="container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <router-link to="/">Home</router-link>
        <span>/</span>
        <router-link to="/classes">Classes</router-link>
        <span>/</span>
        <span>{{ classItem.title }}</span>
      </nav>

      <div class="class-detail-content">
        <!-- Main Content -->
        <div class="main-content">
          <div class="class-image">
            <img :src="classItem.image" :alt="classItem.title" />
            <div class="image-overlay">
              <div class="class-category">{{ classItem.category }}</div>
              <div class="availability" :class="{ 'low-spots': classItem.maxStudents - classItem.enrolled <= 3 }">
                {{ classItem.maxStudents - classItem.enrolled }} spots left
              </div>
            </div>
          </div>

          <div class="class-info">
            <h1>{{ classItem.title }}</h1>
            <p class="instructor">by {{ classItem.instructor }}</p>
            
            <div class="class-description">
              <h3>About This Class</h3>
              <p>{{ classItem.description }}</p>
            </div>

            <div class="class-details">
              <h3>Class Details</h3>
              <div class="details-grid">
                <div class="detail-item">
                  <span class="detail-label">Age Group:</span>
                  <span class="detail-value">{{ classItem.ageGroup }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Duration:</span>
                  <span class="detail-value">{{ classItem.duration }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Schedule:</span>
                  <span class="detail-value">{{ classItem.schedule }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Max Students:</span>
                  <span class="detail-value">{{ classItem.maxStudents }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Currently Enrolled:</span>
                  <span class="detail-value">{{ classItem.enrolled }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Category:</span>
                  <span class="detail-value">{{ classItem.category }}</span>
                </div>
              </div>
            </div>

            <div class="what-youll-learn">
              <h3>What You'll Learn</h3>
              <ul>
                <li v-for="skill in getClassSkills(classItem.category)" :key="skill">{{ skill }}</li>
              </ul>
            </div>

            <div class="instructor-info">
              <h3>About the Instructor</h3>
              <div class="instructor-card">
                <div class="instructor-avatar">
                  <img :src="getInstructorImage(classItem.instructor)" :alt="classItem.instructor" />
                </div>
                <div class="instructor-details">
                  <h4>{{ classItem.instructor }}</h4>
                  <p>{{ getInstructorBio(classItem.instructor) }}</p>
                  <div class="instructor-stats">
                    <span class="stat">
                      <strong>{{ getInstructorExperience(classItem.instructor) }}</strong> years experience
                    </span>
                    <span class="stat">
                      <strong>{{ getInstructorRating(classItem.instructor) }}</strong> ⭐ rating
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="sidebar">
          <div class="enrollment-card">
            <div class="price-section">
              <span class="price">£{{ classItem.price }}</span>
              <span class="price-period">per session</span>
            </div>

            <div class="enrollment-info">
              <div class="spots-remaining">
                <span class="spots-count">{{ classItem.maxStudents - classItem.enrolled }}</span>
                <span class="spots-text">spots remaining</span>
              </div>
              <div class="enrollment-progress">
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    :style="{ width: (classItem.enrolled / classItem.maxStudents) * 100 + '%' }"
                  ></div>
                </div>
                <span class="progress-text">{{ classItem.enrolled }}/{{ classItem.maxStudents }} enrolled</span>
              </div>
            </div>

            <div class="enrollment-actions">
              <button @click="addToCart(classItem)" class="btn btn-primary btn-large">
                Add to Cart
              </button>
              <button @click="enrollNow(classItem)" class="btn btn-outline btn-large" v-if="store.isLoggedIn">
                Enroll Now
              </button>
              <router-link to="/login" class="btn btn-outline btn-large" v-else>
                Login to Enroll
              </router-link>
            </div>

            <div class="enrollment-benefits">
              <h4>What's Included:</h4>
              <ul>
                <li>✅ All materials and supplies</li>
                <li>✅ Certificate of completion</li>
                <li>✅ Parent progress reports</li>
                <li>✅ Access to online resources</li>
              </ul>
            </div>
          </div>

          <div class="related-classes">
            <h3>Related Classes</h3>
            <div class="related-class-list">
              <div 
                v-for="relatedClass in relatedClasses" 
                :key="relatedClass.id"
                class="related-class-item"
              >
                <img :src="relatedClass.image" :alt="relatedClass.title" />
                <div class="related-class-info">
                  <h4>{{ relatedClass.title }}</h4>
                  <p class="related-price">£{{ relatedClass.price }}</p>
                  <router-link :to="`/class/${relatedClass.id}`" class="btn btn-small">View</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="class-not-found">
    <div class="container">
      <h1>Class Not Found</h1>
      <p>The class you're looking for doesn't exist.</p>
      <router-link to="/classes" class="btn btn-primary">Browse All Classes</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '../stores/store'

const route = useRoute()
const store = useStore()

const classItem = computed(() => {
  return store.getClassById(route.params.id)
})

const relatedClasses = computed(() => {
  if (!classItem.value) return []
  return store.classes
    .filter(c => c.id !== classItem.value.id && c.category === classItem.value.category)
    .slice(0, 3)
})

const addToCart = (classItem) => {
  store.addToCart(classItem)
  // You could add a toast notification here
}

const enrollNow = (classItem) => {
  store.enrollInClass(classItem.id)
  // You could add a toast notification here
}

const getClassSkills = (category) => {
  const skills = {
    'STEM': [
      'Basic programming concepts',
      'Problem-solving skills',
      'Logical thinking',
      'Team collaboration',
      'Project management'
    ],
    'Arts': [
      'Creative expression',
      'Art techniques and mediums',
      'Color theory',
      'Composition skills',
      'Art history appreciation'
    ],
    'Sports': [
      'Physical fitness',
      'Teamwork and cooperation',
      'Sportsmanship',
      'Coordination and motor skills',
      'Strategic thinking'
    ],
    'Music': [
      'Musical theory',
      'Instrument technique',
      'Rhythm and timing',
      'Performance skills',
      'Musical appreciation'
    ],
    'Strategy': [
      'Critical thinking',
      'Strategic planning',
      'Pattern recognition',
      'Concentration skills',
      'Sportsmanship'
    ],
    'Dance': [
      'Rhythm and coordination',
      'Flexibility and strength',
      'Performance skills',
      'Creative expression',
      'Body awareness'
    ]
  }
  return skills[category] || ['Skill development', 'Creative thinking', 'Social interaction']
}

const getInstructorImage = (instructor) => {
  const images = {
    'Dr. Sarah Johnson': 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    'Ms. Emily Chen': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    'Coach Mike Rodriguez': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    'Prof. David Kim': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    'Grandmaster Lisa Wang': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    'Ms. Jessica Martinez': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150'
  }
  return images[instructor] || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
}

const getInstructorBio = (instructor) => {
  const bios = {
    'Dr. Sarah Johnson': 'Computer Science PhD with 10+ years teaching experience. Passionate about making technology accessible to young learners.',
    'Ms. Emily Chen': 'Professional artist and art educator with a Master\'s in Fine Arts. Specializes in child development through creative expression.',
    'Coach Mike Rodriguez': 'Former professional soccer player turned youth coach. Certified in youth sports development and physical education.',
    'Prof. David Kim': 'Classically trained pianist and music educator. Holds degrees in Music Education and Child Psychology.',
    'Grandmaster Lisa Wang': 'International chess master and youth chess champion. Dedicated to developing critical thinking skills in children.',
    'Ms. Jessica Martinez': 'Professional dancer and choreographer with extensive experience in youth dance education and performance.'
  }
  return bios[instructor] || 'Experienced educator passionate about inspiring young minds through engaging and interactive learning.'
}

const getInstructorExperience = (instructor) => {
  const experience = {
    'Dr. Sarah Johnson': 12,
    'Ms. Emily Chen': 8,
    'Coach Mike Rodriguez': 15,
    'Prof. David Kim': 10,
    'Grandmaster Lisa Wang': 20,
    'Ms. Jessica Martinez': 7
  }
  return experience[instructor] || 5
}

const getInstructorRating = (instructor) => {
  const ratings = {
    'Dr. Sarah Johnson': 4.9,
    'Ms. Emily Chen': 4.8,
    'Coach Mike Rodriguez': 4.7,
    'Prof. David Kim': 4.9,
    'Grandmaster Lisa Wang': 5.0,
    'Ms. Jessica Martinez': 4.6
  }
  return ratings[instructor] || 4.5
}
</script>

<style scoped>
.class-detail-page {
  padding: 2rem 0;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.breadcrumb {
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.breadcrumb a {
  color: #3498db;
  text-decoration: none;
}

.breadcrumb span {
  color: #7f8c8d;
  margin: 0 0.5rem;
}

.class-detail-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.class-image {
  position: relative;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
}

.class-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.class-image:hover img {
  transform: scale(1.02);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
}

.class-category {
  background: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.availability {
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

.class-info h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.instructor {
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.class-description,
.class-details,
.what-youll-learn,
.instructor-info {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.class-description h3,
.class-details h3,
.what-youll-learn h3,
.instructor-info h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.class-description p {
  color: #5a6c7d;
  line-height: 1.6;
  font-size: 1.1rem;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e9ecef;
}

.detail-label {
  color: #7f8c8d;
  font-weight: 500;
}

.detail-value {
  color: #2c3e50;
  font-weight: 600;
}

.what-youll-learn ul {
  list-style: none;
  padding: 0;
}

.what-youll-learn li {
  padding: 0.5rem 0;
  color: #5a6c7d;
  border-bottom: 1px solid #f1f2f6;
}

.what-youll-learn li:last-child {
  border-bottom: none;
}

.instructor-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.instructor-avatar {
  flex-shrink: 0;
}

.instructor-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.instructor-details h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.instructor-details p {
  color: #5a6c7d;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.instructor-stats {
  display: flex;
  gap: 1rem;
}

.stat {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.enrollment-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  position: sticky;
  top: 2rem;
}

.price-section {
  text-align: center;
  margin-bottom: 2rem;
}

.price {
  font-size: 3rem;
  font-weight: bold;
  color: #27ae60;
  display: block;
}

.price-period {
  color: #7f8c8d;
  font-size: 1rem;
}

.enrollment-info {
  margin-bottom: 2rem;
}

.spots-remaining {
  text-align: center;
  margin-bottom: 1rem;
}

.spots-count {
  font-size: 2rem;
  font-weight: bold;
  color: #e74c3c;
  display: block;
}

.spots-text {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.enrollment-progress {
  margin-bottom: 1rem;
}

.progress-bar {
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: #3498db;
  transition: width 0.3s;
}

.progress-text {
  font-size: 0.9rem;
  color: #7f8c8d;
  text-align: center;
  display: block;
}

.enrollment-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn {
  padding: 1rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
  display: inline-block;
  text-align: center;
}

.btn-large {
  padding: 1.2rem 2rem;
  font-size: 1.1rem;
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

.enrollment-benefits h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.enrollment-benefits ul {
  list-style: none;
  padding: 0;
}

.enrollment-benefits li {
  padding: 0.5rem 0;
  color: #5a6c7d;
  font-size: 0.9rem;
}

.related-classes {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.related-classes h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.related-class-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.related-class-item {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.related-class-item img {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  object-fit: cover;
}

.related-class-info {
  flex: 1;
}

.related-class-info h4 {
  color: #2c3e50;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.related-price {
  color: #27ae60;
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.btn-small {
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
}

.class-not-found {
  text-align: center;
  padding: 4rem 2rem;
}

.class-not-found h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.class-not-found p {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .class-detail-content {
    grid-template-columns: 1fr;
  }
  
  .class-image {
    height: 250px;
  }
  
  .class-info h1 {
    font-size: 2rem;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .instructor-card {
    flex-direction: column;
    text-align: center;
  }
  
  .enrollment-card {
    position: static;
  }
}
</style>
