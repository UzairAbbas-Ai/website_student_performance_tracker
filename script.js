class Student {
    constructor(name, scores) {
        this.name = name;
        this.scores = scores;
    }

    calculateAverage() {
        return this.scores.reduce((a, b) => a + b, 0) / this.scores.length;
    }

    isPassing(passingScore = 40) {
        return this.scores.every(score => score >= passingScore);
    }
}

class PerformanceTracker {
    constructor() {
        this.students = [];
    }

    addStudent(name, scores) {
        this.students.push(new Student(name, scores));
    }

    calculateClassAverage() {
        if (this.students.length === 0) return 0;
        const totalAverage = this.students
            .map(student => student.calculateAverage())
            .reduce((a, b) => a + b, 0);
        return totalAverage / this.students.length;
    }

    displayStudents() {
        const performanceDiv = document.getElementById('student-performance');
        performanceDiv.innerHTML = '';

        if (this.students.length === 0) {
            performanceDiv.innerHTML = '<p>No students added yet.</p>';
            return;
        }

        this.students.forEach(student => {
            const average = student.calculateAverage().toFixed(2);
            const status = student.isPassing() ? 'Passing' : 'Needs Improvement';
            performanceDiv.innerHTML += `
                <p>
                    <strong>${student.name}</strong> - Average: ${average}, Status: ${status}
                </p>`;
        });
    }
}

const tracker = new PerformanceTracker();

document.getElementById('student-form').addEventListener('submit', event => {
    event.preventDefault();

    const name = document.getElementById('student-name').value;
    const math = parseInt(document.getElementById('math-score').value);
    const science = parseInt(document.getElementById('science-score').value);
    const english = parseInt(document.getElementById('english-score').value);

    if ([math, science, english].some(score => score < 0 || score > 100)) {
        alert('Scores must be between 0 and 100!');
        return;
    }

    tracker.addStudent(name, [math, science, english]);
    tracker.displayStudents();

    event.target.reset();
});

document.getElementById('calculate-average').addEventListener('click', () => {
    const classAverage = tracker.calculateClassAverage().toFixed(2);
    document.getElementById('class-average').textContent = `Class Average: ${classAverage}`;
});
