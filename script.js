import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSetting = {
  databaseURL:
    "https://playground-1c859-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");
const formEl = document.getElementById("form");

const app = initializeApp(appSetting);
const database = getDatabase(app);
const shipingtListInDB = ref(database, "shoppingList");

addButtonEl.addEventListener("click", () => {
  let inputValue = inputFieldEl.value;

  clearInputFieldEl();

  if (inputValue) {
    push(shipingtListInDB, inputValue);
    console.log(`${inputValue} added to database`);
  }
});

onValue(shipingtListInDB, (snapshot) => {
  const itemsArray = snapshot.exists() ? Object.entries(snapshot.val()) : [];

  clearShoppingListEl();

  itemsArray.forEach((item) => {
    appendItemsToShoppingList(item);
  });
});

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
});

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function appendItemsToShoppingList(item) {
  const [id, value] = item;

  const newEl = document.createElement("li");
  newEl.textContent = value;
  shoppingListEl.appendChild(newEl);

  newEl.addEventListener("dblclick", () => {
    const itemLocationInDB = ref(database, `shoppingList/${id}`);
    remove(itemLocationInDB);
  });
}
