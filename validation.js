// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector('.menu-toggle');
    const menu = document.getElementById('menu');

    toggleBtn.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      menu.classList.toggle('show');
      menu.classList.toggle('hidden');
    });
	
/* --- Donation Modal (jQuery) --- */
        $(document).ready(function() {
            const donationModal = $('#donation-modal');
            const donateButton = $('#donate-button');
            const closeBtn = $('.close-donation-modal');
            const donationForm = $('#donation-form');

            donateButton.click(function() {
                donationModal.fadeIn();
            });

            closeBtn.click(function() {
                donationModal.fadeOut();
            });

            $(window).click(function(event) {
                if (event.target === donationModal[0]) {
                    donationModal.fadeOut();
                }
            });

            donationForm.submit(function(event) {
                event.preventDefault();

                // Get form values
                const name = $('#name').val().trim();
                const email = $('#email').val().trim();
                const amount = $('#amount').val();
                const paymentMethod = $('#payment_method').val();
                const message = $('#message').val().trim();

                let isValid = true;
                let errorMessage = '';

                if (name === '') {
                    errorMessage += 'Please enter your name.\n';
                    isValid = false;
                }

                if (email === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    errorMessage += 'Please enter a valid email address.\n';
                    isValid = false;
                }

                if (amount < 5) {
                alert("Minimum donation amount is RM5.");
                return; // Keep preventDefault from the name check
            }

                if (paymentMethod === '') {
                    errorMessage += 'Please select a payment method.\n';
                    isValid = false;
                }

                if (message.length < 10) {
                alert("Message must be at least 10 characters long.");
                return;
             }

                // Process the donation (in a real application, you'd send this data to a server)
                console.log('Donation Details:');
                console.log('Name:', name);
                console.log('Email:', email);
                console.log('Amount:', amount);
                console.log('Payment Method:', paymentMethod);
                console.log('Message:', message);

                alert('Thank you for your generous donation!');
                donationModal.fadeOut();
                donationForm.trigger('reset');
            });
        });

        /* --- Back to Top Button (jQuery) --- */
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }
        });

        $('#back-to-top').click(function() {
            $('html, body').animate({scrollTop : 0}, 800);
            return false;
        });

  // Calendar functionality
  const events = {
    "2025-04-15": "Charity Fund",
    "2025-04-22": "Volunteer Meeting",
    "2025-05-01": "Food Drive",
    "2025-05-10": "Community Day",
    "2025-05-15": "Donation Deadline",
    "2025-05-20": "Fundraiser Gala"
  };

  // Initialize calendar with current date
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();

  // Generate calendar on page load
  generateCalendar(currentYear, currentMonth);

  // Set up navigation controls
  document.getElementById('prev-month')?.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar(currentYear, currentMonth);
  });

  document.getElementById('next-month')?.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendar(currentYear, currentMonth);
  });

  function generateCalendar(year, month) {
    const container = document.getElementById("calendar-container");
    if (!container) return;
    
    container.innerHTML = "";

    // Update month-year display
    const monthYearElement = document.getElementById("month-year");
    if (monthYearElement) {
      monthYearElement.textContent = 
        new Date(year, month).toLocaleDateString('en-US', { 
          month: 'long', 
          year: 'numeric' 
        });
    }

    // Add weekday headers
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    weekdays.forEach(day => {
      container.innerHTML += `<div class="weekday-header">${day}</div>`;
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const today = new Date();

    // Add days from previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      container.innerHTML += `
        <div class="day other-month">
          <div class="day-number">${day}</div>
        </div>
      `;
    }

    // Add current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${(month+1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      const event = events[dateStr];
      const isToday = today.getFullYear() === year && 
                      today.getMonth() === month && 
                      today.getDate() === day;
      
      container.innerHTML += `
        <div class="day ${isToday ? 'today' : ''}">
          <div class="day-number">${day}</div>
          ${event ? `<div class="event" title="${event}">${event}</div>` : ""}
        </div>
      `;
    }

    // Calculate remaining cells needed to complete the grid (6 rows)
    const totalCells = 42; // 7 days * 6 rows
    const daysDisplayed = firstDay + daysInMonth;
    const remainingCells = totalCells - daysDisplayed;

    // Add days from next month
    for (let day = 1; day <= remainingCells; day++) {
      container.innerHTML += `
        <div class="day other-month">
          <div class="day-number">${day}</div>
        </div>
      `;
    }

    // Add event listeners to days with events
    document.querySelectorAll('.day').forEach(dayElement => {
      const eventElement = dayElement.querySelector('.event');
      if (eventElement) {
        dayElement.classList.add('has-event');
        dayElement.addEventListener('click', () => {
          alert(`Event: ${eventElement.textContent}`);
        });
      }
    });
  }
});