document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Load Header and Footer ---
    fetch('global/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            // This function is called here to ensure it runs AFTER the header is loaded
            setupHeaderScroll();
        })
        .catch(error => console.error('Error loading the header:', error));

    fetch('global/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading the footer:', error));

    // --- 2. Sleek Header Animation on Scroll ---
    function setupHeaderScroll() {
        const headerElement = document.querySelector('.header');
        if (headerElement) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    headerElement.classList.add('header-scrolled');
                } else {
                    headerElement.classList.remove('header-scrolled');
                }
            });
        }
    }

    // --- 3. "Apple-Sleek" Fade-in Sections on Scroll ---
    const animatedElements = document.querySelectorAll('.page-header, .content-section, .category-card, .hero, .disclaimer-box');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once it's visible to prevent re-animation
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- 4. Timeline Page Logic (Complete and Unedited) ---
    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer) {
        const selector = document.getElementById('student-type-select');
        const storageKey = 'universityTimelineData';

        const defaultData = {
            'us-student': {
                'Grade 9-10: Foundation Years': [{ text: 'Focus on Grades and build a strong GPA', completed: false }, { text: 'Explore interests: join clubs, sports, or volunteer', completed: false }, { text: 'Plan challenging courses (AP/Honors) with a counselor', completed: false }],
                'Grade 11: The Critical Year': [{ text: 'Prepare for and take the SAT or ACT', completed: false }, { text: 'Research universities and build a potential list', completed: false }, { text: 'Visit campuses to get a feel for student life', completed: false }, { text: 'Build strong relationships with teachers for recommendations', completed: false }],
                'Grade 12: Application Season': [{ text: 'Finalize university list (5-10 schools)', completed: false }, { text: 'Work on applications (Common App) and personal essays', completed: false }, { text: 'Complete the FAFSA and CSS Profile for financial aid', completed: false }, { text: 'Submit all applications before deadlines', completed: false }]
            },
            'international-student': {
                '18-24 Months Before University': [{ text: 'Research and select target country and universities', completed: false }, { text: 'Prepare for and take English proficiency tests (TOFL/IELTS)', completed: false }, { text: 'Ensure academic coursework aligns with requirements', completed: false }],
                '12-18 Months Before University': [{ text: 'Take required standardized tests (e.g., SAT/ACT)', completed: false }, { text: 'Create a final university shortlist (5-8 schools)', completed: false }, { text: 'Begin gathering financial documentation for visa/applications', completed: false }],
                '6-12 Months Before University': [{ text: 'Complete and submit all university applications and essays', completed: false }, { text: 'Request letters of recommendation from teachers', completed: false }, { text: 'Apply for international student scholarships', completed: false }],
                '1-6 Months Before University': [{ text: 'Receive and accept an admission offer', completed: false }, { text: 'Apply for your student visa immediately', completed: false }, { text: 'Arrange housing and book travel', completed: false }]
            },
            'student-athlete': {
                'Grade 9: Get Started': [{ text: 'Plan high school courses to be NCAA-approved', completed: false }, { text: 'Create a free profile page with the NCAA Eligibility Center', completed: false }, { text: 'Focus on both athletic and academic performance', completed: false }],
                'Grade 10: Build Your Profile': [{ text: 'Upgrade to a paid NCAA Certification Account', completed: false }, { text: 'Ask counselor to upload official transcripts to NCAA', completed: false }, { text: 'Create a highlight reel and start contacting coaches', completed: false }],
                'Grade 11: The Recruiting Year': [{ text: 'Take the SAT/ACT and send scores to the NCAA (code 9999)', completed: false }, { text: 'Communicate regularly with interested coaches', completed: false }, { text: 'Go on unofficial visits to campuses', completed: false }],
                'Grade 12: Final Steps': [{ text: 'Take official, university-paid visits', completed: false }, { text: 'Apply to the universities that are recruiting you', completed: false }, { text: 'Sign a National Letter of Intent (NLI) if you receive an offer', completed: false }, { text: 'Request final amateurism certification after graduation', completed: false }]
            }
        };

        let timelineData = {};

        function saveData() { localStorage.setItem(storageKey, JSON.stringify(timelineData)); }
        function loadData() {
            const savedData = localStorage.getItem(storageKey);
            timelineData = savedData ? JSON.parse(savedData) : JSON.parse(JSON.stringify(defaultData));
        }

        function renderTimeline(studentType) {
            timelineContainer.innerHTML = '';
            const data = timelineData[studentType];
            if (!data) return;
            const timelineDiv = document.createElement('div');
            timelineDiv.className = 'timeline active';
            timelineDiv.id = studentType;
            for (const sectionTitle in data) {
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'timeline-section';
                const h3 = document.createElement('h3');
                h3.textContent = sectionTitle;
                sectionDiv.appendChild(h3);
                const ul = document.createElement('ul');
                data[sectionTitle].forEach((task, index) => {
                    const li = document.createElement('li');
                    li.className = `task-item ${task.completed ? 'completed' : ''}`;
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.checked = task.completed;
                    checkbox.addEventListener('change', () => toggleTask(studentType, sectionTitle, index));
                    const span = document.createElement('span');
                    span.className = 'task-text';
                    span.textContent = task.text;
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'delete-btn';
                    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
                    deleteBtn.addEventListener('click', () => deleteTask(studentType, sectionTitle, index));
                    li.appendChild(checkbox);
li.appendChild(span);
                    li.appendChild(deleteBtn);
                    ul.appendChild(li);
                });
                sectionDiv.appendChild(ul);
                const addContainer = document.createElement('div');
                addContainer.className = 'add-task-container';
                const addInput = document.createElement('input');
                addInput.type = 'text';
                addInput.className = 'add-task-input';
                addInput.placeholder = 'Add a new task...';
                const addBtn = document.createElement('button');
                addBtn.className = 'add-task-btn';
                addBtn.textContent = 'Add Task';
                addBtn.addEventListener('click', () => addTask(studentType, sectionTitle, addInput));
                addInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(studentType, sectionTitle, addInput); });
                addContainer.appendChild(addInput);
                addContainer.appendChild(addBtn);
                sectionDiv.appendChild(addContainer);
                timelineDiv.appendChild(sectionDiv);
            }
            timelineContainer.appendChild(timelineDiv);
        }

        function toggleTask(studentType, sectionTitle, taskIndex) {
            timelineData[studentType][sectionTitle][taskIndex].completed = !timelineData[studentType][sectionTitle][taskIndex].completed;
            saveData();
            renderTimeline(studentType);
        }

        function deleteTask(studentType, sectionTitle, taskIndex) {
            timelineData[studentType][sectionTitle].splice(taskIndex, 1);
            saveData();
            renderTimeline(studentType);
        }

        function addTask(studentType, sectionTitle, inputElement) {
            const text = inputElement.value.trim();
            if (text) {
                timelineData[studentType][sectionTitle].push({ text: text, completed: false });
                saveData();
                renderTimeline(studentType);
            }
        }

        selector.addEventListener('change', function() { renderTimeline(this.value); });
        loadData();
        renderTimeline(selector.value);
    }
});
