const roleInput = document.querySelector("#roleSearch");
const search = document.querySelector(".search");
const results = document.querySelector(".results");
const form = document.querySelector(".compliants");

// search all records
search.addEventListener("click", async (e) => {
  e.preventDefault();
  let ul = "";

  console.log(roleInput.value);

  const req = await fetch(`/patients/all/records/`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ role: roleInput.value }),
  });

  const res = await req.json();

  const p = document.createElement("p");

  if (res.data.length == 0) {
    p.innerText = "No records";
    p.className = "fail";

    results.innerHTML = p;

    setTimeout(() => {
      document.querySelector(".fail").remove();
    }, 3000);
  } else {
    p.innerText = "Records added";
    p.className = "success";

    res.data.forEach((response) => {
      ul += `<ul>
        <li>ID: ${response.uniqueId}</li>
        <li>Name: ${response.name}</li>
        <li>Age: ${response.age}</li>
        <li>Compliants: ${response.compliants}</li>
        <li><a href="/patients/record/${response.uniqueId}">Edit</a> <a class="delete" href="#" data-id="${response.uniqueId}">Delete</a></li>
      </ul>`;
    });

    results.innerHTML = ul;
  }
});

// delete record
form.addEventListener("click", async (e) => {
  e.preventDefault();

  console.log(e.target.dataset);

  if (e.target.classList.contains("delete")) {
    const req = await fetch(`/patients/record/${e.target.dataset.id}`, {
      method: "DELETE",
    });

    const res = await req.json();

    if (res.status == "success") {
      window.location.reload();
    }
  }
});
