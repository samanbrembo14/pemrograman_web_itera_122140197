// Array penampung semua item to-do.
// Disimpan hanya sekali di memori, lalu disinkronkan ke localStorage setiap perubahan.
let todos = [];

// Referensi elemen DOM
const taskInput = document.getElementById("taskInput");
const daySelect = document.getElementById("daySelect");
const addBtn = document.getElementById("addBtn");
const dayContainer = document.getElementById("dayContainer");

// Daftar hari yang akan ditampilkan secara urut
const daysOfWeek = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

// Ambil data dari localStorage saat halaman dimuat
window.addEventListener("DOMContentLoaded", () => {
  const storedData = localStorage.getItem("todos");
  if (storedData) {
    todos = JSON.parse(storedData);
  }
  renderTodosByDay();
});

// Tambah item baru saat klik tombol atau tekan Enter
addBtn.addEventListener("click", addTodo);
taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

// Fungsi untuk menambah to-do
function addTodo() {
  const taskText = taskInput.value.trim();
  const taskDay = daySelect.value; // dari dropdown
  if (taskText !== "") {
    const newTodo = {
      id: Date.now(),
      text: taskText,
      day: taskDay,
      completed: false
    };
    todos.push(newTodo);

    // Kosongkan input
    taskInput.value = "";
    // (Opsional) reset pilihan hari:
    // daySelect.value = "Senin";

    saveToLocalStorage();
    renderTodosByDay();
  }
}

// Fungsi menampilkan tasks per hari
function renderTodosByDay() {
  // Bersihkan container
  dayContainer.innerHTML = "";

  daysOfWeek.forEach((hari) => {
    // Ambil data todos untuk hari tertentu
    const tasksForThisDay = todos.filter(todo => todo.day === hari);
    if (tasksForThisDay.length === 0) {
      return; // tidak buat section kalau kosong
    }

    // Buat "kartu" day-section
    const section = document.createElement("div");
    section.classList.add("day-section");

    // Judul hari
    const heading = document.createElement("h2");
    heading.textContent = hari;
    section.appendChild(heading);

    // Buat daftar <ul>
    const ul = document.createElement("ul");

    tasksForThisDay.forEach((todo) => {
      const li = document.createElement("li");
      if (todo.completed) {
        li.classList.add("completed");
      }

      // Checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => {
        todo.completed = !todo.completed;
        saveToLocalStorage();
        renderTodosByDay();
      });

      // Span teks tugas
      const span = document.createElement("span");
      span.className = "task-text";
      span.textContent = todo.text;

      // Tombol hapus
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn-delete";
      deleteBtn.textContent = "Hapus";
      deleteBtn.addEventListener("click", () => {
        // Hapus item dari array
        todos = todos.filter(item => item.id !== todo.id);
        saveToLocalStorage();
        renderTodosByDay();
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      ul.appendChild(li);
    });

    section.appendChild(ul);
    dayContainer.appendChild(section);
  });
}

// Fungsi menyimpan data ke localStorage
function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
