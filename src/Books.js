import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import { observer } from 'mobx-react';
import Book from './Book'
import Store from './Store';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: ({cols}) => ({
      width: 335 * cols,
  }),
}));


function Books({store, cols}) {
  const classes = useStyles({cols})

  return (
    <div className={classes.root}>
      <GridList cellHeight={480} className={classes.gridList} cols={cols} spacing={10}>
        <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
          <ListSubheader component="div">Books</ListSubheader>
        </GridListTile>
        {store.bookIds.map((bookId) => {
            const meta=store.metadata[bookId]
            const thumb=`/thumb/${bookId}/Library?sz=500x500`
            return (
              <GridListTile key={`book_${bookId}`} cols={1}>
                <LazyLoadComponent>
                  <Book meta={meta} thumb={thumb}></Book>
                </LazyLoadComponent>
              </GridListTile>
            )
        })}
      </GridList>
    </div>
  );
}

Books.propTypes = {
  cols: PropTypes.number.isRequired,
  store: PropTypes.instanceOf(Store).isRequired,
}


export default observer(Books)
