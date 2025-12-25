// Event listener for Sign-up form submission
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.querySelector('#signup-form input[type="email"]').value;

    if (email) {
        alert(`Thank you for signing up! We're excited to have you at Calm Zone.`);
        document.getElementById('signup-form').reset();
    } else {
        alert('Please enter your email before submitting.');
    }
});

// Event listener for Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const contactName = document.getElementById('contact-name').value;
    const contactEmail = document.getElementById('contact-email').value;
    const contactMessage = document.getElementById('contact-message').value;

    if (contactName && contactEmail && contactMessage) {
        alert(`Thank you for reaching out, ${contactName}. We will get back to you shortly!`);
        document.getElementById('contact-form').reset();
    } else {
        alert('Please complete all fields before sending your message.');
    }
});

// Smooth Scroll for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetSection = document.querySelector(this.getAttribute('href'));
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 50, // Adjusting for header height
                behavior: 'smooth'
            });
        }
    });
});

// Highlight current section in the navbar
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 60) {  // Adjust for the header
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});

// JavaScript for FAQ Toggle
document.querySelectorAll('.faq-btn').forEach(button => {
    button.addEventListener('click', () => {
        const faqContent = button.nextElementSibling;
        const isActive = button.classList.contains('active');

        // Close all other open FAQ items
        document.querySelectorAll('.faq-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.nextElementSibling.style.display = 'none';
        });

        // Toggle the clicked FAQ item
        if (!isActive) {
            button.classList.add('active');
            faqContent.style.display = 'block';
        } else {
            button.classList.remove('active');
            faqContent.style.display = 'none';
        }
    });
});

// Chat Widget Functionality
document.getElementById('chat-send').addEventListener('click', async () => {
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const message = chatInput.value.trim();

    if (message) {
        chatMessages.innerHTML += `<div class="message user-message">${message}</div>`;
        chatInput.value = '';

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            chatMessages.innerHTML += `<div class="message bot-message">${data.reply}</div>`;
            chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the latest message
        } catch (error) {
            chatMessages.innerHTML += `<div class="message bot-message">Sorry, there was an error processing your request.</div>`;
        }
    }
});

document.getElementById('chat-close').addEventListener('click', () => {
    document.getElementById('chat-widget').style.display = 'none';
});


/// Get the modal
const modal = document.getElementById('tracker-modal');
const btn = document.querySelector('.cta-btn'); // The "Get Started" button
const span = document.querySelector('.close-btn'); // The close button in the modal

// When the user clicks the button, open the modal
btn.addEventListener('click', function() {
    console.log('Get Started button clicked'); // Debugging step
    modal.style.display = 'block';
});

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', function() {
    console.log('Close button clicked'); // Debugging step
    modal.style.display = 'none';
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        console.log('Clicked outside modal'); // Debugging step
        modal.style.display = 'none';
    }
});
