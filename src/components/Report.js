import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  taskContainer: {
    maxWidth: '700px',
    marginBottom: '70px'
  },
  headerName: {
    margin: '.1rem'
  },
  headerClose: {
    margin: '10px',
    color: '#aaa'
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
  },
  fieldLabel: {
    alignContent: 'center',
    minWidth: '90px',
  },
  fieldContainer: {
    border: '1px solid #ccc',
    margin: '5px',
    padding: '5px',
    minWidth: '200px',
    maxWidth: '200px'
  },
  countContainer: {
    alignContent: 'center',
    alignItems: 'center',
    margin: '.1rem'
  },
  reportContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '70px'
  }
});

class Report extends Component {

  state = {
  }

  render() {
    const {
      classes,
      categoryReport,
      toggleDisplay
    } = this.props;

    return (
      <React.Fragment>
        <div className={classes.headerContainer}> 
          <div className={classes.headerName}>
            <Typography variant="h5">
                Weekly Report
            </Typography>
          </div>
          <div className={classes.headerClose}>
            <IconButton
              onClick={() => toggleDisplay('Tasks')}
              size='small'
              >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div className={classes.reportContainer}>
          {categoryReport.map ((item, i) => (
            <div className={classes.fieldContainer}>
              <div className={classes.headerName}>
                <Typography variant='h4'>
                  {item.category}
                </Typography>
              </div>
              <div className={classes.countContainer}>
                <Typography className={classes.fieldLabel}>
                  {`Points : ${item.totalPoints}`}
                </Typography>
                <Typography className={classes.fieldLabel}>
                  {`Total : ${item.weeklyPoints}`}
                </Typography>
                <Typography className={classes.fieldLabel}>
                  {`Rating : ${item.weeklyPoints === 0 ? 0 : (item.totalPoints/item.weeklyPoints*100).toFixed(0)}%`}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Report)