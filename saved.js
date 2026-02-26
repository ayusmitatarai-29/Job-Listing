const container = document.getElementById("savedContainer");

let saved = JSON.parse(localStorage.getItem("savedJobs")) || [];

function displaySaved(){

    container.innerHTML="";

    saved.forEach((job,index)=>{

        const card=document.createElement("div");
        card.className="job-card";

        card.innerHTML=`
            <h3>${job.title}</h3>
            <p><b>${job.company}</b></p>
            <p>Salary: ₹${job.salary}</p>
            <p>${job.location}</p>
            <button onclick="removeJob(${index})">Remove</button>
        `;

        container.appendChild(card);

    });

}

function removeJob(index){
    saved.splice(index,1);
    localStorage.setItem("savedJobs",JSON.stringify(saved));
    displaySaved();
}

displaySaved();