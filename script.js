const imageInput = document.getElementById('image-input');  
const uploadButton = document.getElementById('upload-button');  
const classificationResult = document.getElementById('classification-result');  
const disposalInformation = document.getElementById('disposal-information');  
  
uploadButton.addEventListener('click', () => {  
  const image = imageInput.files[0];  
  const formData = new FormData();  
  formData.append('image', image);  
  
  fetch('/classify', {  
   method: 'POST',  
   body: formData  
  })  
  .then(response => response.json())  
  .then(data => {  
   classificationResult.textContent = data.classification;  
   disposalInformation.textContent = data.disposalInformation;  
  })  
  .catch(error => console.error(error));  
});
