import { RestCountry } from "../entities/RestCountry";

//Simple class to organize the business logic, only gets all the countries
//If the application would have been more complex, more API calls would've been made by continent
export class DataBLL {

    //Note: filter response does not work when the application was built
    //https://restcountries.com/v3.1/all?fields=name,capital,currencies
    private API_URL: string = 'https://restcountries.com/v3.1/all';
  
    public async GetData(): Promise<RestCountry[]> {
  
      try {
        let data = await fetch(this.API_URL)
          .then(response => response.json());
        return data;
      }
      catch (err) {
        console.error("DataBLL.GetData: Error fetching API data:");
        console.error(err);
        throw err;
      }
    }
  }