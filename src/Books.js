import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import { observer } from 'mobx-react';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

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
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

class Books extends Component {
    thumb = (bookId) => (`/thumb/${bookId}/Library?sz=500x500`)
    book = (bookId) => {
        const classes = this.props.classes
        const meta = this.props.store.metadata[bookId]
        const key = `book_${bookId}`
        const thumb = this.thumb(bookId)

        return (
        <GridListTile key={key}>
        <img src={thumb} alt={meta.title} />
        <GridListTileBar
            title={meta.title}
            subtitle={(
                <span>
                    <span>by: {meta.author_sort}</span>
                    {meta.series && (
                        <span>
                            <br/>
                            in: {meta.series} {meta.series_index}
                        </span>
                    )}
                </span>
            )}
            actionIcon={
                <IconButton aria-label={`info about ${meta.title}`} className={classes.icon}>
                    <InfoIcon />
                </IconButton>
            }
        />
        </GridListTile>
        )
    }
    render() {
        const {classes, store} = this.props

        return (
          <div className={classes.root}>
            <GridList cellHeight={320} className={classes.gridList} cols={4}>
              <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                <ListSubheader component="div">Books</ListSubheader>
              </GridListTile>
              {store.bookIds.map(this.book)}
            </GridList>
          </div>
        );
      
    }
}

export default withStyles(useStyles)(observer(Books))