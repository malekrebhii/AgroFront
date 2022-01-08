import React from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

function Home() {

    return (
        <div className='styling'>
            <Alert variant="success">
                <Alert.Heading>Hey, nice to see you</Alert.Heading>
                <p>
                    Aww yeah, you have successfully stumbled at the best Agrochain in the whole Web.
                    Oh Sorry i meant Web 3.0 , Here application are crafted in a decentralized fashion
                    and are called Dapps.
                </p>
                <hr />
                <p className="mb-0">
                    This Dapp is meant to keep track of the whole supply chain in the agriculture field.
                    <hr />
                    Please Change your network to Ropsten Testnet before using this Dapp.
                </p>
                <hr />
                If you have no ETH in your wallet click here so we redirect you to a faucet.
                <br></br> <br></br>
                <Button variant="primary" href="https://faucet.ropsten.be/">Faucet
                </Button>{' '}
            </Alert>
        </div>);
}

export default Home;
