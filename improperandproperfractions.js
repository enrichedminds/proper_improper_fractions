function visualizeFraction() {
    const visualization = document.getElementById('visualization');
    const denominator = parseInt(document.getElementById('denominator').value, 10);
    const numerator = parseInt(document.getElementById('numerator').value, 10);
    const type = document.getElementById('division-type').value;

    visualization.innerHTML = ''; // Clear previous visualization

    // Calculations
    const wholeParts = Math.floor(numerator / denominator); // Quotient: whole parts
    const remaining = numerator % denominator; // Remainder: proper fraction

    // Check if the fraction exceeds the limit of 6 wholes
    if (wholeParts > 6) {
        const fractionMessage = document.getElementById('fraction-message');
        fractionMessage.innerHTML = `
            The fraction represented is 
            <div class="fraction">
                <div class="numerator">${numerator}</div>
                <div class="denominator">${denominator}</div>
            </div>
            <br>
            <span style="color: red;">Note: Only up to 6 whole rectangles are represented. Please decrease the numerator's whole number.</span>`;
        return; // Do not draw anything if it exceeds the limit
    }

    // If the fraction is proper, only display the proper fraction with additional details
    if (numerator < denominator) {
        const container = createRectangle(numerator, denominator, type);
        visualization.appendChild(container);

        const fractionMessage = document.getElementById('fraction-message');
        fractionMessage.innerHTML = `
            The fraction represented is 
            <div class="fraction">
                <div class="numerator">${numerator}</div>
                <div class="denominator">${denominator}</div>
            </div>
            <br>
            The rectangle is represented by the proper fraction 
            <span class="fraction-inline">
                <div class="numerator">${numerator}</div>
                <div class="denominator">${denominator}</div>
            </span>
            <br>
            The proper fraction indicates that the rectangle is divided into ${denominator} equal parts, as per the denominator, and ${numerator} of these are selected, as indicated by the numerator.`;
        return;
    }

    // Draw up to 6 whole rectangles for improper fractions
    for (let i = 0; i < wholeParts; i++) {
        const container = createRectangle(denominator, denominator, type); // 1 whole
        visualization.appendChild(container);
    }

    // Draw proper fraction if there is a remainder
    if (remaining > 0) {
        const container = createRectangle(remaining, denominator, type); // Proper fraction
        visualization.appendChild(container);
    }

    // Build the main message for improper fraction
    const fractionMessage = document.getElementById('fraction-message');
    fractionMessage.innerHTML = `
        The fraction represented is 
        <div class="fraction">
            <div class="numerator">${numerator}</div>
            <div class="denominator">${denominator}</div>
        </div>
        <br>
        This includes ${wholeParts} ${wholeParts === 1 ? "whole rectangle" : "whole rectangles"}${
        remaining > 0
            ? ` and one last rectangle represented by the proper fraction <span class="fraction-inline"><div class="numerator">${remaining}</div><div class="denominator">${denominator}</div></span>`
            : ''
    }`;
}

function createRectangle(coloredParts, totalParts, type) {
    const container = document.createElement('div');
    container.classList.add('rectangle-container');
    container.style.display = 'grid';
    container.style.width = '400px';
    container.style.height = '200px';
    container.style.border = '2px solid black';

    if (type === 'rows') {
        container.style.gridTemplateColumns = '1fr'; // One column
        container.style.gridTemplateRows = `repeat(${totalParts}, 1fr)`; // Equal divisions in rows
    } else if (type === 'columns') {
        container.style.gridTemplateRows = '1fr'; // One row
        container.style.gridTemplateColumns = `repeat(${totalParts}, 1fr)`; // Equal divisions in columns
    }

    // Create segments
    for (let i = 0; i < totalParts; i++) {
        const segment = document.createElement('div');
        segment.classList.add('segment');

        // Color based on the specified amount
        if (i < coloredParts) {
            segment.style.backgroundColor = '#008cff'; // Colored
        } else {
            segment.style.backgroundColor = '#fff'; // White
        }

        container.appendChild(segment);
    }

    return container;
}

// Show initial visualization with default values (3/2)
window.onload = () => {
    document.getElementById('denominator').value = 2; // Default denominator
    document.getElementById('numerator').value = 3; // Default numerator
    visualizeFraction();
};
