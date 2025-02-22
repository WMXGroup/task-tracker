import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

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
  },
  buttonStyle: {
    margin: '5px',
    padding: '5px',
  },
  buttonContainer: {
    display: 'flex',
    padding: '5px',
  },
});

class ReportMonthly extends Component {

  state = {
  }

  render() {
    const {
      classes,
      categoryReport,
      toggleDisplay,
      updateReportMonth,
      reportMonthStart,
    } = this.props;

    return (
      <React.Fragment>
        <div className={classes.headerContainer}> 
          <div className={classes.headerName}>
            <Typography variant="h5">
                Monthly Report
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
        <div className={classes.headerContainer}> 
          <div className={classes.headerName}>
              <Typography variant="h6">
                  {`Week of ${reportMonthStart}`}
              </Typography>
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <div className={classes.buttonStyle}>
              <Button 
                variant="contained"
                color="primary"
                onClick={() => updateReportMonth(1)}
                >
                +
              </Button>
            </div>
            <div className={classes.buttonStyle}>
              <Button 
                variant="contained"
                color="primary"
                onClick={() => updateReportMonth(0)}
                >
                -
              </Button>
            </div>
          </div>
        <div className={classes.reportContainer}>
          {categoryReport.map ((item, i) => (
            <div className={classes.fieldContainer}>
              <div className={classes.headerName}>
                <Typography variant='h4'>
                  {item.taskName}
                </Typography>
              </div>
              <div className={classes.countContainer}>
                <Typography className={classes.fieldLabel}>
                  {`Points : ${item.totalPoints}`}
                </Typography>
                <Typography className={classes.fieldLabel}>
                  {`Total : ${item.monthlyPoints}`}
                </Typography>
                <Typography className={classes.fieldLabel}>
                  {`Rating : ${item.monthlyPoints === 0 ? 0 : (item.totalPoints/item.monthlyPoints*100).toFixed(0)}%`}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(ReportMonthly)