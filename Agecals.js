const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function ageCalculate() {
    let today = new Date();
    let inputDate = new Date(document.getElementById("date-input").value);
    let birthMonth, birthDate, birthYear, birthHours, birthMinutes, birthSeconds;
    let birthDetails = {
        date: inputDate.getDate(),
        month: inputDate.getMonth() + 1,
        year: inputDate.getFullYear()
    };
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;
    let currentDate = today.getDate();
    let currentHours = today.getHours();
    let currentMinutes = today.getMinutes();
    let currentSeconds = today.getSeconds();

    leapChecker(currentYear);

    if (
        birthDetails.year > currentYear ||
        (birthDetails.month > currentMonth && birthDetails.year == currentYear) ||
        (birthDetails.date > currentDate && birthDetails.month == currentMonth && birthDetails.year == currentYear)
    ) {
        alert("Not Born Yet");
        displayResult("-", "-", "-", "-", "-", "-");
        return;
    }

    birthYear = currentYear - birthDetails.year;
    if (currentMonth >= birthDetails.month) {
        birthMonth = currentMonth - birthDetails.month;
    } else {
        birthYear--;
        birthMonth = 12 + currentMonth - birthDetails.month;
    }

    if (currentDate >= birthDetails.date) {
        birthDate = currentDate - birthDetails.date;
    } else {
        birthMonth--;
        let days = months[currentMonth - 2];
        birthDate = days + currentDate - birthDetails.date;
        if (birthMonth < 0) {
            birthMonth = 11;
            birthYear--;
        }
    }

    let birthTime = inputDate.getTime();
    let currentTime = today.getTime();
    let timeDifference = Math.abs(currentTime - birthTime);

    birthHours = Math.floor(timeDifference / (1000 * 60 * 60));
    birthMinutes = Math.floor(timeDifference / (1000 * 60));
    birthSeconds = Math.floor(timeDifference / 1000);

    displayResult(birthDate, birthMonth, birthYear, birthHours, birthMinutes, birthSeconds);
}

function displayResult(bDate, bMonth, bYear, bHours, bMinutes, bSeconds) {
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bDate;
    document.getElementById("hours").textContent = bHours;
    document.getElementById("minutes").textContent = bMinutes;
    document.getElementById("seconds").textContent = bSeconds;
}

function leapChecker(year) {
    if (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)) {
        months[1] = 29;
    } else {
        months[1] = 28;
    }
}
