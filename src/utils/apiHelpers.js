// Function to get a session token
export async function getSessionToken() {
  let tokenUrl = 'https://opentdb.com/api_token.php?command=request';

  try {
    const response = await fetch(tokenUrl);
    const data = await response.json();
    if (data.response_code === 0) {
      return data.token;
    } else {
      throw new Error('Failed to obtain session token.');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Function to reset the session token
export async function resetSessionToken(token) {
  let resetUrl = `https://opentdb.com/api_token.php?command=reset&token=${token}`;

  try {
    const response = await fetch(resetUrl);
    const data = await response.json();
    console.log(data); // Handle the response data if needed
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Function to fetch quiz questions
export async function fetchQuizQuestions() {
  try {
    let token = await getSessionToken();
    let apiUrl = `https://opentdb.com/api.php?amount=10&category=29&difficulty=easy&type=multiple&token=${token}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}