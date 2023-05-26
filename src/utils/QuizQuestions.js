export async function fetchQuizQuestions() {
  try {
    let token = "7bcba69739534b16e41f6ec038c6bedb856aea1358639d871183edf181cf285d";
    let apiUrl = `https://opentdb.com/api.php?amount=10&category=29&difficulty=easy&type=multiple&token=${token}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}  