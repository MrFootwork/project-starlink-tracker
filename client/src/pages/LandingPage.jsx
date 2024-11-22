import './LandingPage.css';
import nightSkyBg from '../assets/Night-Sky-wp.png';

function LandingPage() {
    return ( 
        <div className="LandingPage" style={{
            // backgroundImage: `url(${nightSkyBg})`,
        }}>
            <h1>STARLINK TRACKER</h1>
            <p>Discover the ever-changing dance of Starlink satellites as they orbit above us. Stay connected to the future, one orbit at a time.</p>
            <button>Let's Explore the Sky Together</button>
        </div>
     );
}

export default LandingPage;