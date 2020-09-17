import styles from '../styles/Home.module.css';
import { executeApiCall } from '../utils/api';

class Home extends React.Component {  

  render() {
    return (
      <div className={styles.container}>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Demo
          </h1>

          <p className={styles.description}>
            Append any product url-key in the url (without trailing /p) and hit enter to load product page
          </p>
        </main>
      </div>
    )
  }
}

export default Home;