import axios from "axios";

const BASE_URL_PARTENAIRE = "http://localhost:5000/partenaire/";

export class partenaireAPI {
  static async fetchALL() {
    return (await axios.get(`${BASE_URL_PARTENAIRE}`)).data;
  }

}
