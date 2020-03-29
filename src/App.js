import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { observer } from 'mobx-react';
import { Button } from '@material-ui/core';
import Books from './Books';

class App extends Component {
  componentDidMount() {
    this.props.store.search()
  }
  loadMore = async() => {
    return this.props.store.more()
  }
  render() {
    const {store} = this.props
    return (
      <Container>
        <Box my={4}>
          <Books store={store} cols={4} />
          {store.hasMore && <Button onClick={this.loadMore}>Load more</Button>}
        </Box>
      </Container>
    );
  }
}


export default observer(App);