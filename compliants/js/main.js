const createForm = document.querySelector(".createForm"),
  role = createForm.querySelector("#role"),
  roleContain = createForm.querySelector(".role"),
  name = createForm.querySelector("#name"),
  age = createForm.querySelector("#age"),
  compliants = createForm.querySelector("#com");
const createBtn = document.querySelector(".create");

// create record
createBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const req = await fetch("/patients/record/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      age: age.value,
      compliants: compliants.value,
      role: role.value,
    }),
  });

  const res = await req.json();

  const p = document.createElement("p");

  if (res.status == "failed") {
    p.innerText = res.message;
    p.className = "fail";

    createForm.insertBefore(p, roleContain);

    setTimeout(() => {
      document.querySelector(".fail").remove();
    }, 3000);
  } else {
    p.innerText = "Records added";
    p.className = "success";

    createForm.insertBefore(p, roleContain);

    setTimeout(() => {
      document.querySelector(".success").remove();
    }, 3000);
  }
});
