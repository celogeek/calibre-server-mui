import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import { observer } from 'mobx-react';
import Book from './Book'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

class Books extends Component {
    render() {
        const {classes, store} = this.props

        return (
          <div className={classes.root}>
            <GridList cellHeight={480} className={classes.gridList} cols={4} spacing={10}>
              <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
                <ListSubheader component="div">Books</ListSubheader>
              </GridListTile>
              {store.bookIds.map((bookId) => {
                  const meta=store.metadata[bookId]
                  const thumb=`/thumb/${bookId}/Library?sz=500x500`
                  return (
                    <GridListTile key={`book_${bookId}`} cols={1}>
                      <Book meta={meta} thumb={thumb} ></Book>
                      </GridListTile>
                  )
              })}
            </GridList>
          </div>
        );
      
    }
}

export default withStyles(useStyles)(observer(Books))