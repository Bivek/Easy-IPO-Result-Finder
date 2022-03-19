console.log("I am a content script");
const ipoResult = (e) => {
    let containerDiv = document.getElementById('results')
    containerDiv.innerHTML = ""
    let selectedValue = e.target.value; 
    console.log(`You selected  with value ${selectedValue}`);
    // Change the profiles object below based on profile you would love to maintain
    let profiles = [
        {
          name: 'Ram',
          boid: '123456789123456'
        },
        {
          name: 'Shyam',
          boid: '9876543211234567',
        },
        {
          name: 'Hari',
          boid: '4563217896541478'
        }
    ]

      profiles.forEach((profile)=>{
        let body = {
            companyShareId: `${selectedValue}`,
            boid: `${profile.boid}`
        }     
        fetch("https://iporesult.cdsc.com.np/result/result/check", {
          "headers": {
            "content-type": "application/json"
          },
          "body": JSON.stringify(body),
          "method": "POST"
        })
        .then(response => response.json())
        .then(data => {
            console.log(`${profile.name}:: ${data.message}`)
            containerDiv.innerHTML += `<strong>${profile.name}</strong>: ${data.message} <br />`
        })
        .catch((error) => {
          console.log(error)
        });
      });
  }

  let shareList = document.getElementById('companyShare');
  shareList.addEventListener('change', ipoResult)
  let containerDiv = document.getElementById('results');
  if(containerDiv === null) {
     containerDiv = document.createElement("div");
     containerDiv.id = "results"
     containerDiv.style.backgroundColor = 'orange'
     containerDiv.style.fontSize = '4 px'
     shareList.parentNode.insertBefore(containerDiv, shareList)
  }

