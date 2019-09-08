import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import { connect } from "react-redux";

import { addBooks } from "../actions/itemActions";

import PropTypes from "prop-types";

class BookModal extends Component {
  state = {
    modal: false,
    name: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newBook = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      units: this.state.units
    };
    this.props.addBooks(newBook);

    this.toggle();
  };

  //Add item via addItem action

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Sell Book
          </Button>
        ) : (
          <h4 className="mb-3 ml-4"> Please Login to Sell/Purchase Books</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Sell Book</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Book</Label>
                <Input
                  type="text"
                  name="name"
                  id="book"
                  placeholder="Add Shopping item"
                  onChange={this.onChange}
                />
                <Label for="item">Description</Label>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Description"
                  onChange={this.onChange}
                />
                <Label for="item">Price</Label>
                <Input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="Price"
                  onChange={this.onChange}
                />
                <Label for="item">Units</Label>
                <Input
                  type="text"
                  name="units"
                  id="units"
                  placeholder="Units"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Book
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  book: state.book,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addBooks }
)(BookModal);
