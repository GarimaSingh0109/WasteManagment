document.getElementById('footprintForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const wasteAmount = parseFloat(document.getElementById('wasteAmount').value);
    const recycledAmount = parseFloat(document.getElementById('recycledAmount').value);

    // Calculate carbon footprint based on a simple formula
    const carbonFootprint = (wasteAmount - recycledAmount) * 0.5; // Example factor
    const resultDiv = document.getElementById('result');
    resultDiv.classList.add('fade-in'); // Add class for animation
    resultDiv.innerHTML = `Your estimated carbon footprint is <strong>${carbonFootprint.toFixed(2)} kg CO₂/week</strong>.`;
    
    // Provide tips based on waste habits
    const tipsDiv = document.getElementById('tips');
    tipsDiv.classList.add('fade-in'); // Add class for animation
    tipsDiv.innerHTML = generateTips(carbonFootprint);
});

function generateTips(footprint) {
    if (footprint < 5) {
        return '<i class="fas fa-leaf"></i> Great job! Keep up the eco-friendly habits!';
    } else if (footprint < 10) {
        return '<i class="fas fa-recycle"></i> Consider reducing your waste by composting and recycling more.';
    } else {
        return '<i class="fas fa-trash"></i> Try to minimize single-use plastics and opt for reusable items.';
    }
}
