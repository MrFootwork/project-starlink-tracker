import './LandingPage.css';
import {Link} from 'react-router-dom'

function LandingPage() {
    return ( 
        <div className="LandingPage">
            <div className='container'>
                <h1>STARLINK TRACKER</h1>
                <p>Discover the ever-changing dance of Starlink satellites as they orbit above us. Stay connected to the future, one orbit at a time.</p>
                <Link to='/login'>
                    <button>Let's Explore the Sky Together</button>
                </Link>
            </div>
        </div>
     );
}

export default LandingPage;