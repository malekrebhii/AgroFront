import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { agrochain_addr } from './data';
import QRCode from "react-qr-code";

const Web3 = require('web3');
const web3 = new Web3(new Web3(window.ethereum));
const { abi } = require('../artifacts/agrochain.json');


function Testers() {

    const [products, setProducts] = useState([]);
    const [farmers, setFarmers] = useState([]);
    const [farmer, setFarmer] = useState();
    const [MyContract, setContract] = useState(undefined);
    const [account, setAccount] = useState("");



    useEffect( async () => {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
            console.log('Account', accounts[0]);
            let c =  new web3.eth.Contract(abi, agrochain_addr, {
                from: account
            });
            setContract(c);
            try {
    
                MyContract.methods.getFarmers().call().then(setFarmers).then(console.log(farmers));
        
            }
            catch{
        
            }

    }, []);

    const fetchData = (f) => {
        console.log('addr',f)
        setFarmer(f)
        try {
            MyContract.methods.getproduce(f).call().then(setProducts).then(console.log(products))
        }
        catch{
    
        }
    }
    const approve = (id,f) => {
            MyContract.methods.Approve(id,f).send({
                from: account
            }).then(console.log('ok'));
    }
    
    const refresh = () => {
        try {
            MyContract.methods.getFarmers().call().then(setFarmers).then(console.log(farmers));
        }
        catch{
    
        }
    }

    return (
        <div className="styling">
        <Button variant="primary" onClick={() => refresh() }>Show farmers</Button>
        <br></br>
        <br></br>
        <div>Choose a Farmer :</div>

            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    {farmers.map(f => (
                        <div>
                            <Card.Title>{f}</Card.Title>
                            <Button variant="warning" onClick={() => fetchData(f) }>fetch products</Button>
                        </div>
                    ))}
                </Card.Body>
            </Card>

        <div> Pending Products :</div>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    {products.map( p => (
                        <div key={p}>
                        { (p[7] == 1 ) ?  // not approved yet
                            <div>
                            <Card.Title>{p[1]}</Card.Title>
                            <Card.Text>location :{p[2]}</Card.Text>
                            <Card.Text>crop :{p[3]}</Card.Text>
                            <Card.Text>contacts :{p[4]}</Card.Text>
                            <Card.Text>Quantity :{p[5]}</Card.Text>
                            <Card.Text>price :{p[6]}</Card.Text>
                            <Card.Text>State :{p[7]}</Card.Text>
                            <QRCode size ='100' value={p[0]+':'+p[1]+':'+p[2]+':'+p[3]+':'+p[4]+':'+p[5]+':'+p[6]+':'+p[7]+':'+p[8]+':'+p[9]} />
                            <br></br>
                            <br></br>
                            <Button variant="success" onClick={() => approve(p[0],farmer) }>Approve</Button>
                            </div>
                            :null}
                        </div>
                    ))}
                </Card.Body>
            </Card> 

        </div>
    );
}

export default Testers;
