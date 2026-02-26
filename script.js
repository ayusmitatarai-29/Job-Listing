// ================= MENU TOGGLE =================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// ================= LOGIN MODAL =================
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeLogin = document.getElementById("closeLogin");

loginBtn.addEventListener("click", () => {
    loginModal.style.display = "flex";
});

closeLogin.addEventListener("click", () => {
    loginModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = "none";
    }
});


// ================= REGISTER MODAL =================
const registerBtn = document.getElementById("registerBtn");
const registerModal = document.getElementById("registerModal");
const closeRegister = document.getElementById("closeRegister");

registerBtn.addEventListener("click", () => {
    registerModal.style.display = "flex";
});

closeRegister.addEventListener("click", () => {
    registerModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === registerModal) {
        registerModal.style.display = "none";
    }
});


// ================= JOB DATA =================
const jobs = [
{title:"Frontend Developer",company:"Infosys",salary:"4 LPA",location:"Bangalore",level:"fresher",category:"IT",desc:"HTML CSS JS developer needed."},
{title:"Backend Developer",company:"TCS",salary:"5 LPA",location:"Hyderabad",level:"mid",category:"IT",desc:"Node.js backend developer."},
{title:"Software Engineer",company:"Wipro",salary:"6 LPA",location:"Pune",level:"exp",category:"IT",desc:"Java software engineer."},
{title:"Python Developer",company:"Capgemini",salary:"4.5 LPA",location:"Noida",level:"fresher",category:"IT",desc:"Python Django developer."},
{title:"Data Analyst",company:"Accenture",salary:"5.2 LPA",location:"Mumbai",level:"mid",category:"IT",desc:"Data analysis role."},
{title:"UI Designer",company:"HCL",salary:"3.8 LPA",location:"Chennai",level:"fresher",category:"Design",desc:"UI design skills needed."},
{title:"DevOps Engineer",company:"IBM",salary:"8 LPA",location:"Bangalore",level:"exp",category:"IT",desc:"AWS DevOps role."},
{title:"QA Tester",company:"Cognizant",salary:"3.5 LPA",location:"Kolkata",level:"fresher",category:"IT",desc:"Testing role."},
{title:"Android Dev",company:"Samsung",salary:"7 LPA",location:"Noida",level:"mid",category:"IT",desc:"Android Kotlin developer."},
{title:"Cloud Engineer",company:"Oracle",salary:"9 LPA",location:"Pune",level:"exp",category:"IT",desc:"Cloud infrastructure."},
{title:"Web Developer",company:"Zoho",salary:"4 LPA",location:"Chennai",level:"fresher",category:"IT",desc:"Web developer role."},
{title:"Full Stack",company:"Tech Mahindra",salary:"6 LPA",location:"Delhi",level:"mid",category:"IT",desc:"Full stack dev."},
{title:"Website Developer",company:"SPCL",salary:"3 LPA",location:"Pune",level:"fresher",category:"IT",desc: "web development"},
{title:"Manager",company:"Bajaj Finance",salary:"2 LPA",location:"Bhubaneswar",level:"mid",category:"Finance",desc: "Management"}
];


// ================= PAGINATION =================
const jobsPerPage = 6;
let currentPage = 1;
let filteredJobs = [...jobs];

const container = document.getElementById("jobsContainer");
const pagination = document.getElementById("pagination");


function displayJobs() {

    container.innerHTML = "";

    const start = (currentPage - 1) * jobsPerPage;
    const pageJobs = filteredJobs.slice(start, start + jobsPerPage);

    pageJobs.forEach((job, index) => {

        const card = document.createElement("div");
        card.className = "job-card";

        card.innerHTML = `
        <div class="wishlist" onclick="saveJob(${index})">♡</div>

        <span class="level ${job.level} job-exp">
        ${job.level.toUpperCase()}
        </span>

        <h3 class="job-title">${job.title}</h3>

        <p><b>${job.company}</b></p>

        <p class="job-location">Location: ${job.location}</p>

        <p class="job-category">Category: ${job.category}</p>

        <p>Salary: ₹${job.salary}</p>

        <p>${job.desc}</p>

        <button class="view-btn" onclick="openModal(${index})">View More</button>
        `;

        container.appendChild(card);
    });

    setupPagination();
}


function setupPagination() {

    pagination.innerHTML = "";

    const pages = Math.ceil(filteredJobs.length / jobsPerPage);

    for (let i = 1; i <= pages; i++) {

        const btn = document.createElement("button");
        btn.innerText = i;

        if (i === currentPage) btn.classList.add("active");

        btn.onclick = () => {
            currentPage = i;
            displayJobs();
        };

        pagination.appendChild(btn);
    }
}

displayJobs();


// ================= SAVE JOB =================
function saveJob(index) {

    let saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
    saved.push(filteredJobs[index]);

    localStorage.setItem("savedJobs", JSON.stringify(saved));

    alert("Job Saved!");
}


// ================= JOB MODAL =================
const modal = document.getElementById("jobModal");

function openModal(index) {

    const job = filteredJobs[index];

    document.getElementById("modalTitle").innerText = job.title;
    document.getElementById("modalCompany").innerText = "Company: " + job.company;
    document.getElementById("modalSalary").innerText = "Salary: ₹" + job.salary;
    document.getElementById("modalLocation").innerText = "Location: " + job.location;
    document.getElementById("modalLevel").innerText = "Level: " + job.level;
    document.getElementById("modalDescription").innerText = job.desc;

    modal.style.display = "flex";
}

document.getElementById("closeJobModal").onclick = () => {
    modal.style.display = "none";
};

window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};


// ================= SEARCH FILTER =================
function searchJobs() {

    let keyword = document.getElementById("keyword").value.toLowerCase();
    let location = document.getElementById("location").value.toLowerCase();
    let category = document.getElementById("category").value.toLowerCase();
    let experience = document.getElementById("experience").value.toLowerCase();

    filteredJobs = jobs.filter(job => {

        return (
            job.title.toLowerCase().includes(keyword) &&
            job.location.toLowerCase().includes(location) &&
            job.category.toLowerCase().includes(category) &&
            job.level.toLowerCase().includes(experience)
        );

    });

    currentPage = 1;
    displayJobs();
}


// ================= CLEAR FILTER =================
function clearFilters() {

    document.getElementById("keyword").value = "";
    document.getElementById("location").value = "";
    document.getElementById("category").value = "";
    document.getElementById("experience").value = "";

    filteredJobs = [...jobs];
    currentPage = 1;

    displayJobs();
}
// ================= LIVE SEARCH =================

function liveSearch() {

    let keyword = document.getElementById("keyword").value.toLowerCase();
    let location = document.getElementById("location").value.toLowerCase();
    let category = document.getElementById("category").value.toLowerCase();
    let experience = document.getElementById("experience").value.toLowerCase();

    filteredJobs = jobs.filter(job => {

        return (
            (job.title.toLowerCase().includes(keyword) ||
             job.company.toLowerCase().includes(keyword) ||
             job.category.toLowerCase().includes(keyword)) &&

            job.location.toLowerCase().includes(location) &&
            job.category.toLowerCase().includes(category) &&
            job.level.toLowerCase().includes(experience)
        );

    });

    currentPage = 1;
    displayJobs();
}