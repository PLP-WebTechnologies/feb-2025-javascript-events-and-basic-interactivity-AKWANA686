// Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            // ======================
            // 1. Event Handling
            // ======================
            
            // Button click event
            const clickButton = document.getElementById('click-button');
            const clickOutput = document.getElementById('click-output');
            
            clickButton.addEventListener('click', function() {
                clickOutput.textContent = 'Button was clicked! 🎉';
                clickOutput.style.color = '#2ecc71';
            });
            
            // Hover effects
            const hoverBox = document.querySelector('.hover-box');
            const hoverOutput = document.getElementById('hover-output');
            
            hoverBox.addEventListener('mouseenter', function() {
                hoverOutput.textContent = 'Hover detected! ✨';
                hoverOutput.style.color = '#3498db';
            });
            
            hoverBox.addEventListener('mouseleave', function() {
                hoverOutput.textContent = 'Waiting for hover...';
                hoverOutput.style.color = '';
            });
            
            // Keypress detection
            const keypressInput = document.getElementById('keypress-input');
            const keypressOutput = document.getElementById('keypress-output');
            
            keypressInput.addEventListener('keypress', function(e) {
                keypressOutput.textContent = `Key pressed: ${e.key} (Code: ${e.keyCode})`;
                keypressOutput.style.color = '#9b59b6';
            });
            
            // Secret action (double click or long press)
            const secretBox = document.querySelector('.secret-box');
            let pressTimer;
            
            // Double click
            secretBox.addEventListener('dblclick', function() {
                this.classList.add('activated');
                this.innerHTML = '<p>You found the secret with a double click! 🎊</p>';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.classList.remove('activated');
                    this.innerHTML = '<p>Double click or long press me for a secret!</p>';
                }, 2000);
            });
            
            // Long press (touch or mouse)
            secretBox.addEventListener('mousedown', startPressTimer);
            secretBox.addEventListener('touchstart', startPressTimer);
            
            secretBox.addEventListener('mouseup', cancelPressTimer);
            secretBox.addEventListener('mouseleave', cancelPressTimer);
            secretBox.addEventListener('touchend', cancelPressTimer);
            
            function startPressTimer() {
                pressTimer = setTimeout(() => {
                    secretBox.classList.add('activated');
                    secretBox.innerHTML = '<p>You found the secret with a long press! 🎊</p>';
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        secretBox.classList.remove('activated');
                        secretBox.innerHTML = '<p>Double click or long press me for a secret!</p>';
                    }, 2000);
                }, 1000); // 1 second for long press
            }
            
            function cancelPressTimer() {
                clearTimeout(pressTimer);
            }
            
            // ======================
            // 2. Interactive Elements
            // ======================
            
            // Button that changes text and color
            const colorChanger = document.getElementById('color-changer');
            const colors = ['red', 'green', 'aqua', 'pink', 'grey'];
            let colorIndex = 0;
            
            colorChanger.addEventListener('click', function() {
                colorIndex = (colorIndex + 1) % colors.length;
                this.style.backgroundColor = colors[colorIndex];
                this.textContent = `Color changed to ${colors[colorIndex]}`;
            });
            
            // Image gallery/slideshow
            const images = document.querySelectorAll('.image-gallery img');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            let currentImageIndex = 0;
            
            // Show first image initially
            images[currentImageIndex].classList.add('active');
            
            function showImage(index) {
                images.forEach(img => img.classList.remove('active'));
                images[index].classList.add('active');
            }
            
            nextBtn.addEventListener('click', function() {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                showImage(currentImageIndex);
            });
            
            prevBtn.addEventListener('click', function() {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                showImage(currentImageIndex);
            });
            
            // Auto-advance slideshow every 3 seconds
            setInterval(() => {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                showImage(currentImageIndex);
            }, 3000);
            
            // Tabs
            const tabButtons = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const tabId = this.getAttribute('data-tab');
                    
                    // Remove active class from all buttons and contents
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));
                    
                    // Add active class to clicked button and corresponding content
                    this.classList.add('active');
                    document.getElementById(tabId).classList.add('active');
                });
            });
            
            // ======================
            // 3. Form Validation
            // ======================
            
            const form = document.getElementById('validation-form');
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const passwordError = document.getElementById('password-error');
            const formStatus = document.getElementById('form-status');
            
            // Real-time validation
            nameInput.addEventListener('input', validateName);
            emailInput.addEventListener('input', validateEmail);
            passwordInput.addEventListener('input', validatePassword);
            
            function validateName() {
                if (nameInput.value.trim() === '') {
                    nameError.textContent = 'Name is required';
                    return false;
                } else {
                    nameError.textContent = '';
                    return true;
                }
            }
            
            function validateEmail() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (emailInput.value.trim() === '') {
                    emailError.textContent = '';
                    return true; // Email is optional in this example
                } else if (!emailRegex.test(emailInput.value)) {
                    emailError.textContent = 'Please enter a valid email address';
                    return false;
                } else {
                    emailError.textContent = '';
                    return true;
                }
            }
            
            function validatePassword() {
                if (passwordInput.value.length === 0) {
                    passwordError.textContent = '';
                    return false;
                } else if (passwordInput.value.length < 8) {
                    passwordError.textContent = 'Password must be at least 8 characters';
                    return false;
                } else {
                    passwordError.textContent = '';
                    return true;
                }
            }
            
            // Form submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const isNameValid = validateName();
                const isEmailValid = validateEmail();
                const isPasswordValid = validatePassword();
                
                if (isNameValid && isEmailValid && isPasswordValid) {
                    formStatus.textContent = 'Form submitted successfully! 🎉';
                    formStatus.style.backgroundColor = '#d4edda';
                    formStatus.style.color = '#155724';
                    
                    // In a real app, you would submit the form data here
                    console.log('Form data:', {
                        name: nameInput.value,
                        email: emailInput.value,
                        password: passwordInput.value
                    });
                    
                    // Reset form after 2 seconds
                    setTimeout(() => {
                        form.reset();
                        formStatus.textContent = '';
                        formStatus.style.backgroundColor = '';
                    }, 2000);
                } else {
                    formStatus.textContent = 'Please fix the errors in the form.';
                    formStatus.style.backgroundColor = '#f8d7da';
                    formStatus.style.color = '#721c24';
                }
            });
        });