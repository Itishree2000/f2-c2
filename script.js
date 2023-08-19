const students = [
    {
      ID: 1,
      name: 'Alice',
      age: 21,
      grade: 'A',
      degree: 'Btech',
      email: 'alice@example.com'
    },
    {
      ID: 2,
      name: 'Bob',
      age: 22,
      grade: 'B',
      degree: 'MBA',
      email: 'bob@example.com'
    },
    {
      ID: 3,
      name: 'Charlie',
      age: 20,
      grade: 'C',
      degree: 'Arts',
      email: 'charlie@example.com'
    }
  ];
  
  const studentTable = document.getElementById('studentTable');
  const studentForm = document.getElementById('studentForm');
  const searchInput = document.getElementById('searchInput');
  
  // Function to render the student table
  function renderStudentTable() {
    studentTable.querySelector('tbody').innerHTML = '';
  
    students.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td>
          <button class="editBtn" data-id="${student.ID}">Edit</button>
          <button class="deleteBtn" data-id="${student.ID}">Delete</button>
        </td>
      `;
      studentTable.querySelector('tbody').appendChild(row);
    });
  }
  
  // Function to handle form submission
  studentForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const studentID = formData.get('studentID');
  
    const newStudent = {
      ID: studentID ? parseInt(studentID) : students.length + 1,
      name: formData.get('name'),
      age: parseInt(formData.get('age')),
      grade: formData.get('grade'),
      degree: formData.get('degree'),
      email: formData.get('email')
    };
  
    if (studentID) {
      // Edit existing student
      const existingStudent = students.find(student => student.ID === newStudent.ID);
      Object.assign(existingStudent, newStudent);
    } else {
      // Add new student
      students.push(newStudent);
    }
  
    renderStudentTable();
    studentForm.reset();
  });
  
  // Function to handle edit button click
  studentTable.addEventListener('click', function (event) {
    if (event.target.classList.contains('editBtn')) {
      const studentID = parseInt(event.target.getAttribute('data-id'));
      const student = students.find(student => student.ID === studentID);
  
      studentForm.elements['studentID'].value = student.ID;
      studentForm.elements['name'].value = student.name;
      studentForm.elements['age'].value = student.age;
      studentForm.elements['grade'].value = student.grade;
      studentForm.elements['degree'].value = student.degree;
      studentForm.elements['email'].value = student.email;
  
      document.getElementById('submitBtn').textContent = 'Edit Student';
    }
  });
  
  // Function to handle delete button click
  studentTable.addEventListener('click', function (event) {
    if (event.target.classList.contains('deleteBtn')) {
      const studentID = parseInt(event.target.getAttribute('data-id'));
      const studentIndex = students.findIndex(student => student.ID === studentID);
  
      if (studentIndex !== -1) {
        students.splice(studentIndex, 1);
        renderStudentTable();
      }
    }
  });
  
  // Function to handle search input
  searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
  
    const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm) ||
      student.degree.toLowerCase().includes(searchTerm)
    );
  
    studentTable.querySelector('tbody').innerHTML = '';
  
    filteredStudents.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td>
          <button class="editBtn" data-id="${student.ID}">Edit</button>
          <button class="deleteBtn" data-id="${student.ID}">Delete</button>
        </td>
      `;
      studentTable.querySelector('tbody').appendChild(row);
    });
  });
  
  // Initial rendering of the student table
  renderStudentTable();
  