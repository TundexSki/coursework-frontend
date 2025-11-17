import { reactive } from 'vue'

// Sample data for classes
const sampleClasses = [
  {
    id: 1,
    title: "Robotics & Coding",
    instructor: "Dr. Sarah Johnson",
    category: "STEM",
    ageGroup: "8-12",
    duration: "8 weeks",
    price: 149,
    schedule: "Mondays & Wednesdays, 4:00-5:30 PM",
    description: "Learn the fundamentals of robotics and programming through hands-on projects.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
    maxStudents: 15,
    enrolled: 8
  },
  {
    id: 2,
    title: "Art & Creativity",
    instructor: "Ms. Emily Chen",
    category: "Arts",
    ageGroup: "6-10",
    duration: "6 weeks",
    price: 119,
    schedule: "Tuesdays & Thursdays, 3:30-5:00 PM",
    description: "Explore various art techniques including painting, drawing, and sculpture.",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=300&fit=crop",
    maxStudents: 12,
    enrolled: 6
  },
  {
    id: 3,
    title: "Soccer Skills",
    instructor: "Coach Mike Rodriguez",
    category: "Sports",
    ageGroup: "7-11",
    duration: "10 weeks",
    price: 139,
    schedule: "Saturdays, 10:00-11:30 AM",
    description: "Develop soccer skills, teamwork, and physical fitness in a fun environment.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
    maxStudents: 20,
    enrolled: 14
  },
  {
    id: 4,
    title: "Music & Piano",
    instructor: "Prof. David Kim",
    category: "Music",
    ageGroup: "5-12",
    duration: "12 weeks",
    price: 199,
    schedule: "Wednesdays & Fridays, 4:30-5:30 PM",
    description: "Learn piano basics, music theory, and develop musical appreciation.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
    maxStudents: 8,
    enrolled: 5
  },
  {
    id: 5,
    title: "Chess Mastery",
    instructor: "Grandmaster Lisa Wang",
    category: "Strategy",
    ageGroup: "8-14",
    duration: "8 weeks",
    price: 99,
    schedule: "Sundays, 2:00-3:30 PM",
    description: "Master chess strategies, tactics, and improve critical thinking skills.",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500&h=300&fit=crop",
    maxStudents: 16,
    enrolled: 10
  },
  {
    id: 6,
    title: "Dance & Movement",
    instructor: "Ms. Jessica Martinez",
    category: "Dance",
    ageGroup: "6-12",
    duration: "6 weeks",
    price: 129,
    schedule: "Mondays & Wednesdays, 5:00-6:00 PM",
    description: "Learn various dance styles including ballet, jazz, and contemporary.",
    image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=500&h=300&fit=crop",
    maxStudents: 15,
    enrolled: 9
  }
]

const state = reactive({
  user: null,
  isLoggedIn: false,
  cart: [],
  classes: sampleClasses,
  enrollments: []
})

export function useStore() {
  const login = (userData) => {
    state.user = userData
    state.isLoggedIn = true
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    state.user = null
    state.isLoggedIn = false
    state.cart = []
    localStorage.removeItem('user')
  }

  const addToCart = (classItem) => {
    const existingItem = state.cart.find(item => item.id === classItem.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      state.cart.push({ ...classItem, quantity: 1 })
    }
  }

  const removeFromCart = (classId) => {
    state.cart = state.cart.filter(item => item.id !== classId)
  }

  const updateCartQuantity = (classId, quantity) => {
    const item = state.cart.find(item => item.id === classId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(classId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const enrollInClass = (classId) => {
    const classItem = state.classes.find(c => c.id === classId)
    if (classItem && !state.enrollments.find(e => e.classId === classId)) {
      state.enrollments.push({
        id: Date.now(),
        classId: classId,
        className: classItem.title,
        enrolledAt: new Date().toISOString(),
        status: 'active'
      })
      classItem.enrolled += 1
    }
  }

  const getClassById = (id) => {
    return state.classes.find(c => c.id === parseInt(id))
  }

  const getCartTotal = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  // Initialize from localStorage
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    try {
      state.user = JSON.parse(savedUser)
      state.isLoggedIn = true
    } catch (e) {
      localStorage.removeItem('user')
    }
  }

  return {
    // State
    user: state.user,
    isLoggedIn: state.isLoggedIn,
    cart: state.cart,
    classes: state.classes,
    enrollments: state.enrollments,
    
    // Actions
    login,
    logout,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    enrollInClass,
    getClassById,
    getCartTotal
  }
}
