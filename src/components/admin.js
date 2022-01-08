import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import { agrochain_addr } from './data';

const Web3 = require('web3');
const web3 = new Web3(new Web3(window.ethereum));
const { abi } = require('../artifacts/agrochain.json');


function Admin() {

    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [MyContract, setContract] = useState(undefined);
    const [account, setAccount] = useState("");


    const _grantRole = () => {
        MyContract.methods.grantRole(role, address).send({
            from: account
        });
    }

    const updateAddress = (e) => {
        setAddress(e.target.value);
    }
    const updateRole = (e) => {
        setRole(e.target.value);
    }



    useEffect(async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        console.log(account);
        let c = new web3.eth.Contract(abi, agrochain_addr, {
            from: account
        });
        setContract(c);


    }, []);
    return (
        <div className="styling">
            <Alert variant="warning">
                <Alert.Heading>Hey, Only Admin can grant roles</Alert.Heading>
                <p>
                    Aww yeah, this are the hashes for the roles.
                    <br></br>
                    <br></br>
                    Farmer Role :0x4473bc4cca227a6bb6678e826347a766442caaa5b58eb00db63d083b4a882e69
                    <br></br>
                    Supplier Role :0xb77c7d6bf62fa24fc205955093030c58325cd2d3d35fb486ede7594fb99635f5
                    <br></br>
                    Tester Role :0xa1eec5a602ba6681850b894abe779021f2d7ff02781b32bfcefcf2143612f88b

                </p>
            </Alert>
            <Form>
                <b>Grant role :</b>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="address" onChange={(e) => updateAddress(e)} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Role as Hash</Form.Label>
                    <Form.Control type="text" placeholder="role" onChange={(e) => updateRole(e)} />
                </Form.Group>
                <Button variant="primary" onClick={() => _grantRole()}>
                    Grant Role
                </Button>
            </Form>
        </div>
    );
}

export default Admin;
