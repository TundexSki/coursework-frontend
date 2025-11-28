import { reactive, readonly } from 'vue'

const API_URL = import.meta.env.VITE_API_URL || 'https://tundeh-backend.onrender.com'

const state = reactive({
  lessons: [],
  cart: [],
  loading: false,
  error: null
})

export function useStore() {
  // Fetch all lessons from the API
  const fetchLessons = async () => {
    state.loading = true
    state.error = null
    try {
      const response = await fetch(`${API_URL}/lessons`)
      if (!response.ok) throw new Error('Failed to fetch lessons')
      state.lessons = await response.json()
    } catch (err) {
      state.error = err.message
      console.error('Failed to fetch lessons:', err)
    } finally {
      state.loading = false
    }
  }

  // Search lessons
  const searchLessons = async (query) => {
    state.loading = true
    state.error = null
    try {
      const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`)
      if (!response.ok) throw new Error('Search failed')
      state.lessons = await response.json()
    } catch (err) {
      state.error = err.message
      console.error('Search failed:', err)
    } finally {
      state.loading = false
    }
  }

  // Get lesson by ID
  const getLessonById = (id) => {
    return state.lessons.find(l => l.id === Number(id))
  }

  // Add lesson to cart
  const addToCart = (lesson) => {
    if (lesson.spaces <= 0) return

    const existingItem = state.cart.find(item => item.id === lesson.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      state.cart.push({ ...lesson, quantity: 1 })
    }

    // Decrease local spaces count
    const storeLesson = state.lessons.find(l => l.id === lesson.id)
    if (storeLesson) {
      storeLesson.spaces -= 1
    }
  }

  // Remove lesson from cart
  const removeFromCart = (lessonId) => {
    const cartItem = state.cart.find(item => item.id === lessonId)
    if (cartItem) {
      // Restore spaces to the lesson
      const storeLesson = state.lessons.find(l => l.id === lessonId)
      if (storeLesson) {
        storeLesson.spaces += cartItem.quantity
      }
      state.cart = state.cart.filter(item => item.id !== lessonId)
    }
  }

  // Update cart quantity
  const updateCartQuantity = (lessonId, newQuantity) => {
    const cartItem = state.cart.find(item => item.id === lessonId)
    const storeLesson = state.lessons.find(l => l.id === lessonId)

    if (!cartItem || !storeLesson) return

    const difference = newQuantity - cartItem.quantity

    if (newQuantity <= 0) {
      removeFromCart(lessonId)
    } else if (difference > 0 && storeLesson.spaces >= difference) {
      cartItem.quantity = newQuantity
      storeLesson.spaces -= difference
    } else if (difference < 0) {
      cartItem.quantity = newQuantity
      storeLesson.spaces -= difference
    }
  }

  // Get cart total price
  const getCartTotal = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  // Get cart item count
  const getCartCount = () => {
    return state.cart.reduce((count, item) => count + item.quantity, 0)
  }

  // Place order
  const placeOrder = async (orderData) => {
    try {
      // Create order in backend
      const orderResponse = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: orderData.name,
          phone: orderData.phone,
          items: state.cart.map(item => ({
            lessonId: item.id,
            spaces: item.quantity
          }))
        })
      })

      if (!orderResponse.ok) throw new Error('Failed to place order')

      // Update lesson spaces in backend
      for (const item of state.cart) {
        const lesson = state.lessons.find(l => l.id === item.id)
        if (lesson) {
          await fetch(`${API_URL}/lessons/${item.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ spaces: lesson.spaces })
          })
        }
      }

      // Clear cart
      state.cart = []
      return { success: true }
    } catch (err) {
      console.error('Order failed:', err)
      return { success: false, error: err.message }
    }
  }

  // Clear cart
  const clearCart = () => {
    // Restore all spaces before clearing
    for (const item of state.cart) {
      const storeLesson = state.lessons.find(l => l.id === item.id)
      if (storeLesson) {
        storeLesson.spaces += item.quantity
      }
    }
    state.cart = []
  }

  return {
    // State (readonly to prevent direct mutation)
    lessons: readonly(state.lessons),
    cart: readonly(state.cart),
    loading: readonly(state).loading,
    error: readonly(state).error,
    state,

    // Actions
    fetchLessons,
    searchLessons,
    getLessonById,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getCartTotal,
    getCartCount,
    placeOrder,
    clearCart
  }
}
