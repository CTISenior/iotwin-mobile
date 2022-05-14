export const GetAllDevices = async () => {
  try {
    const devices = await fetch('http://127.0.0.1:4000/api/v1/devices');
    return devices.json;
  } catch (error) {
    console.log(error);
  }
};
export const GetAllNotification = async () => {
  try {
    const notification = await fetch(
      'http://127.0.0.1:4000/api/v1/alerts'
    );
    return await notification.json;
  } catch (err) {
    console.log(err);
  }
};
export const DeleteNotification = async (id) => {
  try {
    return await fetch(`http://127.0.0.1:4000/api/v1/alerts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });
  } catch (err) {
    console.log(err);
  }
};
