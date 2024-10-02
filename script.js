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
document.querySelectorAll('.emoji').forEach(emoji => {
  emoji.addEventListener('click', function() {
      const ratingValue = this.getAttribute('data-value');
      const message = getRatingMessage(ratingValue);
      document.getElementById('rating-message').textContent = message;

      // Optionally, you can disable the emojis after selection
      document.querySelectorAll('.emoji').forEach(e => e.style.pointerEvents = 'none');
  });
});

function getRatingMessage(value) {
  switch(value) {
      case '1':
          return "We're sorry to hear that!";
      case '2':
          return "Thanks for your feedback!";
      case '3':
          return "We appreciate your input!";
      case '4':
          return "Glad you liked it!";
      case '5':
          return "Thank you for the great rating!";
      default:
          return "";
  }
}
