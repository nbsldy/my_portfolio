// ========================================
// MOBILE MENU TOGGLE
// ========================================

const mobileMenuToggle = document.getElementById("mobileMenuToggle")
const sidebar = document.querySelector(".sidebar")

mobileMenuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active")
})

// Close menu when nav item is clicked
const navItems = document.querySelectorAll(".nav-item")
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    sidebar.classList.remove("active")
  })
})

// ========================================
// ACTIVE NAV ITEM ON SCROLL
// ========================================

window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navItems.forEach((item) => {
    item.classList.remove("active")
    if (item.getAttribute("data-section") === current) {
      item.classList.add("active")
    }
  })
})

// ========================================
// SMOOTH SCROLL ENHANCEMENT
// ========================================

document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#") {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        const offsetTop = target.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
        sidebar.classList.remove("active")
      }
    }
  })
})

// ========================================
// CONTACT FORM HANDLING
// ========================================

const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const message = document.getElementById("message").value.trim()

    // Basic validation
    if (!name || !email || !message) {
      showNotification("Please fill in all fields", "error")
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showNotification("Please enter a valid email address", "error")
      return
    }

    // Show success message
    showNotification("Message sent successfully!", "success")

    // Reset form
    contactForm.reset()
  })
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = "success") {
  const notification = document.createElement("div")
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: ${type === "success" ? "#00d4ff" : "#ff6b6b"};
    color: #0a0e27;
    padding: 15px 25px;
    border-radius: 8px;
    z-index: 2000;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
    animation: slideIn 0.3s ease;
  `
  notification.textContent = message
  document.body.appendChild(notification)

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease"
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, 3000)
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe project cards and skill categories
document.querySelectorAll(".project-item, .skill-category, .stat-item").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "all 0.6s ease-out"
  observer.observe(el)
})

// ========================================
// ANIMATIONS KEYFRAMES (via CSS injection)
// ========================================

const style = document.createElement("style")
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)
