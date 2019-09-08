import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getBooks, deleteBooks } from "../actions/itemActions";
import PropTypes from "prop-types";
class ShoppingList extends Component {
  static propTypes = {
    getBooks: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };
  componentDidMount() {
    this.props.getBooks();
  }
  onDeleteClick = id => {
    this.props.deleteBooks(id);
  };

  render() {
    const { books } = this.props.book;

    return (
      <Container>
        <ListGroup>
          <TransitionGroup
            className="shopping-list"
            style={{ marginTop: "0.5rem" }}
          >
            {books.map(({ _id, name, description, units, price }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {units > 0 && this.props.isAuthenticated ? (
                    <Button
                      className="btn align-right remove-btn "
                      color="danger"
                      style={{ marginLeft: "50rem ", marginTop: "0.5rem" }}
                      size="sm"
                    >
                      Purchase Book
                    </Button>
                  ) : null}
                  <p style={{ marginTop: "0.5rem" }}>
                    <strong>Name: {name}</strong>
                  </p>
                  <p> Description: {description}</p>
                  <p>Price: {price}</p>
                  <p>Units Left: {units}</p>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  book: state.book,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { getBooks, deleteBooks }
)(ShoppingList);
