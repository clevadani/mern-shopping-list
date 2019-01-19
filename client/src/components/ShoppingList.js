import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Input } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, addItem, deleteItem, updateItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {

  componentDidMount() {
    this.props.getItems();
  }
 
  handleDelete = id => this.props.deleteItem(id);

  handleEdit = id => this.props.updateItem(id);

  render() {
    const { items, loading } = this.props.item;
    return (
      <Container>
        {loading && <p> LOADING... </p>}
        <ListGroup>
          <TransitionGroup className="shopping-list">
            { items.map(({ _id, name, finished }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button 
                    className="remove-btn"
                    style={{marginRight:'5px'}}
                    color="danger"
                    size="sm"
                    onClick={this.handleDelete.bind(this, _id)}
                  >&times;</Button>
                  <span className={finished? 'strike' : ''}>
                    {name} 
                  </span>
                  <Input
                    type="checkbox" 
                    checked={finished}
                    style={{right: '5px'}}
                    onChange={this.handleEdit.bind(this, _id)} />
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    )
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, { getItems, addItem, deleteItem, updateItem })(ShoppingList);