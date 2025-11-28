<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>After-School Lessons</h3>
          <p>Enriching education beyond the classroom.</p>
        </div>
        
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/lessons">Lessons</router-link></li>
            <li><router-link to="/cart">Cart</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Contact</h4>
          <p>CST3144 Coursework Project</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2024 After-School Lessons. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No additional logic needed for footer
</script>

<style scoped>
.app-footer {
  background: #2c3e50;
  color: white;
  margin-top: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 3rem 0 2rem;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 1rem;
  color: #ecf0f1;
}

.footer-section h3 {
  font-size: 1.5rem;
}

.footer-section p {
  margin-bottom: 0.5rem;
  color: #bdc3c7;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul li a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section ul li a:hover {
  color: #3498db;
}

.footer-bottom {
  border-top: 1px solid #34495e;
  padding: 1rem 0;
  text-align: center;
  color: #bdc3c7;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>
