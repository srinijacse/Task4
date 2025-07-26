// To-Do List Logic
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  if (task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
  }
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.style.position = "relative";
    li.style.cursor = "pointer";

    li.onclick = () => {
      // Prevent multiple prompts
      if (li.querySelector(".action-box")) return;

      const actionBox = document.createElement("div");
      actionBox.className = "action-box";
      actionBox.style.marginTop = "5px";

      const doneBtn = document.createElement("button");
      doneBtn.textContent = "✓ Done";
      doneBtn.onclick = (e) => {
        e.stopPropagation();
        li.style.textDecoration = "line-through";
        li.style.color = "gray";
        actionBox.remove();
      };

      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑 Delete";
      delBtn.style.marginLeft = "10px";
      delBtn.onclick = (e) => {
        e.stopPropagation();
        removeTask(index);
      };

      actionBox.appendChild(doneBtn);
      actionBox.appendChild(delBtn);
      li.appendChild(actionBox);
    };

    taskList.appendChild(li);
  });
}



function removeTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

window.onload = () => {
  renderTasks();
  renderProducts();
};

// Product Listing Logic
const products = [
  { name: "Smartphone", category: "electronics", price: 12000, rating: 4.5 },
  { name: "Laptop", category: "electronics", price: 55000, rating: 4.7 },
  { name: "T-Shirt", category: "clothing", price: 500, rating: 4.2 },
  { name: "Jeans", category: "clothing", price: 1200, rating: 4.3 },
];


function renderProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  const filtered = filterByCategory(getProducts());  // 👈 fixed
  const sorted = sortByCriteria(filtered);

  sorted.forEach(product => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - ₹${product.price} - Rating: ${product.rating}`;
    list.appendChild(li);
  });
}


function filterByCategory(items) {
  const category = document.getElementById("filter").value;
  if (category === "all") return items;
  return items.filter(p => p.category === category);
}

function sortByCriteria(items) {
  const sortValue = document.getElementById("sort").value;
  if (sortValue === "priceLow") {
    return [...items].sort((a, b) => a.price - b.price);
  } else if (sortValue === "priceHigh") {
    return [...items].sort((a, b) => b.price - a.price);
  }
  return items;
}
function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

function addProduct() {
  const name = document.getElementById("prodName").value.trim();
  const category = document.getElementById("prodCategory").value.trim();
  const price = parseFloat(document.getElementById("prodPrice").value);
  const rating = parseFloat(document.getElementById("prodRating").value);

  if (name && category && !isNaN(price) && !isNaN(rating)) {
    const newProduct = { name, category, price, rating };
    const products = getProducts();
    products.push(newProduct);
    saveProducts(products);
    renderProducts();

    // Clear inputs
    document.getElementById("prodName").value = "";
    document.getElementById("prodCategory").value = "";
    document.getElementById("prodPrice").value = "";
    document.getElementById("prodRating").value = "";
  }
}


function filterProducts() {
  renderProducts();
}

function sortProducts() {
  renderProducts();
}
