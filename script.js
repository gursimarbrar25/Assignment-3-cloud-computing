// Define smoothie objects with their ingredients and prices
const smoothies = {
  strawberryBanana: {
    name: "Strawberry Banana",
    ingredients: ["Strawberries", "Banana", "Yogurt", "Honey"],
    image: "image/strawberry_banana.png",
    price: 4.99,
  },
  mangoPineapple: {
    name: "Mango Pineapple",
    ingredients: ["Mango", "Pineapple", "Coconut Milk", "Lime"],
    image: "image/mango_pineapple.png",
    price: 5.49,
  },
  Raspberry: {
    name: "Raspberry",
    ingredients: ["Raspberry", "Banana", "Yogert", "Apple Juce"],
    image: "image/raspberry.png",
    price: 5.49,
  },
  Peach: {
    name: "Peach",
    ingredients: ["Peach", "Mango", "Yogert", "Peach nectar"],
    image: "image/peach.png",
    price: 5.49,
  },
 
};

// Function to calculate the total price
function calculateTotalPrice(size, quantity, topUps) {
  const selectedSmoothie = document.getElementById("smoothieSelect").value;
  const smoothie = smoothies[selectedSmoothie];
  let totalPrice = smoothie.price;

  if (size === "medium") {
    totalPrice += 1.5;
  } else if (size === "large") {
    totalPrice += 2.5;
  }

  let whipCreamPrice = 0; // Initialize the price for Whipcream
  topUps.forEach((topUp) => {
    switch (topUp) {
      case "protein":
        totalPrice += 1.5;
        break;
      case "chocolateChips":
        totalPrice += 0.75;
        break;
      case "Whipcream":
        whipCreamPrice = 0.99;
        break;
      // Add more top-up cases here
    }
  });

  totalPrice += whipCreamPrice; // Add the Whipcream price to the total

  totalPrice *= quantity;

  return totalPrice.toFixed(2);
}

// Function to handle the form submission
function handleOrder() {
  const size = document.querySelector('input[name="size"]:checked').value;
  const quantity = parseInt(document.getElementById("quantity").value, 10);
  const topUps = Array.from(document.querySelectorAll('input[name="topUps"]:checked')).map((checkbox) => checkbox.value);

  const totalPrice = calculateTotalPrice(size, quantity, topUps);

  const selectedSmoothie = document.getElementById("smoothieSelect").value;
  const smoothie = smoothies[selectedSmoothie];

  const greeting = `Thank you for ordering a ${smoothie.name} smoothie!`;

  const smoothieImage = document.getElementById("smoothieImage");
  smoothieImage.src = smoothie.image;

  const greetingElement = document.getElementById("greeting");
  greetingElement.textContent = greeting;

  const smoothieNameElement = document.getElementById("smoothieName");
  smoothieNameElement.textContent = smoothie.name;

  const unitPriceElement = document.getElementById("unitPrice");
  unitPriceElement.textContent = `$${smoothie.price.toFixed(2)}`;

  const quantityElement = document.getElementById("quantityRow");
  quantityElement.textContent = quantity;

  const topUpsList = document.getElementById("topUpsList");
  topUpsList.textContent = ""; // Clear the previous content

  topUps.forEach((topUp) => {
    const topUpItem = document.createElement("tr");
    const itemName = document.createElement("td");
    itemName.textContent = `${topUp}`;
    topUpItem.appendChild(itemName);

    const itemQuantity = document.createElement("td");
    itemQuantity.textContent = "1"; // Assuming top-up quantity is always 1
    topUpItem.appendChild(itemQuantity);

    const itemUnitPrice = document.createElement("td");
    let topUpPrice = 0;
    switch (topUp) {
      case "protein":
        topUpPrice = 1.5;
        break;
      case "chocolateChips":
        topUpPrice = 0.75;
        break;
      case "Whipcream":
        topUpPrice = 0.99;
        break;
      // Add more top-up cases here
    }
    itemUnitPrice.textContent = `$${topUpPrice.toFixed(2)}`;
    topUpItem.appendChild(itemUnitPrice);

    topUpsList.appendChild(topUpItem);
  });

  const totalAmountElement = document.getElementById("totalAmount");
  totalAmountElement.textContent = `$${totalPrice}`;

  const invoice = document.getElementById("invoice");
  invoice.classList.remove("hidden");
}

// Attach event listener to the Order button
document.getElementById("orderButton").addEventListener("click", handleOrder);
