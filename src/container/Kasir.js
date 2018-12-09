import React, { Component } from 'react';
import { Table, Row, Col, Button, Form, FormGroup, Label, Input, Container, Card } from 'reactstrap';

export default class Kasir extends Component {
    state = {
        data : [],
        nama : '',
        harga : 0,
        qty : 0,
        id : null,
        total : 0
    };

    handleChange = (e) => {
        this.setState ({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = () => {
        const {nama, harga, qty, data} = this.state

        let newData = {
            nama : nama,
            harga : harga,
            qty : qty
        }
        if (this.state.nama === ''){
            alert('Tidak Boleh Kosong');
        } else {
            if(this.state.id == null){
                data.push(newData)
                localStorage.setItem("data", JSON.stringify(data))
            } else {
                data.splice(this.state.id, 1, newData)
                localStorage.setItem("data", JSON.stringify(data));
            }
            this.setState ({
                data,
                nama: '',
                harga: 0,
                qty: 0,
                id: null
            })
        }
    }

    handleEdit = (index) => {
        const {data} = this.state
        const value = data[index];

        this.setState ({
            nama : value.nama,
            harga : value.harga,
            qty : value.qty,
            id : index
        })
    }

    handleDelete = (index) => {
        const data = this.state.data
        data.splice(index, 1)
        localStorage.setItem("data", JSON.stringify(data))
    }

    componentWillUpdate(nextProps, nextState) {
        const data = JSON.parse(localStorage.getItem("data"))
        let totalAmount = 0
        data.map((value, index)=>{
            totalAmount += value.harga*value.qty
        })
        nextState.total = totalAmount
    }

    componentDidMount() {
        const data = JSON.parse(localStorage.getItem("data"))
        if(data != null) {
            this.setState ({
                data
            });
        }
    }

    render() {
        return(
            <div>
                <Container>
                    <Row>
                        <Col md={8}>
                            <Row>
                                <Col style={{height:400}}>
                                    <Table striped>
                                        <thead className="text-center">
                                        <tr>
                                            <th>#</th>
                                            <th>Nama Barang</th>
                                            <th>Harga</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.data.map(
                                            (value, key)=>{
                                                return(
                                                    <tr>
                                                        <th scope="row">{key+1}</th>
                                                        <td>{value.nama}</td>
                                                        <td>{value.harga}</td>
                                                        <td>{value.qty}</td>
                                                        <td>{value.harga*value.qty}</td>
                                                        <td>
                                                            <Button color="link" onClick={() => this.handleEdit(key)}>Ubah</Button>
                                                            <Button color="danger" onClick={() => this.handleDelete(key)}>Hapus</Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Table striped>
                                        <tbody>
                                        <tr>
                                            <th scope="row">Jumlah</th>
                                            <td>{this.state.total}</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={4}>
                            <Card style={{width:300, padding:30}}>
                                <Form>
                                    <FormGroup>
                                    <Label for="nama">Nama Barang</Label>
                                    <Input type="text" name="nama" id="namaBarang" placeholder="Nama Barang" onChange={this.handleChange} value={this.state.nama}/>
                                    </FormGroup>
                                    <FormGroup>
                                    <Label for="harga">Harga</Label>
                                    <Input type="number" name="harga" id="harga" placeholder="Harga" onChange={this.handleChange} value={this.state.harga}/>
                                    </FormGroup>
                                    <FormGroup>
                                    <Label for="qty">Qty</Label>
                                    <Input type="number" name="qty" id="qty" placeholder="Qty" onChange={this.handleChange} value={this.state.qty}/>
                                    </FormGroup>
                                    <Button onClick={this.handleSubmit}>Submit</Button>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}