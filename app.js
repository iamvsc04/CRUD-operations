async function addData(){
    const id = document.getElementById("rollno").value;
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const course = document.getElementById("course").value;
    const response=await axios.post("http://localhost:3000/students",{id,name,age,course});
}
document.addEventListener("DOMContentLoaded",fetchData())
async function fetchData(){
    const response= await fetch("http://localhost:3000/students")
    if(response.ok){
        const students= await response.json()
        const studentList=document.getElementById("student_list")
        studentList.innerHTML="";
        students.forEach((student)=>{
            const data = document.createElement("tr");
            const rowId = `student_${student.id}`; 
            data.setAttribute("id", rowId);
            data.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.course}</td>
                <td >
                    <button onclick="updateData(${student.id})">edit</button>
                    <button onclick="deleteData(${student.id})">delete</span></button>
                </td>
            `
            studentList.appendChild(data);
        })
    }
    else{
        alert("Failed to load")
    }
}
async function deleteData(studentId) {
        const response = await fetch(`http://localhost:3000/students/${studentId}`, {
            method: 'DELETE'
        });

}

async function updateData(studentId)
{
    let name=prompt("Enter the name")
    let age=prompt("Enter age")
    let course=prompt("Enter course")
    let response=await fetch(`http://localhost:3000/students/${studentId}`,{
        method:"PUT",
         body:JSON.stringify({
            "name":name,
            "age":age,
            "course":course
         })
    })
}