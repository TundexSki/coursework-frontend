<template>
  <div class="dashboard-page">
    <div class="container">
      <div class="dashboard-header">
        <h1>Welcome back, {{ userName }}!</h1>
        <p>Manage your enrollments and track your child's progress</p>
      </div>

      <div class="dashboard-content">
        <!-- Quick Stats -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">📚</div>
            <div class="stat-info">
              <h3>{{ enrollments.length }}</h3>
              <p>Active Enrollments</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <h3>{{ userChildren.length }}</h3>
              <p>Children Enrolled</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⭐</div>
            <div class="stat-info">
              <h3>4.8</h3>
              <p>Average Rating</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-info">
              <h3>{{ completedClasses }}</h3>
              <p>Classes Completed</p>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="dashboard-main">
          <!-- Active Enrollments -->
          <div class="dashboard-section">
            <div class="section-header">
              <h2>Active Enrollments</h2>
              <router-link to="/classes" class="btn btn-outline">
                Browse More Classes
              </router-link>
            </div>

            <div v-if="enrollments.length > 0" class="enrollments-grid">
              <div 
                v-for="enrollment in enrollments" 
                :key="enrollment.id"
                class="enrollment-card"
              >
                <div class="enrollment-image">
                  <img :src="getClassImage(enrollment.classId)" :alt="enrollment.className" />
                  <div class="enrollment-status" :class="enrollment.status">
                    {{ enrollment.status }}
                  </div>
                </div>
                
                <div class="enrollment-content">
                  <h3>{{ enrollment.className }}</h3>
                  <p class="enrollment-date">
                    Enrolled: {{ formatDate(enrollment.enrolledAt) }}
                  </p>
                  
                  <div class="enrollment-details">
                    <div class="detail-item">
                      <span class="detail-label">Instructor:</span>
                      <span class="detail-value">{{ getClassInstructor(enrollment.classId) }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Schedule:</span>
                      <span class="detail-value">{{ getClassSchedule(enrollment.classId) }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Next Class:</span>
                      <span class="detail-value">{{ getNextClassDate(enrollment.classId) }}</span>
                    </div>
                  </div>

                  <div class="enrollment-actions">
                    <router-link :to="`/class/${enrollment.classId}`" class="btn btn-outline btn-small">
                      View Details
                    </router-link>
                    <button @click="viewProgress(enrollment)" class="btn btn-primary btn-small">
                      View Progress
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="empty-state">
              <div class="empty-state-content">
                <div class="empty-state-icon">📚</div>
                <h3>No active enrollments</h3>
                <p>Start your learning journey by enrolling in some amazing classes!</p>
                <router-link to="/classes" class="btn btn-primary">
                  Browse Classes
                </router-link>
              </div>
            </div>
          </div>

          <!-- Children Profiles -->
          <div class="dashboard-section" v-if="userChildren.length > 0">
            <div class="section-header">
              <h2>Your Children</h2>
            </div>

            <div class="children-grid">
              <div 
                v-for="child in userChildren" 
                :key="child.id"
                class="child-card"
              >
                <div class="child-avatar">
                  <img :src="getChildAvatar(child)" :alt="child.name" />
                </div>
                <div class="child-info">
                  <h3>{{ child.name }}</h3>
                  <p>Age {{ child.age }}</p>
                  <div class="child-stats">
                    <span class="stat">
                      <strong>{{ getChildEnrollments(child.id).length }}</strong> classes
                    </span>
                    <span class="stat">
                      <strong>{{ getChildProgress(child.id) }}%</strong> progress
                    </span>
                  </div>
                </div>
                <div class="child-actions">
                  <button @click="viewChildProgress(child)" class="btn btn-outline btn-small">
                    View Progress
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="dashboard-section">
            <div class="section-header">
              <h2>Recent Activity</h2>
            </div>

            <div class="activity-list">
              <div 
                v-for="activity in recentActivity" 
                :key="activity.id"
                class="activity-item"
              >
                <div class="activity-icon" :class="activity.type">
                  {{ getActivityIcon(activity.type) }}
                </div>
                <div class="activity-content">
                  <h4>{{ activity.title }}</h4>
                  <p>{{ activity.description }}</p>
                  <span class="activity-date">{{ formatDate(activity.date) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="dashboard-section">
            <div class="section-header">
              <h2>Quick Actions</h2>
            </div>

            <div class="quick-actions">
              <router-link to="/classes" class="quick-action-card">
                <div class="quick-action-icon">🔍</div>
                <h3>Browse Classes</h3>
                <p>Discover new activities</p>
              </router-link>
              
              <router-link to="/cart" class="quick-action-card">
                <div class="quick-action-icon">🛒</div>
                <h3>View Cart</h3>
                <p>{{ cartCount }} items</p>
              </router-link>
              
              <div class="quick-action-card" @click="downloadReport">
                <div class="quick-action-icon">📊</div>
                <h3>Download Report</h3>
                <p>Progress summary</p>
              </div>
              
              <div class="quick-action-card" @click="contactSupport">
                <div class="quick-action-icon">💬</div>
                <h3>Contact Support</h3>
                <p>Get help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '../stores/store'

const store = useStore()

const userName = computed(() => store.user?.name || 'User')
const enrollments = computed(() => store.enrollments)
const userChildren = computed(() => store.user?.children || [])
const cartCount = computed(() => store.cart.length)

const completedClasses = computed(() => {
  return enrollments.value.filter(e => e.status === 'completed').length
})

const getClassImage = (classId) => {
  const classItem = store.getClassById(classId)
  return classItem?.image || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400'
}

const getClassInstructor = (classId) => {
  const classItem = store.getClassById(classId)
  return classItem?.instructor || 'TBA'
}

const getClassSchedule = (classId) => {
  const classItem = store.getClassById(classId)
  return classItem?.schedule || 'TBA'
}

const getNextClassDate = (classId) => {
  // Mock next class date - in real app, this would come from API
  const dates = ['Tomorrow', 'Next Monday', 'This Friday', 'Next Wednesday']
  return dates[classId % dates.length]
}

const getChildAvatar = (child) => {
  // Mock avatar - in real app, this would be user-uploaded or generated
  const avatars = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  ]
  return avatars[child.id % avatars.length]
}

const getChildEnrollments = (childId) => {
  // Mock - in real app, this would filter enrollments by child
  return enrollments.value
}

const getChildProgress = (childId) => {
  // Mock progress - in real app, this would be calculated from actual progress
  return Math.floor(Math.random() * 40) + 60 // 60-100%
}

const recentActivity = computed(() => [
  {
    id: 1,
    type: 'enrollment',
    title: 'Enrolled in Robotics & Coding',
    description: 'Emma successfully enrolled in the 8-week robotics program',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    type: 'progress',
    title: 'Progress Update',
    description: 'Jake completed Week 3 of Soccer Skills class',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    type: 'payment',
    title: 'Payment Processed',
    description: 'Payment for Art & Creativity class was successful',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  }
])

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const getActivityIcon = (type) => {
  const icons = {
    enrollment: '📚',
    progress: '⭐',
    payment: '💳',
    message: '💬'
  }
  return icons[type] || '📝'
}

const viewProgress = (enrollment) => {
  // Mock function - in real app, this would open a progress modal/page
  console.log('Viewing progress for:', enrollment.className)
}

const viewChildProgress = (child) => {
  // Mock function - in real app, this would open child progress page
  console.log('Viewing progress for child:', child.name)
}

const downloadReport = () => {
  // Mock function - in real app, this would generate and download a PDF report
  console.log('Downloading progress report...')
}

const contactSupport = () => {
  // Mock function - in real app, this would open support chat or email
  console.log('Opening support contact...')
}
</script>

<style scoped>
.dashboard-page {
  padding: 2rem 0;
  min-height: 100vh;
  background: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 3rem;
}

.dashboard-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.dashboard-header p {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-info h3 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.stat-info p {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: 0;
}

.dashboard-main {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.dashboard-section {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  color: #2c3e50;
  font-size: 1.5rem;
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
  text-align: center;
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

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.enrollments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.enrollment-card {
  border: 1px solid #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.enrollment-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.enrollment-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.enrollment-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.enrollment-card:hover .enrollment-image img {
  transform: scale(1.05);
}

.enrollment-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
}

.enrollment-status.active {
  background: #27ae60;
  color: white;
}

.enrollment-status.completed {
  background: #3498db;
  color: white;
}

.enrollment-status.pending {
  background: #f39c12;
  color: white;
}

.enrollment-content {
  padding: 1.5rem;
}

.enrollment-content h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.enrollment-date {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.enrollment-details {
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.detail-label {
  color: #7f8c8d;
}

.detail-value {
  color: #2c3e50;
  font-weight: 500;
}

.enrollment-actions {
  display: flex;
  gap: 0.5rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-state-content {
  max-width: 400px;
  margin: 0 auto;
}

.empty-state-icon {
  font-size: 4rem;
  margin-bottom: 2rem;
}

.empty-state-content h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.empty-state-content p {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.children-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.child-card {
  border: 1px solid #e9ecef;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.child-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.child-avatar {
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  overflow: hidden;
}

.child-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.child-card:hover .child-avatar img {
  transform: scale(1.1);
}

.child-info h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.child-info p {
  color: #7f8c8d;
  margin-bottom: 1rem;
}

.child-stats {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.stat {
  color: #5a6c7d;
  font-size: 0.9rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.activity-icon.enrollment {
  background: #e8f5e8;
}

.activity-icon.progress {
  background: #fff3cd;
}

.activity-icon.payment {
  background: #d1ecf1;
}

.activity-content {
  flex: 1;
}

.activity-content h4 {
  color: #2c3e50;
  margin-bottom: 0.25rem;
  font-size: 1rem;
}

.activity-content p {
  color: #5a6c7d;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.activity-date {
  color: #7f8c8d;
  font-size: 0.8rem;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.quick-action-card {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s, background 0.3s;
  cursor: pointer;
}

.quick-action-card:hover {
  transform: translateY(-2px);
  background: #e9ecef;
}

.quick-action-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.quick-action-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.quick-action-card p {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: 0;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .enrollments-grid {
    grid-template-columns: 1fr;
  }
  
  .children-grid {
    grid-template-columns: 1fr;
  }
  
  .quick-actions {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
}
</style>
