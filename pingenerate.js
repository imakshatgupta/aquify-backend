function generatePin() {
    const pinLength = 6; 
    let pin = '';
    for (let i = 0; i < pinLength; i++) {
      pin += Math.floor(Math.random() * 10);
    }
    return pin;
  }