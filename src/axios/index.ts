import axios from 'axios';

export default function getProfiles() {
  return axios.get('https://grafico-no-mapa-api.herokuapp.com/profile')
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
}
