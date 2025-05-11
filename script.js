// Store questions and answers
const questions = [
    {
        question: "Will you spend the rest of your life with me, filled with love, devotion, and togetherness? (Yes/No)",
        answer: "",
        type: "textarea"
    },
    {
        question: "Would you be ready to walk this path of Krishna consciousness together with me, step by step? (Yes/No)",
        answer: "",
        type: "textarea"
    },
    {
        question: "Are you open to growing spiritually — not just for yourself but as a couple? (Yes/No)",
        answer: "",
        type: "textarea"
    },
    {
        question: "Do you believe loyalty and spiritual connection are more important than just physical attraction? (Yes/No)",
        answer: "",
        type: "textarea"
    },
    {
        question: "Do you believe in being completely transparent and truthful in a relationship, even about the past? (Yes/No)",
        answer: "",
        type: "textarea"
    },
    {
        question: "Do you believe in saving emotional and physical intimacy for someone who truly values your soul? (Yes/No)",
        answer: "",
        type: "textarea"
    },
    {
        question: "Would you promise to choose love and understanding over ego in our journey? (Yes/No)",
        answer: "",
        type: "textarea"
    },
    {
        question: "If someday we face challenges, what would help you stay grounded with me? (Short Answers)",
        answer: "",
        type: "textarea"
    },
    {
        question: "What would make you feel deeply loved, every single day? (Short Answers)",
        answer: "",
        type: "textarea"
    },
    {
        question: "If someone asked you about your past, would you prefer honesty even if it’s tough to hear? (Short Answers)",
        answer: "",
        type: "textarea"
    },
    {
        question: "Has your heart ever beaten for someone the way it does now for someone special? (Short Answers)",
        answer: "",
        type: "textarea"
    },
    {
        question: "What does a 'pure relationship' mean to you personally? (Short Answers)",
        answer: "",
        type: "textarea"
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];

// const backgroundContainer = document.querySelector('.krishna-background');
// if (backgroundContainer) {
//     let text = "Jai Shree Krishna ";
//     let repeatedText = "";
//     for (let i = 0; i < 1000; i++) {
//         repeatedText += text;
//     }
//     backgroundContainer.innerText = repeatedText;
// }

// Function to display the current question
function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    const currentQuestion = questions[currentQuestionIndex];

    let inputField = `<textarea id="user-answer" placeholder="Your answer" onkeydown="handleKeyPress(event)"></textarea>`;

    questionContainer.innerHTML = `
        <p class="question">${currentQuestion.question}</p>
        ${inputField}
    `;
    // Apply styles directly to the textarea element after it's inserted
    const textarea = document.getElementById('user-answer');
    if (textarea) {
        textarea.style.resize = 'none';
        textarea.style.border = '2px solid #ccc';
        textarea.style.borderRadius = '8px';
        textarea.style.fontSize = '16px';
        textarea.style.padding = '12px';
        textarea.style.marginTop = '10px';
        textarea.style.width = '100%';
        textarea.style.outline = 'none';
    }


    document.getElementById('feedback-container').innerHTML = '';
    document.getElementById('next-btn').style.display = 'none'; // Hide the Next button until validated
    document.getElementById('submit-btn').style.display = 'none'; // Hide the Submit button
}

// Function to handle the answer submission
function storeAnswer() {
    const userAnswer = document.getElementById('user-answer').value.trim();
    
    // Ensure user provides an answer
    if (userAnswer === "") {
        alert("Please provide an answer before moving on.");
        return; // Prevent further actions if the answer is empty
    }

    // Store the user's answer
    userAnswers[currentQuestionIndex] = userAnswer;

    // Enable the "Next" button after valid input
    document.getElementById('next-btn').style.display = 'inline-block';
    document.getElementById('user-answer').disabled = true; // Disable the input field after answer
}

// Handle the Enter key press to submit the answer
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        storeAnswer(); // Store the answer when Enter is pressed
    }
}

// Move to the next question after clicking the "Next Question" button
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        // All questions answered, show the Submit button
        document.getElementById('question-container').innerHTML = '<p class="congratulations" style="text-align: center; font-size: 12px; font-weight: bold;">Congratulations, you completed the quiz! <br> Please click on submit button <br>Thank You</p>';
        const congratsMessage = document.querySelector('.congratulations');
        document.getElementById('next-btn').style.display = 'none'; // Hide the Next button
        document.getElementById('submit-btn').style.display = 'inline-block'; // Show the Submit button
    }
}

// Function to send email with answers using EmailJS
// function submitQuiz() {
//     const emailParams = {
//         user_answers: JSON.stringify(userAnswers), // Convert answers array to string
//         questions: JSON.stringify(questions), // Store question text as well
//         email: 'rtcodex@gmail.com' // Replace with your recipient email or dynamic data
//     };

//     emailjs.send('service_2zl3not', 'template_6pejiek', emailParams) // Replace with your EmailJS service and template IDs
//         .then(function(response) {
//             console.log('Email sent successfully', response);
//         }, function(error) {
//             console.error('Error sending email:', error);
//         });
// }

// function submitQuiz() {
//     let formattedQA = "<table border='1' style='border-collapse: collapse;'>";
//     formattedQA += "<tr><th>Question</th><th>Answer</th></tr>";

//     questions.forEach((q, index) => {
//         if (userAnswers[index]) {
//             formattedQA += `
//                 <tr>
//                     <td style="padding: 8px;">${q.question}</td>
//                     <td style="padding: 8px;">${userAnswers[index]}</td>
//                 </tr>
//             `;
//         }
//     });

//     formattedQA += "</table>";

//     const emailParams = {
//         user_answers: formattedQA,
//         email: 'rtcodex@gmail.com' // Update as needed
//     };

//     emailjs.send('service_2zl3not', 'template_6pejiek', emailParams)
//         .then(function(response) {
//             console.log('Email sent successfully', response);
//         }, function(error) {
//             console.error('Error sending email:', error);
//         });
// }

function submitQuiz() {
    document.getElementById('submit-btn').style.display = 'none';

    let formattedQA = "\n\n";

    questions.forEach((q, index) => {
        if (userAnswers[index]) {
            formattedQA += `Question: ${q.question}\nAnswer: ${userAnswers[index]}\n\n`;
        }
    });

    const emailParams = {
        
        user_answers: formattedQA,
        email: 'rtcodex@gmail.com' // Update as needed
    };

    emailjs.send('service_2zl3not', 'template_6pejiek', emailParams)
        .then(function(response) {
            console.log('Email sent successfully', response);
           //triggerHearts();  // Trigger heart animation after sending email
        }, function(error) {
            console.error('Error sending email:', error);
        });
}

// Function to trigger heart animation
function triggerHearts() {
    const heartContainer = document.createElement('div');
    heartContainer.classList.add('heart-container');
    document.body.appendChild(heartContainer);

    // Generate a random number of hearts (e.g., 5-10 hearts)
    const numHearts = Math.floor(Math.random() * 6) + 5;

    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Set random position for the heart
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        heart.style.left = `${randomX}px`;
        heart.style.top = `${randomY}px`;

        heartContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 1500); // Match the animation duration
    }
}

// Initialize the quiz
displayQuestion();
