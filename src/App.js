import React from 'react';
import axios from 'axios'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  retorno: "", response: "" };
    
    this.token = '7a81f4db-e54b-31b8-be5b-e10ba611c601';
 
    this.apiRouter = axios.create({
      baseURL: "https://gateway.dmcardapi.com.br/WebDMCardOpenAPI/v1.02/api/Ura",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  get_token = () => {
   var apiRouterToken = axios.create({
      baseURL: "https://gateway.api.cloud.wso2.com/token",
      
    });
    apiRouterToken.defaults.headers.common['Authorization'] = 'Bearer UVIyR0I2ZFJQVVlWMHd5TkJLclFBT0JJUElZYTpxMVVaRExHOGc1MUs1TUN1SXNrN0lKNFpEV2th';
    apiRouterToken.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    apiRouterToken.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    apiRouterToken.defaults.body = { grant_type: "client_credentials" };
    
    apiRouterToken.post("")
    .then((res) => {
      console.log(res);
      console.log(res.data);
      this.token = res.data.access_token
    })
  }

  get_Estabelecimento = () => {
    this.get_token();

    this.apiRouter.get('/GetEstabelecimento/1734266800')
    .then((res) => {
    this.setState({ isLoaded: true, response: res.config, retorno: res.data})
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  componentDidMount () {
    this.get_Estabelecimento();
    this.interval = setInterval(this.get_Estabelecimento, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render () {
    return (
      <div>
        {console.log(this.state)}
        {JSON.stringify(this.state.retorno, null, 2)}
        <br /> <br />
        {JSON.stringify(this.state.response, null, 2) }
      </div>
    );
  }
}

export default App;
