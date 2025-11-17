<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Discover Amazing After-School Activities</h1>
        <p>Enroll your child in enriching classes that spark creativity, build skills, and create lasting friendships.</p>
        <div class="hero-actions">
          <router-link to="/classes" class="btn btn-primary btn-large">Browse Classes</router-link>
          <router-link to="/register" class="btn btn-outline btn-large">Get Started</router-link>
        </div>
      </div>
      <div class="hero-image">
        <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop" alt="Kids learning together" />
      </div>
    </section>

    <!-- Featured Classes -->
    <section class="featured-classes">
      <div class="container">
        <h2>Featured Classes</h2>
        <div class="classes-grid">
          <div 
            v-for="classItem in featuredClasses" 
            :key="classItem.id"
            class="class-card"
          >
            <div class="class-image">
              <img :src="classItem.image" :alt="classItem.title" />
              <div class="class-category">{{ classItem.category }}</div>
            </div>
            <div class="class-content">
              <h3>{{ classItem.title }}</h3>
              <p class="instructor">by {{ classItem.instructor }}</p>
              <p class="description">{{ classItem.description }}</p>
              <div class="class-meta">
                <span class="age-group">Ages {{ classItem.ageGroup }}</span>
                <span class="duration">{{ classItem.duration }}</span>
              </div>
              <div class="class-footer">
                <span class="price">£{{ classItem.price }}</span>
                <router-link :to="`/class/${classItem.id}`" class="btn btn-primary">Learn More</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <router-link to="/classes" class="btn btn-outline">View All Classes</router-link>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="why-choose-us">
      <div class="container">
        <h2>Why Choose AfterSchool Hub?</h2>
        <div class="features-grid">
          <div class="feature">
            <div class="feature-icon">🎯</div>
            <h3>Expert Instructors</h3>
            <p>Learn from qualified professionals who are passionate about teaching and inspiring young minds.</p>
          </div>
          <div class="feature">
            <div class="feature-icon">👥</div>
            <h3>Small Class Sizes</h3>
            <p>Personalized attention with small class sizes ensuring every child gets the support they need.</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🏆</div>
            <h3>Proven Results</h3>
            <p>Our programs have helped thousands of students develop new skills and build confidence.</p>
          </div>
          <div class="feature">
            <div class="feature-icon">💡</div>
            <h3>Diverse Programs</h3>
            <p>From STEM to arts, sports to music - we offer a wide range of activities for every interest.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials">
      <div class="container">
        <h2>What Parents Say</h2>
        <div class="testimonials-grid">
          <div class="testimonial">
            <p>"My daughter absolutely loves the robotics class! She's learned so much and made great friends."</p>
            <div class="testimonial-author">
              <strong>Sarah M.</strong>
              <span>Parent of Emma, age 9</span>
            </div>
          </div>
          <div class="testimonial">
            <p>"The instructors are amazing and really care about each child's progress. Highly recommended!"</p>
            <div class="testimonial-author">
              <strong>Michael R.</strong>
              <span>Parent of Jake, age 11</span>
            </div>
          </div>
          <div class="testimonial">
            <p>"Great variety of classes and flexible scheduling. Perfect for our busy family."</p>
            <div class="testimonial-author">
              <strong>Lisa K.</strong>
              <span>Parent of twins, ages 7 & 8</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '../stores/store'

const store = useStore()

const featuredClasses = computed(() => {
  return store.classes.slice(0, 3)
})
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  display: flex;
  align-items: center;
  min-height: 70vh;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.hero-image img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.featured-classes {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.why-choose-us {
  padding: 4rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.testimonials {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.featured-classes h2,
.why-choose-us h2,
.testimonials h2 {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: #2c3e50;
}

.why-choose-us h2,
.testimonials h2 {
  color: white;
}

.classes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
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
  right: 1rem;
  background: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.class-content {
  padding: 1.5rem;
}

.class-content h3 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.instructor {
  color: #7f8c8d;
  margin-bottom: 1rem;
}

.description {
  color: #5a6c7d;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.class-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.class-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  padding: 2rem;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature h3 {
  margin-bottom: 1rem;
  color: white;
}

.feature p {
  color: rgba(255,255,255,0.9);
  line-height: 1.6;
}


.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial {
  background: rgba(255,255,255,0.1);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
}

.testimonial p {
  font-style: italic;
  margin-bottom: 1rem;
  color: rgba(255,255,255,0.9);
  line-height: 1.6;
}

.testimonial-author strong {
  color: white;
}

.testimonial-author span {
  color: rgba(255,255,255,0.8);
  font-size: 0.9rem;
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
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .classes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
