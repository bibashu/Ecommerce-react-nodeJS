import axios from "axios";

const BASE_URL = "http://localhost:5000/products/";

export class productAPI {
  static async fetchALL() {
    return (await axios.get(`${BASE_URL}`)).data;
  }
//   static async fetchByID(productId) {
//     return (await axios.get(`${BASE_URL}/${productId}`)).data;
//   }
}
