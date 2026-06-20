/**
 * Helper function to categorize UV Index levels.
 * Returns an object containing the index, a descriptive condition, and a hex color code.
 */
function uvhelper(uvIndex) {
    // Check if input is missing or invalid
    if (uvIndex === null || uvIndex === undefined) {
        return {
            uvIndex: "N/A",
            condition: "Something went wrong",
            color: "#e74c3c" // Red
        };
    }

    // Low UV Range (0-2)
    if (uvIndex >= 0 && uvIndex <= 2) {
        return {
            uvIndex: uvIndex,
            condition: "Low: Safe to stay outside.",
            color: "#2ecc71"
        };
    } 
    // Moderate UV Range (3-5)
    else if (uvIndex <= 5) {
        return {
            uvIndex: uvIndex,
            condition: "Moderate: Wear a hat and sunscreen.",
            color: "#f1c40f"
        };
    } 
    // High UV Range (6-7)
    else if (uvIndex <= 7) {
        return {
            uvIndex: uvIndex,
            condition: "High: Seek shade and wear protection.",
            color: "#e67e22"
        };
    } 
    // Very High UV Range (8-10)
    else if (uvIndex <= 10) {
        return {
            uvIndex: uvIndex,
            condition: "Very High: Avoid being outside at noon.",
            color: "#e74c3c"
        };
    } 
    // Extreme UV Range (11+)
    else {
        return {
            uvIndex: uvIndex,
            condition: "Extreme: High risk of harm. Stay indoors!",
            color: "#8e44ad"
        };
    }
}

export default uvhelper;