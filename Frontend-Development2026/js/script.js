// Salary Calculator
function calculateSalary() {
  const exp = document.getElementById("expLevel").value;
  const loc = parseFloat(document.getElementById("calcLocation").value);
  let base = 0;

  if (exp === "junior") base = 65000;
  else if (exp === "mid") base = 95000;
  else base = 135000;

  const final = Math.round(base * loc);
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(final);

  const resultBox = document.getElementById("salaryResult");
  const display = document.getElementById("salaryDisplay");

  resultBox.classList.remove("hidden");
  display.innerText = formatted;
}

// Quiz
function submitQuiz() {
  const selected = document.querySelector('input[name="framework"]:checked');
  if (!selected) {
    alert("Please select an option!");
    return;
  }
  alert(
    `We recommend focusing on ${selected.value}! It matches your development philosophy perfectly.`
  );
}

function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.className =
    "flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700";

  li.innerHTML = `
        <span class="task-text text-slate-200">${text}</span>
        <div class="task-buttons flex gap-2">
            <button class="complete-btn" title="Mark Complete">
                <i class="fas fa-check-circle"></i>
            </button>
            <button class="edit-btn" title="Edit Task">
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete-btn" title="Delete Task">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `;

  li.querySelector(".complete-btn").addEventListener("click", () => {
    const span = li.querySelector(".task-text");
    span.classList.toggle("line-through");
    span.classList.toggle("text-slate-400");
  });

  li.querySelector(".edit-btn").addEventListener("click", () => {
    const span = li.querySelector(".task-text");
    const newText = prompt("Edit your task:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText.trim();
    }
  });

  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
  });

  document.getElementById("todoList").appendChild(li);
  input.value = "";
}

// Table Filtering
document.getElementById("courseSearch").addEventListener("input", filterTable);
document.getElementById("levelFilter").addEventListener("change", filterTable);

function filterTable() {
  const query = document.getElementById("courseSearch").value.toLowerCase();
  const level = document.getElementById("levelFilter").value;
  const rows = document.querySelectorAll("#courseTableBody tr");

  rows.forEach((row) => {
    const text = row.innerText.toLowerCase();
    const matchesSearch = text.includes(query);
    const matchesLevel = level === "All" || text.includes(level.toLowerCase());
    row.style.display = matchesSearch && matchesLevel ? "" : "none";
  });
}

const hamburgerBtn = document.getElementById("hamburger-btn");
const mobileMenu = document.getElementById("mobile-menu");
const header = document.querySelector("header");
const navLinks = document.querySelectorAll("nav a, #mobile-menu a");

let lastScrollY = window.scrollY;

hamburgerBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
  mobileMenu.classList.toggle("hidden");

  const icon = hamburgerBtn.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
    mobileMenu.classList.add("hidden");

    const icon = hamburgerBtn.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");
  });
});

window.addEventListener("scroll", () => {
  const fromTop = window.scrollY + 80;

  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (!section) return;

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      navLinks.forEach((l) => l.classList.remove("nav-active"));
      link.classList.add("nav-active");
    }
  });

  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    header.classList.add("header-hide");
  } else {
    header.classList.remove("header-hide");
  }

  lastScrollY = window.scrollY;
});
