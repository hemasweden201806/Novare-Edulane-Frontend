const createRoom = async () => {
  const response = await fetch('https://api.daily.co/v1/rooms/edulane', {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer 64122e159a58bfebd62cdabc4f2e80caed5686a7bb94f7269bd0aa858670eb03'
    }
  });
  const room = await response.json();
  return room;
};

export default createRoom;
