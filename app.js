// Redirect to index.html when the "Home" button is clicked
function goToHome() {
  window.location.href = "index.html";
}

function addStudentForm() {
  window.location.href = "addStudent.html";
}

function searchStudentForm() {
  window.location.href = "searchStudent.html";
}
function deleteStudentForm() {
  window.location.href = "deleteStudent.html";
}
function updateStudentForm() {
  window.location.href = "updateStudent.html";
}



// Clear the form fields
function clearaddform() {
  document.getElementById("txtaddfname").value = "";
  document.getElementById("txtaddlname").value = "";
  document.getElementById("txtaddemail").value = "";
  document.getElementById("txtaddage").value = "";
  document.getElementById("txtaddgrade").value = "";
  document.getElementById("txtaddcontact").value = "";
  document.getElementById("txtaddaddress").value = "";
  document.getElementById("txtaddimage").value = "";
}

// Add student data to the backend
function addstudent() {
  const fname = document.getElementById("txtaddfname").value;
  const lname = document.getElementById("txtaddlname").value;
  const email = document.getElementById("txtaddemail").value;
  const age = document.getElementById("txtaddage").value;
  const grade = document.getElementById("txtaddgrade").value;
  const address = document.getElementById("txtaddaddress").value;
  const contact = document.getElementById("txtaddcontact").value;
  const image = document.getElementById("txtaddimage").files[0];

  const formData = new FormData();

  formData.append("student", new Blob([JSON.stringify({
    fname: fname,
    lname: lname,
    age: age,
    address: address,
    phone: contact,
    email: email,
    grade: grade
  })], { type: "application/json" }));

  formData.append("image", image);

  const requestOptions = {
    method: "POST",
    body: formData,
    redirect: "follow"
  };

  fetch("http://localhost:8080/student/add-student", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      loadtable();  // Reload the table after adding the student
    })
    .catch(error => console.error('Error:', error));
}

let image = document.getElementById("txtaddimage");

image.addEventListener("change", e => {
  if (image.files[0].size >= 1000000) {
    window.alert("file is large")
    image.value = null;
  }
})

// Load the student table from the backend
function loadtable() {
  let tablebody = document.getElementById("tablebody");
  let body = ``;

  fetch("http://localhost:8080/student/get-student")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      data.forEach(element => {
        body += `<tr>
                  <td>${element.id}</td>
                  <td>${element.fname}</td>
                  <td>${element.lname}</td>
                  <td>${element.age}</td>
                  <td>${element.grade}</td>
                  <td>${element.email}</td>
                  <td>${element.address}</td>
                  <td>${element.phone}</td>
                </tr>`;
      });
      tablebody.innerHTML = body;
    })
    .catch(error => console.error('Error:', error));
}

function searchstudent() {
  let searchid = document.getElementById("txtsearch").value;
  let fname = document.getElementById("searchstudentfname");
  let lname = document.getElementById("searchstudentlname");
  let age = document.getElementById("searchstudentage");
  let grade = document.getElementById("searchstudentgrade");
  let email = document.getElementById("searchstudentemail");
  let address = document.getElementById("searchstudentaddress");
  let phone = document.getElementById("searchstudentphone");
  let image = document.getElementById("searchstudentpic");

  fetch(`http://localhost:8080/student/searchById/${searchid}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      fname.value = data.fname;
      lname.value = data.lname;
      age.value = data.age;
      grade.value = data.grade;
      email.value = data.email;
      address.value = data.address;
      phone.value = data.phone;
      image.src = "data:image/*;base64," + data.image;
    })
}

function deletesearch() {
  let searchid = document.getElementById("txtdeletesearch").value;
  let fname = document.getElementById("txtdeletefname");
  let lname = document.getElementById("txtdeletelname");
  let age = document.getElementById("txtdeleteage");
  let grade = document.getElementById("txtdeletegrade");
  let email = document.getElementById("txtdeleteemail");
  let address = document.getElementById("txtdeleteaddress");
  let phone = document.getElementById("txtdeletecontact");
  let image = document.getElementById("deletecurrentstudent");

  fetch(`http://localhost:8080/student/searchById/${searchid}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      fname.value = data.fname;
      lname.value = data.lname;
      age.value = data.age;
      grade.value = data.grade;
      email.value = data.email;
      address.value = data.address;
      phone.value = data.phone;
      image.src = "data:image/*;base64," + data.image;
    })

}
function deletestudent() {
  const requestOptions = {
    method: "DELETE",
    redirect: "follow"
  };

  fetch(`http://localhost:8080/student/deleteStudent/${document.getElementById("txtdeletesearch").value}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      alert("Deleted successfully!"); // Show success message

      // Clear all the input fields
      document.getElementById("txtdeletesearch").value = "";
      document.getElementById("txtdeletefname").value = "";
      document.getElementById("txtdeletelname").value = "";
      document.getElementById("txtdeleteage").value = "";
      document.getElementById("txtdeletegrade").value = "";
      document.getElementById("txtdeleteemail").value = "";
      document.getElementById("txtdeleteaddress").value = "";
      document.getElementById("txtdeletecontact").value = "";
      document.getElementById("deletecurrentstudent").src = "";

      loadtable(); // Reload the table
    })
    .catch((error) => console.error(error));
}



function updatesearch() {
  let searchid = document.getElementById("txtupdatesearch").value;
  let fname = document.getElementById("txtupdatefname");
  let lname = document.getElementById("txtupdatelname");
  let age = document.getElementById("txtupdateage");
  let grade = document.getElementById("txtupdategrade");
  let email = document.getElementById("txtupdateemail");
  let address = document.getElementById("txtupdateaddress");
  let phone = document.getElementById("txtupdatecontact");
  let image = document.getElementById("updatecurrentstudent");

  fetch(`http://localhost:8080/student/searchById/${searchid}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      fname.value = data.fname;
      lname.value = data.lname;
      age.value = data.age;
      grade.value = data.grade;
      email.value = data.email;
      address.value = data.address;
      phone.value = data.phone;
      image.src = "data:image/*;base64," + data.image;
      localStorage.setItem("currentimage", JSON.stringify(data.image));
    })

}


function updatestudent() {
  const fname = document.getElementById("txtupdatefname").value;
  const lname = document.getElementById("txtupdatelname").value;
  const email = document.getElementById("txtupdateemail").value;
  const age = document.getElementById("txtupdateage").value;
  const grade = document.getElementById("txtupdategrade").value;
  const address = document.getElementById("txtupdateaddress").value
  const contact = document.getElementById("txtupdatecontact").value;
  const image = document.getElementById("txtupdateimage").files[0];

  console.log(fname);
  console.log(lname);
  console.log(email);
  console.log(age);
  console.log(grade);
  console.log(address);
  console.log(contact);


  const formData = new FormData();

  formData.append("student", new Blob([JSON.stringify({
      id: document.getElementById("txtupdatesearch").value,
      fname: fname,
      lname: lname,
      age: age,
      address: address,
      phone: contact,
      email: email,
      grade: grade
  })], { type: "application/json" }));

  if (image !== undefined) {
      formData.append("image", image);
  } else {
      formData.append("image", JSON.parse(localStorage.getItem("currentimage")));
  }


  const requestOptions = {
      method: "PATCH",
      body: formData,
      redirect: "follow"
  };

  fetch("http://localhost:8080/student/updateStudent", requestOptions)
      .then((response) => response.text())
      .then((result) => {
          console.log(result);
          loadtable();
          localStorage.clear();
      })
      .catch((error) => console.error(error));
}




