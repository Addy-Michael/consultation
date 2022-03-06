const results = document.querySelector(".results");
const patientID = document.querySelector("#patient");
const searchPatient = document.querySelector(".searchPatient");

// search patients record
searchPatient.addEventListener("click", async (e) => {
  e.preventDefault();
  let ul = "";

  console.log(patientID.value);

  const req = await fetch(`/patients/record/${patientID.value}`);

  const res = await req.json();

  console.log(res);

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
        </ul>`;
    });

    results.innerHTML = ul;
  }
});
