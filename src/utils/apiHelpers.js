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

// Call this function when you want to reset the session token
async function resetToken() {
  try {
    await resetSessionToken('4589e514b009a90070ba27bff6f66a81463144ee7b2c2f6a0e744134e1b587d9');
    console.log('Token reset successful');
  } catch (error) {
    console.error('Error resetting token:', error);
  }
}

resetToken();