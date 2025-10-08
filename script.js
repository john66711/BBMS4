const donorForm = document.getElementById("donorForm");
const donorTable = document.querySelector("#donorTable tbody");
const searchBox = document.getElementById("searchBox");

let donors = JSON.parse(localStorage.getItem("donors")) || [];

// Display existing donors on load
window.onload = () => displayDonors(donors);

donorForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const donor = {
    name: document.getElementById("name").value.trim(),
    bloodGroup: document.getElementById("bloodGroup").value,
    contact: document.getElementById("contact").value.trim(),
    city: document.getElementById("city").value.trim(),
  };

  donors.push(donor);
  localStorage.setItem("donors", JSON.stringify(donors));

  displayDonors(donors);
  donorForm.reset();
  alert("✅ Donor Registered Successfully!");
});

function displayDonors(list) {
  donorTable.innerHTML = "";
  list.forEach((donor) => {
    const row = `<tr>
      <td>${donor.name}</td>
      <td>${donor.bloodGroup}</td>
      <td>${donor.contact}</td>
      <td>${donor.city}</td>
    </tr>`;
    donorTable.innerHTML += row;
  });
}

searchBox.addEventListener("keyup", () => {
  const term = searchBox.value.toLowerCase();
  const filtered = donors.filter(
    (d) =>
      d.bloodGroup.toLowerCase().includes(term) ||
      d.city.toLowerCase().includes(term)
  );
  displayDonors(filtered);
});
