import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css';
import { executeApiCall } from '../utils/api';

class Home extends React.Component {  

  constructor(props) {
    super(props);
    this.state = {
      sizeLoaded: false,
      optionLoaded: false,
      addonLoaded: false,
      invalid: false,
    };
  }

  static async getInitialProps({ query }) {
    const productResponse = await executeApiCall('products/search' , {"url_key":query.pkey});    
    return { pData: productResponse || {} };
  }  
  async componentDidMount() {
    window.addEventListener('load', this.handleWindowLoad);
    if(this.props.pData.sku) {
      const responses = await Promise.all([
        executeApiCall('products/productsize' , {"sku":this.props.pData.sku}),
        executeApiCall('products/productalloptions' , {"sku":this.props.pData.sku})
      ]);
      this.setState({
        'sizeLoaded': (responses[0]==false ? 2 : 1),
        'optionLoaded': (responses[1]==false ? 2 : 1)
      });
    } else {
      this.setState({
        'invalid': true
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.handleWindowLoad);
  }

  handleWindowLoad = async () => {
    if(this.props.pData.sku) {    
      const response = await executeApiCall('products/productaddons' , {"sku":this.props.pData.sku});
      this.setState({
        'addonLoaded': (response==false ? 2 : 1)
      }); 
    }
  };  

  render() {
    return (
      <div className={styles.container}>

        <main className={styles.main}>
          {this.state.invalid ? (
            <p className={styles.description}>
              Invalid Product Url
            </p>
          ):(
            <div>
              <h1 className={styles.title}>
                {this.props.pData.name}
              </h1>              
              <p className={styles.description}>
                Size: {this.state.sizeLoaded ? (this.state.sizeLoaded==1 ? 'Loaded':'API error') : 'Loading...'}
              </p>
              <p className={styles.description}>
                Option: {this.state.optionLoaded ? (this.state.optionLoaded==1 ? 'Loaded':'API error') : 'Loading...'}
              </p>
              <p className={styles.description}>
                Addon: {this.state.addonLoaded ? (this.state.addonLoaded==1 ? 'Loaded':'API error') : 'Loading...'}
              </p>
            </div>
          )}
        </main>
      </div>
    )
  }
}

export default Home;