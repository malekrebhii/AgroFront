import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { agrochain_addr } from './data';
const Web3 = require('web3');
const web3 = new Web3(new Web3(window.ethereum));
const { abi } = require('../artifacts/agrochain.json');


function Farmers() {

    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [location, setLoc] = useState("");
    const [crop, setCrop] = useState("");
    const [quant, setQuantity] = useState(0);
    const [exp, setExp] = useState(0);
    const [contact, setContact] = useState(0);
    const [MyContract, setContract] = useState(undefined);
    const [account, setAccount] = useState("");

    
    useEffect(async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        console.log('Account',accounts[0]);
        let c = new web3.eth.Contract(abi, agrochain_addr, {
            from: account
        });
        setContract(c);

    }, []);

    // const getProducts = () => {
    //     MyContract.methods.getproduce(account).call().then(setProducts).then(console.log(products));
    // }
    const saveProduct = () => {
        console.log(account)
        MyContract.methods.Produce(name, location, crop, contact, quant, exp).send({from :account});
    }


    const updateName = (e) => {
        setName(e.target.value);
    }
    const updateLocation = (e) => {
        setLoc(e.target.value);
    }
    const updateCrop = (e) => {
        setCrop(e.target.value);
    }
    const updateQuantity = (e) => {
        setQuantity(e.target.value);
    }
    const updateExpiration = (e) => {
        setExp(e.target.value);
    }

    const updateContact = (e) => {
        setContact(e.target.value);

    }


    return (
        <div className="styling">

            <Form>
                <b>New Product Form</b>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" onChange={(e) => updateName(e)} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" placeholder="Location" onChange={(e) => updateLocation(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Crop</Form.Label>
                    <Form.Control type="text" placeholder="crop" onChange={(e) => updateCrop(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control type="text" placeholder="tel" onChange={(e) => updateContact(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="text" placeholder="quantity" onChange={(e) => updateQuantity(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>price</Form.Label>
                    <Form.Control type="text" placeholder="price" onChange={(e) => updateExpiration(e)} />
                </Form.Group>
                <Button variant="primary" onClick={() => saveProduct()}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default Farmers;
