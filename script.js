const secrets = {
    1: 3,
    2: 5,
    3: 4,
    4: 3,
    5: 4,
    6: 5,
    7: 7,
    8: 4,
    9: 3,
    10: 4,
    11: 3,
    12: 4,
    13: 3,
    14: 4,
    15: 3,
    16: 4,
    17: 5,
    18: 3,
    19: 4,
    20: 7,
    21: 4,
    22: 5,
    23: 6,
    24: 3
};

const distance = localStorage.getItem("distancelocal") || 0;

// Check if the setting is already stored in localStorage
window.addEventListener('DOMContentLoaded', () => {
    const userSetting = localStorage.getItem('userSetting');
    
    // If no setting is found, show the modal
    if (!userSetting) {
      document.getElementById('settingsModal').style.display = 'flex';
    }
  
    // Save the setting when the user clicks the button
    document.getElementById('saveSetting').addEventListener('click', () => {
      const selectedSetting = document.getElementById('settingChoice').value;
      localStorage.setItem('userSetting', selectedSetting);  // Save the setting in localStorage
  
      // Close the modal
      document.getElementById('settingsModal').style.display = 'none';
  
      // Apply the setting (if needed, e.g., apply dark/light mode)
      applySetting(selectedSetting);
    });
  });
  
  function applySetting(setting) {
    if (setting === '200') {
      for(let key in secrets)
      {
        secrets[key] *= 2;
      }
        localStorage.setItem("distancelocal",200);
    }
    else if(setting === '100')
    {
        localStorage.setItem("distancelocal",100);
    }  
    setprogressbartext();
  }

  const userSetting = localStorage.getItem('userSetting');

// Select all boxes
const boxes = document.querySelectorAll(".box");

const currentDate = new Date();
const currentDayOfMonth = currentDate.getDate(); 
const currentMonth = currentDate.getMonth();

//set progressbar on load
const progressvalue = localStorage.getItem("progresslocal");
const progressbar = document.getElementById("progress");
const initialProgress = parseInt(localStorage.getItem("progresslocal")) || 0;
progressbar.style.width = `${initialProgress}%`;

//set progresstext on load
const progresstext = document.getElementById("progresstext");
progresstext.querySelector("p").textContent = progressvalue + " / "

//
setprogressbartext();
updateprogress(0);
if(!userSetting){}
else
{
    if (distance == 200) {
        for(let key in secrets)
        {
          secrets[key] *= 2;
        }
    }
}

// Loop through each box
boxes.forEach((box) => {
    const boxId = `box${box.dataset.id}`; // Use data-id to create a unique key for each box

    // Check if the box was previously opened
    if (localStorage.getItem(boxId) == "true") {
        box.style.backgroundColor = "rgb(167, 139, 113)"; 
        const secretValue = secrets[box.dataset.id]; 
        box.querySelector("p").textContent = secretValue + " km";
    }
    else if(currentDayOfMonth > box.dataset.id)
    {
        box.style.border = "3px solid red";
    }

    if(currentDayOfMonth == box.dataset.id)
    {
        //current day glow
        console.log(box.dataset.id);
        box.style.border = "3px solid #5ac257";
    }

    // Add click event listener
    box.addEventListener("click", () => {
        if (localStorage.getItem(boxId) !== "true" && currentDayOfMonth >= box.dataset.id && currentMonth == 11) {
            localStorage.setItem(boxId, "true"); 
            box.style.backgroundColor = "rgb(167, 139, 113)"; 
            const secretValue = secrets[box.dataset.id]; 
            box.querySelector("p").textContent = secretValue + " km";
            updateprogress(secretValue);
            if(box.dataset.id != currentDayOfMonth)
            {
                box.style.border = "1px solid black";
            }
        }
    });
});

// Select button to reset all boxes
const resetBox = document.getElementById("reset"); 

/*resetBox.addEventListener("click", () => {
    // Loop through all boxes and reset their state
    boxes.forEach((box) => {
        const boxId = `box${box.dataset.id}`;
        localStorage.setItem(boxId, "false"); 
        box.style.backgroundColor = "rgb(148, 113, 81)"; 
        localStorage.setItem("progresslocal", 0);
        localStorage.removeItem('userSetting');
        location.reload(); 
    });
});*/

function updateprogress(value){
    let progress = parseInt(localStorage.getItem("progresslocal")) || 0;
    let distance = parseInt(localStorage.getItem("distancelocal")) || 0;
    progress += value;
    localStorage.setItem("progresslocal", progress);
    if (distance !== 0) {
        progress = progress / (distance / 100);
    }
    
    progressbar.style.width =`${progress}%`; 
    setprogressbartext();
}

function setprogressbartext(){
    let distance = parseInt(localStorage.getItem("distancelocal")) || 0;
    let progress = parseInt(localStorage.getItem("progresslocal")) || 0;
    progresstext.querySelector("p").textContent = `${progress} / ${distance} km`;
}

